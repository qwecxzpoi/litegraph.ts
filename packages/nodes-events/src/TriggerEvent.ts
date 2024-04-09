import type { SlotLayout, Vector2 } from '@litegraph-ts/core'
import { BuiltInSlotType, LGraphNode, LiteGraph } from '@litegraph-ts/core'

export interface TriggerEventProperties extends Record<string, any> {
  onlyOnChange: boolean
}

export default class TriggerEvent extends LGraphNode {
  override properties: TriggerEventProperties = {
    onlyOnChange: true,
  }

  static slotLayout: SlotLayout = {
    inputs: [
      { name: 'if', type: '' },
    ],
    outputs: [
      { name: 'true', type: BuiltInSlotType.EVENT },
      { name: 'change', type: BuiltInSlotType.EVENT },
      { name: 'false', type: BuiltInSlotType.EVENT },
    ],
  }

  private prev: any = 0

  override size: Vector2 = [60, 30]

  override onExecute(param: any, options: object) {
    const v = this.getInputData(0)
    let changed = (v != this.prev)
    if (this.prev === 0)
      changed = false
    const must_resend = (changed && this.properties.onlyOnChange) || (!changed && !this.properties.onlyOnChange)
    if (v && must_resend)
      this.triggerSlot(0, v, null, options)
    if (!v && must_resend)
      this.triggerSlot(2, v, null, options)
    if (changed)
      this.triggerSlot(1, v, null, options)
    this.prev = v
  }
}

LiteGraph.registerNodeType({
  class: TriggerEvent,
  title: 'Trigger Event',
  desc: 'Triggers event if input evaluates to true',
  type: 'events/trigger',
})

import type { INumberWidget, PropertyLayout, SlotLayout, Vector2 } from '@litegraph-ts/core'
import { LGraphNode, LiteGraph } from '@litegraph-ts/core'

export interface ConstantNumberProperties extends Record<string, any> {
  value: number
}

export default class ConstantNumber extends LGraphNode {
  override properties: ConstantNumberProperties = {
    value: 1.0,
  }

  static slotLayout: SlotLayout = {
    inputs: [],
    outputs: [
      { name: 'value', type: 'number' },
    ],
  }

  static propertyLayout: PropertyLayout = [
    { name: 'value', defaultValue: 1.0 },
  ]

  widget: INumberWidget

  nameInGraph: string = ''

  override size: Vector2 = [180, 30]

  constructor(title?: string) {
    super(title)
    this.widget = this.addWidget('number', 'value', 1, 'value')
    this.widgets_up = true
  }

  override onExecute() {
    this.setOutputData(0, this.properties.value)
  }

  override getTitle(): string {
    if (this.flags.collapsed)
      return `${this.properties.value}`

    return this.title
  }

  setValue(v: any) {
    if (typeof v !== 'number')
      v = Number.parseFloat(v)
    this.setProperty('value', v)
  }

  override onDrawBackground(_ctx: CanvasRenderingContext2D) {
    // show the current value
    this.outputs[0].label = this.properties.value.toFixed(3)
  }
}

LiteGraph.registerNodeType({
  class: ConstantNumber,
  title: 'Const Number',
  desc: 'Constant number',
  type: 'basic/number',
})

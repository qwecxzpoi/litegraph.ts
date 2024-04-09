import type { SlotLayout } from '@litegraph-ts/core'
import { LGraphNode, LiteGraph } from '@litegraph-ts/core'

export default class LogicNot extends LGraphNode {
  static slotLayout: SlotLayout = {
    inputs: [
      { name: 'in', type: 'boolean' },
    ],
    outputs: [
      { name: 'out', type: 'boolean' },
    ],
  }

  override onExecute() {
    const ret = !this.getInputData(0)
    this.setOutputData(0, ret)
  };
}

LiteGraph.registerNodeType({
  class: LogicNot,
  title: 'NOT',
  desc: 'Return the logical negation',
  type: 'logic/NOT',
})

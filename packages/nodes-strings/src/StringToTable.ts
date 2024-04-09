import type { SlotLayout } from '@litegraph-ts/core'
import { LGraphNode, LiteGraph } from '@litegraph-ts/core'

export interface StringToTableProperties extends Record<string, any> {
  value: string
  separator: string
}

export default class StringToTable extends LGraphNode {
  override properties: StringToTableProperties = {
    value: '',
    separator: ',',
  }

  static slotLayout: SlotLayout = {
    inputs: [
      { name: 'in', type: 'number' },
    ],
    outputs: [
      { name: 'table', type: 'table' },
      { name: 'rows', type: 'number' },
    ],
  }

  private _table: string[][] | null = null
  private _str: string | null = null
  private _last_separator: string | null = null

  override onExecute() {
    const input = this.getInputData(0)
    if (!input)
      return
    const separator = this.properties.separator || ','
    if (input != this._str || separator != this._last_separator) {
      this._last_separator = separator
      this._str = input
      this._table = input.split('\n').map((a) => { return a.trim().split(separator) })
    }
    this.setOutputData(0, this._table)
    this.setOutputData(1, this._table ? this._table.length : 0)
  };
}

LiteGraph.registerNodeType({
  class: StringToTable,
  title: 'ToTable',
  desc: 'Splits a string to table',
  type: 'string/toTable',
})

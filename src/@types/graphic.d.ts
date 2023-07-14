declare namespace GtGraphic {
  interface Menu {
    label: string
    name: string
    children: GtGraphic.NodeComponent[]
  }

  interface NodeComponent {
    label: string
    shape: string
    register(): import('@antv/x6-vue-shape').VueShapeConfig
  }

  type NodeData<T = unknown> = Record<string, {id: string, value: T}>

  interface Node {
    /** 节点 id */
    id: string
    /** 节点形状(组件) */
    shape: string
    /** 节点自定义数据 */
    data: unknown
    /** 节点 x 位置 */
    x: number
    y: number
  }

  interface Edge {
    /** 源节点 */
    source: {
      /** 节点 id */
      cell: string
      /** 连接桩 */
      port: string
    }
    /** 目标节点 */
    target: {
      /** 节点 id */
      cell: string
      /** 连接桩 */
      port: string
    }
    text: string
  }

  interface Data {
    /** 节点列表 */
    node: Array<Node>

    /** 边列表 */
    edge: Array<Edge>
  }

  interface ChangeDataEvent {
    cell: import('@antv/x6').Cell
    current: Record<string, unknown>
  }
}

import { getCurrentInstance, inject, onBeforeUnmount, onBeforeMount } from 'vue'

/**
 * @param {Record<string, unknown>} source
 * @param {Record<string, unknown>} target
 */
function initData(source, target) {
  for (const [key, value] of Object.entries(source)) {
    if (key === 'type') continue
    if (key.indexOf('output') > -1) continue

    target[key] = value
  }
}

export function useNode() {
  const vm = getCurrentInstance()?.proxy
  /**
   * @type {() => import('@antv/x6').Node}
   */
  const getNode = inject('getNode')
  /**
   * @type {() => import('@antv/x6').Graph}
   */
  const getGraph = inject('getGraph')
  /**
   * @type {import('@antv/x6').Node}
   */
  const node = getNode()
  /**
   * @type {import('@antv/x6').Graph}
   */
  const graph = getGraph()

  /**
   * @param {GtGraphic.ChangeDataEvent} e
   */
  const changeData = function (e) {
    console.group('changeData')
    console.log('e', e)
    console.log('cellId', e.cell.id)
    console.log('shape', e.cell.shape)
    console.log('data', e.current)
    console.log('vmData', vm.$data)
    console.groupEnd()
    initData(e.current, vm.$data)
  }

  /**
   * @param {unknown} value
   * @param {string} port
   */
  const change = function (value, port) {
    const currentEdges = graph.getEdges().filter(function (edge) {
      /**
       * @type {import('@antv/x6').Edge.TerminalCellLooseData}
       */
      const source = edge.source
      return source.cell === node.id
    })

    if (currentEdges.length) {
      currentEdges.forEach(function (edge) {
        /**
         * @type {import('@antv/x6').Node}
         */
        const targetNode = graph.getCellById(edge.target.cell)
        const targetPort = targetNode.getPort(edge.target.port)

        console.group('currentEdges')
        console.log('inputPort', port)
        console.log('targetPort', targetPort)
        console.log('targetNode', targetNode)
        console.groupEnd()

        const data = (function () {
          const result = Object.create(null)
          result[node.id] = { id: node.id, value }
          return result
        })()

        targetNode.setData({ [targetPort.key]: data })
      })
      return
    }

    const data = (function () {
      const result = Object.create(null)
      result[node.id] = { id: node.id, value }
      return result
    })()

    node.setData({ [port]: data })
  }

  onBeforeMount(function () {
    initData(node.data, vm.$data)
  })

  node.on('change:data', changeData)
  onBeforeUnmount(function () {
    node.off('changeData', changeData)
  })

  return { node, graph, change }
}

import { getCurrentInstance, inject, onBeforeMount, onBeforeUnmount } from 'vue'

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
  const vm = getCurrentInstance().proxy
  /**
   * @type {() => import('@antv/x6').Node}
   */
  const getNode = inject('getNode')
  /**
   * @type {() => import('@antv/x6').Graph}
   */
  const getGraph = inject('getGraph')
  const node = getNode()
  const graph = getGraph()

  /**
   * @param {Graphic.ChangeDataEvent} e
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

  onBeforeMount(function () {
    const data = node.getData()
    console.log(vm.$data)
    initData(data, vm.$data)
  })

  node.on('change:data', changeData)

  onBeforeUnmount(function () {
    node.off('change:data', changeData)
  })

  return {
    node,
    graph
  }
}

<template lang="pug">
section.graphic-editor(ref="graphicElRef")
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { Graph } from '@antv/x6'
import { History } from '@antv/x6-plugin-history'
import { Selection } from '@antv/x6-plugin-selection'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { shape, unShapeData } from 'app-graphic/utils'

export default defineComponent({
  name: 'GraphicEditor',
  setup() {
    /**
     * @type {import('vue').Ref<HTMLDivElement>}
     */
    const graphicElRef = ref()

    /**
     * @type {Graph}
     */
    let graph

    onMounted(function () {
      graph = new Graph({
        container: graphicElRef.value,
        height: graphicElRef.value?.offsetHeight,
        connecting: {
          allowBlank: false,
          allowNode: false,
          allowEdge: false,
          connector: 'smooth'
        },
        background: {
          color: '#f5f5f5' // 设置画布背景颜色
        },
        grid: {
          size: 10, // 网格大小 10px
          visible: true // 渲染网格背景
        },
        mousewheel: {
          enabled: true,
          modifiers: ['ctrl', 'meta']
        }
      })

      /**
       * 启用历史记录
       */
      graph.use(new History({ enabled: true }))

      /** 启用框选 或则 多选 */
      graph.use(
        new Selection({
          enabled: true,
          rubberband: true,
          multiple: true,
          showNodeSelectionBox: true,
          pointerEvents: 'none',
          multipleSelectionModifiers: 'shift'
        })
      )

      /**
       * 启用 cv 快捷键
       */
      graph.use(new Keyboard({ enabled: true }))
      graph.use(new Clipboard({ enabled: true }))

      /** 启用 画布滚动 */
      // graph.use(
      //   new Scroller({
      //     modifiers: 'space'
      //   })
      // )

      graph.on('edge:connected', function (e) {
        if (e.isNew) {
          const sourceNode = e.edge.getSourceNode()
          const targetNode = e.edge.getTargetNode()

          if (!sourceNode || !targetNode) {
            throw new Error('连接节点未找到！')
          }

          console.group('edge:connected')
          console.log(e.currentPort)
          console.log('source.shape', sourceNode.shape, 'target.shape', targetNode.shape)
          console.log('source.id', sourceNode.id, 'target.id', targetNode.id)
          console.log('source.data', sourceNode.data)
          console.log('target.data', targetNode.data)
          console.groupEnd()

          /**
           * @type {Edge.TerminalCellLooseData}
           */
          const source = e.edge.source
          /**
           * @type {Edge.TerminalCellLooseData}
           */
          const target = e.edge.target
          const sourcePort = sourceNode.getPort(source.port)
          const targetPort = targetNode.getPort(target.port)
          const data = Object.create(null)

          if (shape.isCollection(sourceNode.shape)) {
            const value = unShapeData(sourceNode.data[sourcePort.key])
            data[sourceNode.id] = { id: sourceNode.id, value }
          } else {
            data[sourceNode.id] = { id: sourceNode.id, value: sourceNode.data[sourcePort.key] }
          }

          console.log(targetPort.key, data)
          targetNode.setData({ [targetPort.key]: data })
        }
      })

      /**
       *  cv
       */
      graph.bindKey('ctrl+c', function () {
        if (!graph) return

        const cells = graph.getSelectedCells()

        if (cells.length) {
          graph.copy(cells)
        }
      })

      graph.bindKey('ctrl+v', function () {
        if (!graph) return

        if (graph.isClipboardEmpty()) {
          const cells = graph.paste({ offset: 32 })
          graph.cleanSelection()
          graph.select(cells)
        }
      })

      graph.on('edge:added', function (e) {
        console.group('edge:added')
        console.log(e)

        const sourceNode = e.edge.getSourceNode()
        const targetNode = e.edge.getTargetNode()

        if (!sourceNode || !targetNode) {
          console.error('连接节点未找到！')
          return
        }

        /**
         * @type {Edge.TerminalCellLooseData}
         */
        const edgeSource = e.edge.source
        /**
         * @type {Edge.TerminalCellLooseData}
         */
        const edgeTarget = e.edge.target
        const sourcePort = sourceNode.getPort(edgeSource.port)
        const targetPort = targetNode.getPort(edgeTarget.port)
        const data = Object.create(null)

        if (shape.isCollection(sourceNode.shape)) {
          const value = unShapeData(sourceNode.data[sourcePort.key])
          data[sourceNode.id] = { id: sourceNode.id, value }
        } else {
          data[sourceNode.id] = { id: sourceNode.id, value: sourceNode.data[sourcePort.key] }
        }

        console.log(targetPort.key, data)
        targetNode.setData({ [targetPort.key]: data })
        console.groupEnd()
      })

      graph.fromJSON([
        {
          id: 'shape-param-input-1',
          shape: 'shape-param-input',
          data: { value: 111 },
          x: 120,
          y: 120
        },
        {
          id: 'shape-param-input-2',
          shape: 'shape-param-input',
          data: { value: 10 },
          x: 120,
          y: 190
        },
        {
          id: 'shape-param-plus-1',
          shape: 'shape-param-plus',
          x: 370,
          y: 150
        }
      ])

      graph.addNode({
        shape: 'shape-param-input',
        x: 120,
        y: 260
      })

      graph.addNode({
        shape: 'shape-param-panel',
        x: 160,
        y: 260
      })

      graph.addNode({
        shape: 'shape-param-panel',
        x: 260,
        y: 260
      })

      graph.addNode({
        shape: 'shape-param-panel',
        x: 360,
        y: 260
      })

      graph.addEdges([
        {
          source: {
            cell: 'shape-param-input-1',
            port: 'shape-param-input-output-1'
          },
          target: {
            cell: 'shape-param-plus-1',
            port: 'shape-param-plus-input-1'
          }
        }
      ])
    })

    onBeforeUnmount(function () {
      if (graph) {
        graph.off()
      }
    })

    return { graphicElRef }
  }
})
</script>

<style lang="scss">
.graphic-editor {
  position: relative;
  flex: 1;
}
</style>

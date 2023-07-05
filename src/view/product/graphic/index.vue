<template lang="pug">
  section.graphic-container
    div.graphic-editor(ref="graphicRef")
    div.graphic-minimap(ref="graphicMinimapRef")
</template>

<script>
import { Graph } from '@antv/x6'
import { onMounted, ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import './components/builtin'

export default {
  name: 'GraphicIndex',
  setup() {
    /**
     * @type {import('vue').Ref<HTMLElement>}
     */
    const graphicRef = ref(null)
    const graphicMinimapRef = ref(null)
    /**
     * @type {import('vue').Ref<Graph>}
     */
    // const graphic = ref(null)

    onMounted(function () {
      const graph = new Graph({
        container: graphicRef.value,
        height: 600,
        background: {
          color: '#f5f5f5' // 设置画布背景颜色
        },
        grid: {
          size: 10, // 网格大小 10px
          visible: true // 渲染网格背景
        },
        scroller: {
          enabled: true
        },
        mousewheel: {
          enabled: true,
          modifiers: ['ctrl', 'meta']
        },
        minimap: {
          enabled: true,
          container: graphicMinimapRef.value
        }
      })

      graph.on('edge:connected', function (e) {
        if (e.isNew) {
          const source = e.edge.getSourceNode()
          const target = e.edge.getTargetNode()
          console.log(e)
          console.group('edge:connected')
          console.log(e.currentPort)
          console.log('source.shape', source.shape, 'target.shape', target.shape)
          console.log('source.id', source.id, 'target.id', target.id)
          console.log('source.data', source.data)
          console.log('target.data', target.data)
          console.groupEnd()

          const port = target.getPort(e.currentPort)

          if (source.data.type === 'variable') {
            const data = cloneDeep(target.data[port.key])
            console.log('cloneDeep', data)

            data[source.id] = { id: source.id, value: source.data.value }
            console.log(port.key, data)
            console.log({ [port.key]: data })
            target.setData({ [port.key]: data })
          }
        }
      })

      graph.addNode({
        shape: 'shape-builtin-input',
        data: {
          type: 'variable',
          value: 11
        },
        x: 380,
        y: 120
      })

      graph.addNode({
        shape: 'shape-builtin-input',
        data: {
          type: 'variable',
          value: 11
        },
        x: 380,
        y: 200
      })

      graph.addNode({
        shape: 'shape-builtin-plus',
        data: {
          type: 'function',
          input: Object.create(null),
          output: null
        },
        x: 650,
        y: 160
      })
    })

    return {
      graphicRef,
      graphicMinimapRef
    }
  }
}
</script>

<style lang="scss">
.graphic-container {
  position: relative;
}
</style>

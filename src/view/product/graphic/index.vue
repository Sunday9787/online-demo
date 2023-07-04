<template lang="pug">
  section.graphic-container
    div.graphic-editor(ref="graphicRef")
    div.graphic-minimap(ref="graphicMinimapRef")
</template>

<script>
import { Graph } from '@antv/x6'
import { onMounted, ref } from 'vue'
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
        selecting: true,
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

      graph.on('edge:connected', ({ isNew, edge }) => {
        if (isNew) {
          const source = edge.getSourceCell()
          const target = edge.getTargetCell()

          if (target.data.length === 2) {
            return
          }

          /**
           * @type {{input: number[]}}
           */
          const targetData = target.getData()
          target.setData({ input: targetData.input.concat(source.data.value) })
        }
      })

      graph.addNode({
        x: 60,
        y: 60,
        width: 160,
        height: 80,
        label: 'Rect With Ports',
        ports: [
          { id: 'port1', attrs: { circle: { r: 12, magnet: true } } },
          { id: 'port2', attrs: { circle: { r: 12, magnet: true } } },
          { id: 'port3' }
        ]
      })

      graph.addNode({
        x: 120,
        y: 120,
        width: 160,
        height: 80,
        label: 'Vue With Ports',
        ports: [
          { id: 'port1', attrs: { circle: { r: 12, magnet: true } } },
          { id: 'port2', attrs: { circle: { r: 12, magnet: true } } },
          { id: 'port3' }
        ]
      })

      graph.addNode({
        shape: 'shape-builtin-input',
        x: 380,
        y: 120
      })

      graph.addNode({
        shape: 'shape-builtin-input',
        x: 380,
        y: 200
      })

      graph.addNode({
        shape: 'shape-builtin-plus',
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

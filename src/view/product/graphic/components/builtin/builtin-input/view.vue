<template lang="pug">
.builtin-input
  el-input-number(size="small" v-model="value" @change="setData")
</template>

<script>
import { defineComponent } from 'vue'
import { useNode } from '../hooks/graphic'

export default defineComponent({
  name: 'shape-builtin-input',
  setup() {
    const { node, graph } = useNode()

    return { node, graph }
  },
  data() {
    return {
      value: 0
    }
  },
  methods: {
    setData(value) {
      console.log('getEdges', this.graph.getEdges())
      const context = this
      const currentEdges = this.graph.getEdges().filter(function (edge) {
        return edge.source.cell === context.node.id
      })

      currentEdges.forEach(function (edge) {
        // const outputPort = edge.source.port
        const targetNode = context.graph.getCellById(edge.target.cell)
        const inputPort = context.node.getPort(edge.source.port)
        const outputPort = targetNode.getPort(edge.target.port)

        console.group('currentEdges')
        console.log('inputPort', inputPort)
        console.log('outputPort', outputPort)
        console.log('targetNode', targetNode)
        targetNode.setData({
          [outputPort.key]: { [context.node.id]: { id: context.node.id, value: context[inputPort.key] } }
        })
        console.groupEnd()
      })

      console.log('currentEdges', currentEdges)
      this.node.setData({ value })
    }
  }
})
</script>

<style lang="scss">
.builtin-input {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 8px 1px #bfbfbf;
}
</style>

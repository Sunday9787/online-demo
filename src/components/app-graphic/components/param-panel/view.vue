<template lang="pug">
.builtin-node.shape-param-panel
  ElDescriptions(:column="1" border direction="vertical" size="small" :title="node.id")
    ElDescriptionsItem(v-for="data of result" :key="data.id" :label="data.id") {{ data.value }}
</template>

<script>
import { defineComponent } from 'vue'
import { useNode } from 'app-graphic/hooks/graphic'

export default defineComponent({
  name: 'shape-param-panel',
  setup() {
    const { node, change } = useNode()

    return {
      node,
      change
    }
  },
  data() {
    return {
      input: Object.create(null)
    }
  },
  computed: {
    result() {
      return Object.values(this.input).flatMap(function (item) {
        return Object.values(item.value)
      })
    }
  },
  watch: {
    result: {
      deep: true,
      handler(value) {
        console.group('watch:param-panel')
        console.log('watch:input:param-panel', value)
        console.groupEnd()
        this.change(this.result, 'output')
      }
    }
  }
})
</script>

<style lang="scss">
.shape-param-panel {
  border: 1px solid blueviolet;
}
</style>

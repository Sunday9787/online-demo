<template lang="pug">
div.builtin-input
  el-input-number(size="small" v-model="value" @change="setData")
</template>

<script>
import { ref, defineComponent, onMounted, inject, watch } from 'vue'

export default defineComponent({
  name: 'shape-builtin-input',
  setup() {
    const value = ref(0)

    /**
     * @type {()=> import('@antv/x6').Node}
     */
    const getNode = inject('getNode')
    /**
     * @type {import('vue').Ref<import('@antv/x6').Node>}
     */
    const node = ref(null)

    watch(value, function (value) {
      node.value.setData({ value })
    })

    onMounted(function () {
      node.value = getNode()
      const data = node.value.getData()

      value.value = data.value
    })

    return { value, node }
  },
  methods: {
    setData(value) {
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

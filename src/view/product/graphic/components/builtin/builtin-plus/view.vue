<template lang="pug">
div.builtin-plus
  el-input-number(size="small" :value="value" :controls="false" disabled)
</template>

<script>
import { ref, defineComponent, computed, onMounted, inject, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'shape-builtin-plus',
  setup() {
    const input = ref([0, 0])

    const value = computed(function () {
      return input.value.reduce(function (previousValue, currentValue) {
        return previousValue + currentValue
      }, 0)
    })

    /**
     * @type {()=> import('@antv/x6').Node}
     */
    const getNode = inject('getNode')
    /**
     * @type {import('vue').Ref<import('@antv/x6').Node>}
     */
    const node = ref(null)

    onMounted(function () {
      node.value = getNode()

      node.value.on('change:data', function ({ current }) {
        console.log('builtin-plus', current)
        input.value = current.input
      })
    })

    onBeforeUnmount(function () {
      node.value.off('change:data')
    })

    return { value, node }
  }
})
</script>

<style lang="scss">
.builtin-plus {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 8px 1px #bfbfbf;
}
</style>

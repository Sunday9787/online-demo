<template lang="pug">
.builtin-plus
  el-input-number(size="small" :value="output" :controls="false" disabled)
</template>

<script>
import { defineComponent } from 'vue'
import { useNode } from '../hooks/graphic'

export default defineComponent({
  name: 'shape-builtin-plus',
  setup() {
    const { node } = useNode()

    return { node }
  },
  data() {
    return {
      /**
       * @type {Record<string, {id: string, value: number}}
       */
      input: Object.create(null)
    }
  },
  computed: {
    output() {
      return Object.values(this.input).reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.value
      }, 0)
    }
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

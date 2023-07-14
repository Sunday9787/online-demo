<template lang="pug">
.builtin-node.shape-param-plus
  ElInputNumber(v-model="result" size="small" :controls="false" readonly)
</template>

<script>
import { defineComponent } from 'vue'
import { useNode } from 'app-graphic/hooks/graphic'

export default defineComponent({
  name: 'shape-param-plus',
  setup() {
    const { node, change } = useNode()
    return { node, change }
  },
  data() {
    return {
      input: Object.create(null),
      output: {}
    }
  },
  computed: {
    result() {
      return Object.values(this.input).reduce(function (previousValue, currentValue) {
        return previousValue + currentValue.value
      }, 0)
    }
  },
  watch: {
    input: {
      deep: true,
      handler(value) {
        console.group('watch')
        console.log('watch:input', value)
        console.groupEnd()

        this.change(value, 'output')
      }
    }
  }
})
</script>
<style lang="scss">
.shape-param-plus {
  border: 1px solid blueviolet;
}
</style>

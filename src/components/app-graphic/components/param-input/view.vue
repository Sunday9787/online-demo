<template lang="pug">
.builtin-node.shape-param-input
  ElInputNumber(size="small" v-model="value" @change="(value) => change(value, 'value')")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNode } from 'app-graphic/hooks/graphic'
import { SHAPE } from 'app-graphic/constant'

export default defineComponent({
  name: SHAPE.PARAM_INPUT,
  setup() {
    const { node, change } = useNode()

    return {
      node,
      change
    }
  },
  data() {
    return {
      value: 0
    }
  }
})
</script>

<style lang="scss">
.shape-param-input {
  border: 1px solid blueviolet;
}
</style>

<template lang="pug">
  aside.template-property
</template>

<script>
import { inject } from 'vue'
import { storeSymbol } from '@/view/template/constant'

export default {
  name: 'TemplateProperty',
  setup() {
    const store = inject(storeSymbol)
    return { store }
  }
}
</script>

<style lang="scss">
.template-property {
  width: 242px;
}
</style>

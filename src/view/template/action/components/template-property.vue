<template lang="pug">
  aside.template-property(key="1" v-if="currentComponent")
    el-row
      h1 字体
      section
        el-select(v-model="currentComponent.component.props.property.font")
          el-option(v-for="(font, k) in fonts" :key="k" :label="font.label" :value="font.value")
  aside.template-property(key="2" v-else)
</template>

<script>
import { computed, inject } from 'vue'
import { storeSymbol } from '@/view/template/constant'
import { useFont } from '@/view/template/hooks/useFont'

export default {
  name: 'TemplateProperty',
  setup() {
    const store = inject(storeSymbol)
    const { fonts } = useFont()
    const currentComponent = computed(() => store.currentComponent)

    return { currentComponent, fonts }
  }
}
</script>

<style lang="scss">
.template-property {
  width: 242px;
}
</style>

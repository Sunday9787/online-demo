<template lang="pug">
  aside.template-aside
    section.template-aside-container
      h1.template-aside-title 基本
      ol.template-component-group
        li.template-component-item(
          v-for="(item, k) in base"
          @pointerdown="addComponent(item)"
          :key="k") {{item.props.label}}
</template>

<script>
import { inject, ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { storeSymbol } from '@/view/template/constant'
import { useBuiltinComponent } from './builtin'

export default {
  name: 'TemplateAside',
  setup() {
    const { base } = useBuiltinComponent()
    const store = inject(storeSymbol)
    const index = ref(0)

    return { base, store, index }
  },
  methods: {
    addComponent(item) {
      const component = cloneDeep(item)
      component.id = 'component-' + this.index++

      this.store.components.push(component)
    }
  }
}
</script>

<style lang="scss">
.template-aside {
  width: 326px;
}

.template-aside-container {
  position: relative;
  padding: 0 10px;
  margin-top: 12px;
}

.template-aside-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.template-component-group {
  overflow: hidden;
  position: relative;
  display: grid;
  grid-auto-rows: max-content;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 0;
  margin: 12px 0 0;
}

.template-component-item {
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  padding: 6px;
  border: 1px dashed var(--color-border-light);
}
</style>

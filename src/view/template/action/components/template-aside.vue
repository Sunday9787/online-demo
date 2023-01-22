<template lang="pug">
  aside.template-aside
    section.template-aside-container(v-for="(value, k) in builtinComponent" :key="k")
      h1.template-aside-title {{ value.label }}：
      ol.template-component-group
        li.template-component-item(
          v-for="item of value.items"
          :key="item.id"
          draggable
          @dragstart="dragstartHandle($event, item)"
          @dragend="dragendHandle($event)"
          @drag="dragHandle($event)") {{item.label}}
</template>

<script>
import { useBuiltinComponent } from '@/view/template/hooks/useBuiltin'

export default {
  name: 'TemplateAside',
  setup() {
    const builtinComponent = useBuiltinComponent()

    return { builtinComponent }
  },
  methods: {
    /**
     * @param {DragEvent} e
     */
    dragHandle(e) {
      console.log('正在拖拉')
    },
    /**
     * @param {DragEvent} e
     * @param {Template.BuiltinComponent} data
     */
    dragstartHandle(e, data) {
      console.log('开始拖拽')
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('application/json', JSON.stringify(data))
    },
    /**
     * @param {DragEvent} e
     */
    dragendHandle(e) {
      console.log('结束拖拽')
      e.dataTransfer.clearData()
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
  display: flex;
  align-items: center;
  font-weight: normal;
  font-size: 14px;
  margin: 0;
  height: 22px;
}

.template-component-group {
  overflow: hidden;
  position: relative;
  display: grid;
  grid-auto-rows: max-content;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 8px;
  margin: 12px 0 0;
  border: 1px solid var(--color-border-light);
}

.template-component-item {
  text-align: center;
  cursor: grab;
  font-size: 12px;
  padding: 6px;
  border: 1px solid var(--color-border-light);

  &:active {
    cursor: grabbing;
  }
}
</style>

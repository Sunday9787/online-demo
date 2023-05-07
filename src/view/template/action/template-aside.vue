<template lang="pug">
  aside.template-aside
    section.template-aside-container(v-for="(value, k) in builtinComponent" :key="k")
      h1.template-aside-title {{ value.label }}：
      ol.template-component-group
        li.template-component-item(
          v-for="item of value.items"
          :key="item.id"
          :class="{ used: item.used }"
          :draggable="!item.used"
          @dragstart="dragstartHandle($event, item)"
          @dragend="dragendHandle($event)"
          @drag="dragHandle($event)") {{item.label}}
</template>

<script>
import { useBuiltinComponent } from '@/view/template/hooks/useBuiltin'

export default {
  name: 'TemplateAside',
  setup() {
    const { builtinComponent } = useBuiltinComponent()

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
     * @param {Template.BuiltinComponentItem} data
     */
    dragstartHandle(e, data) {
      console.log('开始拖拽')

      /**
       * @type {HTMLLIElement}
       */
      const el = e.target
      const rect = el.getBoundingClientRect()

      data.offset.x = e.pageX - rect.left
      data.offset.y = e.pageY - rect.top

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
  height: 22px;
  margin: 0;
  font-size: 14px;
  font-weight: normal;
}

.template-component-group {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: max-content;
  gap: 10px;
  padding: 8px;
  margin: 12px 0 0;
  overflow: hidden;
  border: 1px solid var(--color-border-light);
}

.template-component-item {
  padding: 6px;
  font-size: 12px;
  text-align: center;
  cursor: grab;
  user-select: none;
  border: 1px solid var(--color-border-light);

  &.used {
    cursor: not-allowed;
    background-color: var(--color-primary-light-7);
  }

  &:not(.used):active {
    cursor: grabbing;
  }
}
</style>

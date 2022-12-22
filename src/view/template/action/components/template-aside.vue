<template lang="pug">
  aside.template-aside
    section.template-aside-container
      h1.template-aside-title 基本
      ol.template-component-group
        li.template-component-item(
          v-for="(item, k) in base"
          :key="k"
          draggable
          @dragstart="dragstartHandle($event, item)"
          @dragend="dragendHandle($event)"
          @drag="dragHandle($event)") {{item.props.label}}
</template>

<script>
import { inject, onBeforeUnmount, ref } from 'vue'
import eventBus from '@/util/eventBus'
import { storeSymbol, templateChannel } from '@/view/template/constant'
import { useBuiltinComponent } from './builtin'

export default {
  name: 'TemplateAside',
  setup() {
    const { base } = useBuiltinComponent()
    const store = inject(storeSymbol)
    const index = ref(0)

    const addComponent = function (component) {
      component.id = 'component-' + index.value++
      store.components.push(component)
    }

    eventBus.$on(templateChannel['stage:component:add'], addComponent)
    onBeforeUnmount(function () {
      eventBus.$off(templateChannel['stage:component:add'], addComponent)
    })

    return { base, store, index }
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
     */
    dragstartHandle(e, data) {
      console.log('开始拖拽')
      e.dataTransfer.dropEffect = 'move'
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
  text-align: center;
  font-size: 12px;
  padding: 6px;
  border: 1px dashed var(--color-border-light);
}
</style>

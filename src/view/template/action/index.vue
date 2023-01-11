<template lang="pug">
  main.template-container
    TemplateToolbar
    el-container.template-main
      TemplateAside
      TemplateEditor
      TemplateProperty
</template>

<script>
import { onMounted, onUnmounted, provide, ref } from 'vue'
import { useStore } from '@/view/template/hooks/useStore'
import { useRecord } from '@/view/template/hooks/useRecord'
import { recordChannel, templateChannel, storeSymbol } from '@/view/template/constant'
import { createId } from '@/view/template/utils'
import { recordHandle } from '@/view/template/utils/record'
import eventBus from '@/util/eventBus'

import TemplateAside from './components/template-aside.vue'
import TemplateToolbar from './components/template-toolbar.vue'
import TemplateEditor from './components/template-editor.vue'
import TemplateProperty from './components/template-property.vue'

export default {
  name: 'TemplateAction',
  components: {
    TemplateAside,
    TemplateToolbar,
    TemplateEditor,
    TemplateProperty
  },
  setup() {
    const store = useStore()
    const index = ref(0)

    provide(storeSymbol, store)
    useRecord(store)

    /**
     * 添加组件
     * @param {Template.Event} e
     * @param {boolean} [record] 是否添加到历史记录
     */
    const addComponent = function (e, record = true) {
      const component = e.detail

      component.key = index.value++
      component.id = createId(component.key)
      component.visible = true

      store.components.set(component.key, component)
      store.currentComponent = component
      store.componentsData = Array.from(store.components)

      if (record) {
        eventBus.$emit(recordChannel.componentAdd, e)
      }
    }

    /**
     * 删除组件
     * @param {Template.Event} e
     * @param {boolean} [record]
     */
    const delComponent = function (e, record = true) {
      const component = e.detail

      store.currentComponent = null
      store.components.delete(component.key)
      store.componentsData = Array.from(store.components)

      if (record) {
        eventBus.$emit(recordChannel.componentDel, e)
      }
    }

    /**
     * 选择组件
     * @param {Template.Event} e
     */
    const selectComponent = function (e) {
      store.currentComponent = e.detail
      eventBus.$emit(recordChannel.componentSelect, e)
    }

    /**
     * 取消选择组件
     */
    const unSelectComponent = function (e) {
      store.currentComponent = null
      eventBus.$emit(recordChannel.componentSelectUn, e)
    }

    /**
     * 移动组件
     * @param {Template.Event} e
     */
    const moveComponentStart = function (e) {
      eventBus.$emit(recordChannel.componentMoveStart, e)
    }
    /**
     * @param {Template.Event} e
     */
    const moveComponent = function (e) {
      eventBus.$emit(recordChannel.componentMove, e)
      store.componentsData = Array.from(store.components)
    }
    /**
     * @param {Template.Event} e
     */
    const moveComponentEnd = function (e) {
      eventBus.$emit(recordChannel.componentMoveEnd, e)
      if (e.target === 'property') {
        store.componentsData = Array.from(store.components)
      }
    }

    /**
     * 组件修改大小
     * @param {Template.Event} e
     */
    const resizeComponentStart = function (e) {
      eventBus.$emit(recordChannel.componentResizeStart, e)
    }
    /**
     * @param {Template.Event} e
     */
    const resizeComponent = function (e) {
      eventBus.$emit(recordChannel.componentResize, e)
      store.componentsData = Array.from(store.components)
    }
    /**
     * @param {Template.Event} e
     */
    const resizeComponentEnd = function (e) {
      eventBus.$emit(recordChannel.componentResizeEnd, e)
      if (e.target === 'property') {
        store.componentsData = Array.from(store.components)
      }
    }

    /**
     * 字体改变
     * @param {Template.Event} e
     */
    const componentFontChange = function (e) {
      eventBus.$emit(recordChannel.componentFontChange, e)
      if (e.target === 'property') {
        store.componentsData = Array.from(store.components)
      }
    }

    /**
     * 清空画布
     * @param {Template.Event} e
     */
    const stageClear = function (e) {
      store.components.clear()
      store.currentComponent = null

      eventBus.$emit(recordChannel.stageClear, e)
      store.componentsData = Array.from(store.components)
    }

    /**
     * 创建组
     */
    const groupPack = function () {}

    /**
     * 组解散
     */
    const groupUn = function () {}

    /**
     * 撤销
     */
    const stageUndo = function () {
      const popRecord = store.record.pop()

      if (popRecord) {
        recordHandle.apply(store, ['undo', popRecord])
      }
    }

    /**
     * 重做
     */
    const stageRestore = function () {
      const popRecord = store.restore.pop()

      if (popRecord) {
        recordHandle.apply(store, ['restore', popRecord])
      }
    }

    onMounted(function () {
      eventBus.$on(templateChannel.componentAdd, addComponent)
      eventBus.$on(templateChannel.componentDel, delComponent)
      eventBus.$on(templateChannel.componentSelect, selectComponent)
      eventBus.$on(templateChannel.componentSelectUn, unSelectComponent)
      eventBus.$on(templateChannel.componentMoveStart, moveComponentStart)
      eventBus.$on(templateChannel.componentMove, moveComponent)
      eventBus.$on(templateChannel.componentMoveEnd, moveComponentEnd)
      eventBus.$on(templateChannel.componentResizeStart, resizeComponentStart)
      eventBus.$on(templateChannel.componentResize, resizeComponent)
      eventBus.$on(templateChannel.componentResizeEnd, resizeComponentEnd)
      eventBus.$on(templateChannel.componentFontChange, componentFontChange)
      eventBus.$on(templateChannel.groupPack, groupPack)
      eventBus.$on(templateChannel.groupUn, groupUn)
      eventBus.$on(templateChannel.stageClear, stageClear)
      eventBus.$on(templateChannel.stageUndo, stageUndo)
      eventBus.$on(templateChannel.stageRestore, stageRestore)
    })

    onUnmounted(function () {
      eventBus.$off(templateChannel.componentAdd, addComponent)
      eventBus.$off(templateChannel.componentDel, delComponent)
      eventBus.$off(templateChannel.componentSelect, selectComponent)
      eventBus.$off(templateChannel.componentSelectUn, unSelectComponent)
      eventBus.$off(templateChannel.componentMoveStart, moveComponentStart)
      eventBus.$off(templateChannel.componentMove, moveComponent)
      eventBus.$off(templateChannel.componentMoveEnd, moveComponentEnd)
      eventBus.$off(templateChannel.componentResizeStart, resizeComponentStart)
      eventBus.$off(templateChannel.componentResize, resizeComponent)
      eventBus.$off(templateChannel.componentResizeEnd, resizeComponentEnd)
      eventBus.$off(templateChannel.componentFontChange, componentFontChange)
      eventBus.$off(templateChannel.groupPack, groupPack)
      eventBus.$off(templateChannel.groupUn, groupUn)
      eventBus.$off(templateChannel.stageClear, stageClear)
      eventBus.$off(templateChannel.stageUndo, stageUndo)
      eventBus.$off(templateChannel.stageRestore, stageRestore)
    })

    return { store, index }
  }
}
</script>

<style lang="scss">
.template-container {
  display: flex;
  height: inherit;
  flex-direction: column;
  background-color: var(--color-background);
}

.template-main {
  position: relative;
  overflow: hidden;
}
</style>

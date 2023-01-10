<template lang="pug">
  aside.template-property(key="1" @pointerdown.stop="noop" v-if="currentComponent")
    el-row
      h1 字体
      section
        el-select(v-model="current.property.font" @change="componentFontChange(currentComponent)")
          el-option(v-for="(font, k) in fonts" :key="k" :label="font.label" :value="font.value")
    section.template-property-container
      div.template-property-item
        label 控件名称
        span {{ current.label }}
      div.template-property-item
        label 位置
        ol.template-property-list.flex1
          li.template-property-list-item
            el-input-number.flex1(
              size="small"
              :min="0"
              :precision="1"
              :controls="false"
              v-model="current.position.x"
              @change="componentMove(currentComponent)")
            span X
          li.template-property-list-item
            el-input-number.flex1(
              size="small"
              :min="0"
              :precision="1"
              :controls="false"
              v-model="current.position.y"
              @change="componentMove(currentComponent)")
            span Y
      div.template-property-item
        label 大小
        ol.template-property-list.flex1
          li.template-property-list-item
            el-input-number.flex1(
              size="small"
              :min="0"
              :precision="1"
              :controls="false"
              v-model="current.size.w"
              @change="componentSizeChange(currentComponent)")
            span W
          li.template-property-list-item
            el-input-number.flex1(
              size="small"
              :min="0"
              :precision="1"
              :controls="false"
              v-model="current.size.h"
              @change="componentSizeChange(currentComponent)")
            span H
  aside.template-property(key="2" v-else)
</template>

<script>
import { computed, inject } from 'vue'
import { storeSymbol, templateChannel } from '@/view/template/constant'
import { useFont } from '@/view/template/hooks/useProperty'
import { TemplateEvent } from '@/view/template/utils'
import eventBus from '@/util/eventBus'

export default {
  name: 'TemplateProperty',
  setup() {
    /**
     * @type {Template.Store}
     */
    const store = inject(storeSymbol)
    const { fonts } = useFont()
    /**
     * @type {import('vue').Ref<Template.BuiltinComponent>}
     */
    const currentComponent = computed(() => store.currentComponent)

    const current = computed(() => {
      if (currentComponent.value) {
        return currentComponent.value.props
      }

      return null
    })

    return { currentComponent, fonts, current }
  },
  methods: {
    /**
     * @param {Template.BuiltinComponent} component
     */
    componentMove(component) {
      const event = new TemplateEvent(templateChannel.componentMoveEnd, { detail: component, target: 'property' })
      eventBus.$emit(templateChannel.componentMoveEnd, event)
    },
    /**
     * @param {Template.BuiltinComponent} component
     */
    componentSizeChange(component) {
      const event = new TemplateEvent(templateChannel.componentResizeEnd, { detail: component, target: 'property' })
      eventBus.$emit(templateChannel.componentResizeEnd, event)
    },
    /**
     * @param {Template.BuiltinComponent} component
     */
    componentFontChange(component) {
      const event = new TemplateEvent(templateChannel.componentFontChange, { detail: component, target: 'property' })
      eventBus.$emit(templateChannel.componentFontChange, event)
    }
  }
}
</script>

<style lang="scss">
.template-property {
  width: 242px;
  padding: 0 10px;
  font-size: 12px;
}

.template-property-container {
  display: flex;
  row-gap: 10px;
  flex-direction: column;
}

.template-property-item {
  display: flex;
  column-gap: 10px;
  align-items: center;
}

.template-property-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: max-content;
  gap: 10px 15px;
  padding: 0;
  margin: 0;
}

.template-property-list-item {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
</style>

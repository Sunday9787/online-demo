<template lang="pug">
  aside.template-property(key="1" @pointerdown.stop="noop" v-if="currentComponent")
    section.template-property-container
      div.template-property-item
        section.flex1
          h1 字体
          el-select(
            v-model="current.property.fontFamily.value"
            :popper-append-to-body="false"
            size="small"
            @change="componentFontChange(currentComponent)")
            el-option(v-for="(font, k) in fonts" :key="k" :label="font.label" :value="font.value")
      div.template-property-item
        label 控件名称
        span {{ current.label }}
      div.template-property-item
        label 位置
        ol.template-property-grid.flex1
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
        ol.template-property-grid.flex1
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
      div.template-property-item
        label 设置
        ol.template-property-list.flex1(v-if="property")
          li.template-property-list-item(v-for="item of property.setting" :key="item.type")
            el-checkbox(
              :label="item.value"
              v-model="current.lock"
              v-if="item.type === 'lock'") {{ item.label }}
            el-checkbox(
              :label="item.value"
              v-model="current.property.underline"
              v-if="item.type === 'underline'") {{ item.label }}
            el-checkbox(
              :label="item.value"
              v-model="current.property.dashed"
              v-if="item.type === 'dash' && current.property.underline") {{ item.label }}
            el-checkbox(
              :label="item.value"
              v-model="current.required"
              v-if="item.type === 'required'") {{ item.label }}
  aside.template-property(key="2" v-else)
</template>

<script>
import { computed, inject } from 'vue'
import { useSetting } from '@/view/template/hooks/useSetting'
import { useFont } from '@/view/template/hooks/useProperty'
import { storeSymbol, templateChannel } from '@/view/template/constant'
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
    const property = useSetting(currentComponent)

    const current = computed(() => {
      if (currentComponent.value) {
        return currentComponent.value.props
      }

      return null
    })

    return { currentComponent, fonts, current, property }
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
  row-gap: 15px;
  flex-direction: column;
}

.template-property-item {
  display: flex;
  column-gap: 10px;
  align-items: flex-start;
}

.template-property-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: max-content;
  gap: 10px 15px;
  padding: 0;
  margin: 0;
}

.template-property-list {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin: 0;
  padding: 0;
}

.template-property-list-item {
  display: flex;
  align-items: center;
  column-gap: 10px;
}
</style>

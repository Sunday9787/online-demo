import { onBeforeUnmount } from 'vue'
import { cloneDeep } from 'lodash-es'
import { templateChannel, componentRecordType } from '@/view/template/constant'
import { recordNameMap } from '@/view/template/utils'
import eventBus from '@/util/eventBus'

/**
 * @type {Vue.ComponentOptions<import('vue').VueConstructor>}
 */
export const recordMixin = {
  methods: {
    /**
     * @param {Template.BuiltinComponent} currentComponent
     */
    componentFontChange(currentComponent) {
      eventBus.$emit(
        templateChannel.componentPropertyFontChange,
        componentRecordType.componentPropertyFontChange,
        currentComponent
      )
    },
    /**
     * @param {Template.BuiltinComponent} currentComponent
     */
    componentResize(currentComponent) {
      eventBus.$emit(
        templateChannel.componentPropertySizeChange,
        componentRecordType.componentPropertySizeChange,
        currentComponent
      )
    },
    /**
     * @param {Template.BuiltinComponent} currentComponent
     */
    componentMove(currentComponent) {
      eventBus.$emit(
        templateChannel.componentPropertyPositionChange,
        componentRecordType.componentPropertyPositionChange,
        currentComponent
      )
    },
    /**
     * @param {Template.BuiltinComponent} currentComponent
     */
    componentMoveEnd(currentComponent) {
      eventBus.$emit(
        templateChannel.componentPropertyPositionChangeEnd,
        componentRecordType.componentPropertyPositionChangeEnd,
        currentComponent
      )
    }
  }
}

/**
 * @param {Template.Store} store
 */
export function useRecord(store) {
  /**
   * @param {Template.BuiltinComponentRecordType} type
   * @param {Template.BuiltinComponent} currentComponent
   */
  const componentChange = function (type, currentComponent) {
    if (currentComponent) {
      /**
       * @type {Template.BuiltinComponentRecord}
       */
      const record = { type, record: cloneDeep(currentComponent) }
      console.group('record')
      console.info('事件', recordNameMap[type])
      console.info('组件id', currentComponent.id)
      console.info('组件key', currentComponent.key)
      console.info('组件props', currentComponent.props)
      console.groupEnd()
      store.record.push(record)
    }
  }

  eventBus.$on(templateChannel.componentAdd, componentChange)
  eventBus.$on(templateChannel.componentDel, componentChange)
  eventBus.$on(templateChannel.componentPropertyPositionChange, componentChange)
  eventBus.$on(templateChannel.componentPropertyPositionChangeEnd, componentChange)
  eventBus.$on(templateChannel.componentPropertyFontChange, componentChange)
  eventBus.$on(templateChannel.componentPropertySizeChange, componentChange)

  onBeforeUnmount(function () {
    eventBus.$off(templateChannel.componentAdd, componentChange)
    eventBus.$off(templateChannel.componentDel, componentChange)
    eventBus.$off(templateChannel.componentPropertyPositionChange, componentChange)
    eventBus.$off(templateChannel.componentPropertyPositionChangeEnd, componentChange)
    eventBus.$off(templateChannel.componentPropertyFontChange, componentChange)
    eventBus.$off(templateChannel.componentPropertySizeChange, componentChange)
  })
}

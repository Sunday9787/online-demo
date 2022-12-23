import { onBeforeUnmount, onMounted } from 'vue'
import { cloneDeep, debounce } from 'lodash-es'
import { recordNameMap } from '@/view/template/utils'
import { templateChannel } from '@/view/template/constant'
import eventBus from '@/util/eventBus'

/**
 * @param {Template.Store} store
 */
export function useRecord(store) {
  const componentChange = debounce(
    /**
     * @param {Template.BuiltinComponentRecordType} type
     * @param {Template.BuiltinComponent} currentComponent
     */
    function (type, currentComponent) {
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
    },
    300
  )

  onMounted(function () {
    eventBus.$on(templateChannel.componentAdd, componentChange)
    eventBus.$on(templateChannel.componentDel, componentChange)
    eventBus.$on(templateChannel.componentPropertyPositionChange, componentChange)
    eventBus.$on(templateChannel.componentPropertyFontChange, componentChange)
    eventBus.$on(templateChannel.componentPropertySizeChange, componentChange)
  })

  onBeforeUnmount(function () {
    eventBus.$off(templateChannel.componentAdd, componentChange)
    eventBus.$off(templateChannel.componentDel, componentChange)
    eventBus.$off(templateChannel.componentPropertyPositionChange, componentChange)
    eventBus.$off(templateChannel.componentPropertyFontChange, componentChange)
    eventBus.$off(templateChannel.componentPropertySizeChange, componentChange)
  })
}

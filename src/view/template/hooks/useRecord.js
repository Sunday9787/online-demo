import moment from 'moment'
import { onBeforeUnmount, onMounted } from 'vue'
import { recordChannel, recordTypeMap } from '@/view/template/constant'
import { createRecord } from '@/view/template/utils/record'
import eventBus from '@/util/eventBus'

/**
 * @this {Template.Store}
 * @param {Template.BuiltinComponentRecordType} type
 * @param {Template.BuiltinComponent} component
 * @param {boolean} [record] 是否记录
 */
function recordHandle(type, component, record = true) {
  if (component) {
    const recordData = createRecord(type, component)

    console.group('record')
    console.info('事件', recordTypeMap[type])
    console.info('组件id', component.id)
    console.info('组件key', component.key)
    console.info('组件props', component.props)
    console.info('时间戳', moment().format('yyyy-MM-DD HH:mm:ss'))
    console.groupEnd()

    if (record && this.record.length <= 20) {
      this.record.push(recordData)
    }

    return
  }

  console.group('record')
  console.info('事件', recordTypeMap[type])
  console.info('时间戳', moment().format('yyyy-MM-DD HH:mm:ss'))
  console.groupEnd()
}

/**
 * @param {Template.Store} store
 */
export function useRecord(store) {
  let move = false
  let resize = false

  /**
   * @param {Template.Event} e
   */
  const componentChange = function (e) {
    switch (e.type) {
      case 'component:add':
      case 'component:del':
      case 'component:font:change':
        recordHandle.apply(store, [e.type, e.detail])
        break
      case 'component:resize:start':
        resize = true
        break
      case 'component:resize':
        recordHandle.apply(store, [e.type, e.detail, false])
        break
      case 'component:resize:end':
        if (e.target === 'property') {
          recordHandle.apply(store, [e.type, e.detail])
        } else if (resize) {
          resize = false
          recordHandle.apply(store, [e.type, e.detail])
        }
        break
      case 'component:move:start':
        recordHandle.apply(store, [e.type, e.detail, false])
        break
      case 'component:move':
        move = true
        break
      case 'component:move:end':
        if (e.target === 'property') {
          recordHandle.apply(store, [e.type, e.detail])
        } else if (move) {
          move = false
          recordHandle.apply(store, [e.type, e.detail])
        }
    }
  }

  onMounted(function () {
    eventBus.$on(recordChannel.componentAdd, componentChange)
    eventBus.$on(recordChannel.componentDel, componentChange)
    eventBus.$on(recordChannel.componentMoveStart, componentChange)
    eventBus.$on(recordChannel.componentMove, componentChange)
    eventBus.$on(recordChannel.componentMoveEnd, componentChange)
    eventBus.$on(recordChannel.componentFontChange, componentChange)
    eventBus.$on(recordChannel.componentResizeStart, componentChange)
    eventBus.$on(recordChannel.componentResize, componentChange)
    eventBus.$on(recordChannel.componentResizeEnd, componentChange)
  })

  onBeforeUnmount(function () {
    eventBus.$off(recordChannel.componentAdd, componentChange)
    eventBus.$off(recordChannel.componentDel, componentChange)
    eventBus.$off(recordChannel.componentMoveStart, componentChange)
    eventBus.$off(recordChannel.componentMove, componentChange)
    eventBus.$off(recordChannel.componentMoveEnd, componentChange)
    eventBus.$off(recordChannel.componentFontChange, componentChange)
    eventBus.$off(recordChannel.componentSizeChange, componentChange)
    eventBus.$off(recordChannel.componentResizeStart, componentChange)
    eventBus.$off(recordChannel.componentResize, componentChange)
    eventBus.$off(recordChannel.componentResizeEnd, componentChange)
  })
}

import { cloneDeep } from 'lodash-es'
import { TemplateEvent, createId } from '.'
import { templateChannel } from '@/view/template/constant'
import eventBus from '@/util/eventBus'

/**
 * @param {Template.BuiltinComponentRecordType} type
 * @param {Template.BuiltinComponent} component
 */
export function createRecord(type, component) {
  /**
   * @type {Template.BuiltinComponentRecord}
   */
  const data = Object.create(null)
  data.type = type
  data.component = cloneDeep(component)

  return data
}

/**
 * @this {Template.Store}
 * @param {Template.BuiltinComponent} record
 */
function undoGeneral(record) {
  this.restore.push(cloneDeep(record))

  if (this.record.length) {
    const recordComponent = this.record[this.record.length - 1].component

    if (this.components.has(recordComponent.uid)) {
      /**
       * @type {Template.BuiltinComponent}
       */
      const component = cloneDeep(recordComponent)
      component.id = createId(recordComponent.uid)

      this.components.set(component.uid, component)
      this.componentsData = Array.from(this.components.values())
      console.log('撤销更改', 'uid', component.uid, '新id', component.id, '旧id', recordComponent.id)
    }
  }
}

/**
 * @this {Template.Store}
 * @param {Template.BuiltinComponentRecord} record
 */
function restoreGeneral(record) {
  const recordComponent = record.component

  if (this.components.has(recordComponent.uid)) {
    /**
     * @type {Template.BuiltinComponent}
     */
    const component = cloneDeep(recordComponent)
    component.id = createId(recordComponent.uid)

    this.components.set(component.uid, component)
    this.componentsData = Array.from(this.components.values())
    console.log('恢复更改', 'uid', component.uid, '新id', component.id, '旧id', recordComponent.id)
  }
}

const recordActionHandle = {
  componentAdd: {
    /**
     * @this {Template.Store}
     * @param {Template.BuiltinComponentRecord} record
     */
    undo(record) {
      this.restore.push(record)

      eventBus.$emit(
        templateChannel.componentDel,
        new TemplateEvent(templateChannel.componentDel, {
          detail: record.component,
          target: 'stage'
        }),
        false
      )
    },
    /**
     * @this {Template.Store}
     * @param {Template.BuiltinComponentRecord} record
     */
    restore(record) {
      eventBus.$emit(
        templateChannel.componentAdd,
        new TemplateEvent(templateChannel.componentAdd, {
          detail: record.component,
          target: 'stage'
        }),
        false
      )
    }
  },
  componentDel: {
    /**
     * @this {Template.Store}
     * @param {Template.BuiltinComponentRecord} record
     */
    undo(record) {
      this.restore.push(record)

      eventBus.$emit(
        templateChannel.componentAdd,
        new TemplateEvent(templateChannel.componentAdd, {
          detail: record.component,
          target: 'stage'
        }),
        false
      )
    },
    /**
     * @this {Template.Store}
     * @param {Template.BuiltinComponentRecord} record
     */
    restore(record) {
      eventBus.$emit(
        templateChannel.componentDel,
        new TemplateEvent(templateChannel.componentDel, {
          detail: record.component,
          target: 'stage'
        }),
        false
      )
    }
  },
  componentGeneral: {
    /**
     * @this {Template.Store}
     * @param {Template.BuiltinComponentRecord} record
     */
    undo(record) {
      undoGeneral.apply(this, [record])
    },
    /**
     * @this {Template.Store}
     * @param {Template.BuiltinComponentRecord} record
     */
    restore(record) {
      restoreGeneral.apply(this, [record])
    }
  }
}

/**
 * @this {Template.Store}
 * @param {'undo'|'restore'} action
 * @param {Template.BuiltinComponentRecord} record
 */
export function recordHandle(action, record) {
  switch (record.type) {
    case 'component:add':
      recordActionHandle.componentAdd[action].apply(this, [record])
      break
    case 'component:del':
      recordActionHandle.componentDel[action].apply(this, [record])
      break
    case 'component:move:end':
    case 'component:resize:end':
    case 'component:font:change':
      recordActionHandle.componentGeneral[action].apply(this, [record])
      break
  }
}

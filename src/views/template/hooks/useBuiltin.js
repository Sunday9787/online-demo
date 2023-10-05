import { reactive, onMounted, onBeforeUnmount } from 'vue'
import {
  basicBuiltinComponent,
  otherBuiltinComponent,
  customBuiltinComponent
} from '@/views/template/components/builtin'
import { templateChannel } from '@/views/template/constant'
import eventBus from '@/utils/eventBus'

const builtinComponents = [basicBuiltinComponent, otherBuiltinComponent, customBuiltinComponent]

export function useBuiltinComponent() {
  /**
   * @type {Array<{label: string, items: Template.BuiltinComponentItem[]}>}
   */
  const builtinComponent = [
    { label: '基本控件', items: [] },
    { label: '其他控件', items: [] },
    { label: '自定义控件', items: [] }
  ]

  /**
   * @type {Map<string, Template.BuiltinComponentItem>}
   */
  const builtinComponentMap = new Map()

  builtinComponents.forEach((components, index) => {
    for (const item of components) {
      const data = reactive({
        label: item.label,
        id: item.id,
        used: false,
        offset: { x: 0, y: 0 }
      })

      builtinComponentMap.set(item.id, data)
      builtinComponent[index].items.push(data)
    }
  })

  /**
   * @param {Template.Event} e
   */
  const stageClear = function (e) {
    builtinComponent.forEach(function (value) {
      value.items.forEach(function (item) {
        item.used = false
      })
    })
  }

  /**
   * @param {Template.Event<Template.BuiltinComponent>} e
   */
  const componentAdd = function (e) {
    const item = builtinComponentMap.get(e.detail.shapeId)
    item.used = true
  }

  /**
   * @param {Template.Event<Template.BuiltinComponent>} e
   */
  const componentDel = function (e) {
    const item = builtinComponentMap.get(e.detail.shapeId)
    item.used = false
  }

  onMounted(function () {
    eventBus.$on(templateChannel.componentAdd, componentAdd)
    eventBus.$on(templateChannel.componentDel, componentDel)
    eventBus.$on(templateChannel.stageClear, stageClear)
  })

  onBeforeUnmount(function () {
    eventBus.$off(templateChannel.componentAdd, componentAdd)
    eventBus.$off(templateChannel.componentDel, componentDel)
    eventBus.$off(templateChannel.stageClear, stageClear)
  })

  return { builtinComponent }
}

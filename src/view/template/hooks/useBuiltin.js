import { reactive, inject, watch, onMounted, onBeforeUnmount } from 'vue'
import {
  basicBuiltinComponent,
  otherBuiltinComponent,
  customBuiltinComponent
} from '@/view/template/components/builtin'
import { storeSymbol, templateChannel } from '@/view/template/constant'
import eventBus from '@/util/eventBus'

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
   * @type {Template.Store}
   */
  const store = inject(storeSymbol)

  watch(
    () => store.componentsData,
    function (val) {
      if (val.length < 1) {
        builtinComponent.forEach(function (value) {
          value.items.forEach(function (item) {
            item.used = false
          })
        })
      }
    }
  )

  /**
   * @param {Template.Event<string>} e
   */
  const componentAddFinish = function (e) {
    if (builtinComponentMap.has(e.detail)) {
      const item = builtinComponentMap.get(e.detail)
      item.used = true
    }
  }

  onMounted(function () {
    eventBus.$on(templateChannel.componentAddFinish, componentAddFinish)
  })

  onBeforeUnmount(function () {
    eventBus.$off(templateChannel.componentAddFinish, componentAddFinish)
  })

  return { builtinComponent }
}

import { reactive, inject, watch, onMounted, onBeforeUnmount } from 'vue'
import {
  basicBuiltinComponent,
  otherBuiltinComponent,
  customBuiltinComponent
} from '@/view/template/action/components/builtin'
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
   * @type {Record<string, Template.BuiltinComponentItem>}
   */
  const builtinComponentMap = Object.create(null)

  builtinComponents.forEach((components, index) => {
    for (const [id, item] of components) {
      builtinComponentMap[id] = reactive({ label: item.props.label, id, used: false, offset: { x: 0, y: 0 } })
      builtinComponent[index].items.push(builtinComponentMap[id])
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
    if (e.detail in builtinComponentMap) {
      builtinComponentMap[e.detail].used = true
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

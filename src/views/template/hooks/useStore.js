import { reactive } from 'vue'
import { usePadding } from './usePadding'
import { useSize } from './useSize'

export function useStore() {
  let changes = 0
  const size = useSize()
  const padding = usePadding()

  /**
   * @type {Template.Store}
   */
  const state = reactive({
    name: '',
    direction: 'vertical',
    get changes() {
      return changes
    },
    set changes(val) {
      changes = val
      this.componentsData = Array.from(this.components.values())
    },
    size: {
      name: size.A4.name,
      /** @type {number} */
      get width() {
        return size[this.name][state.direction].width
      },
      /** @type {number} */
      get height() {
        return size[this.name][state.direction].height
      }
    },
    padding,
    /**
     * @type {Map<string, Template.BuiltinComponent>}
     */
    components: new Map(),
    /**
     * @type {Template.BuiltinComponent[]}
     */
    componentsData: [],
    /**
     * 历史记录
     * @type {Template.BuiltinComponentRecord[]}
     */
    record: [],
    /**
     * 恢复队列
     * @type {Template.BuiltinComponentRecord[]}
     */
    restore: [],
    /**
     * @type {Template.BuiltinComponent|null}
     */
    currentComponent: null
  })

  return state
}

import { reactive } from 'vue'
import { usePadding } from './usePadding'
import { useSize } from './useSize'

export function useStore() {
  const size = useSize()
  const padding = usePadding()

  const state = reactive({
    name: '',
    direction: 'vertical',
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
     * @type {Template.CurrentComponent|null}
     */
    currentComponent: null
  })

  return state
}

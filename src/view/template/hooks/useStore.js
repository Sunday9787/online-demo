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
    components: [],
    currentComponent: null
  })

  return state
}

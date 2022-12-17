import { reactive } from 'vue'
import { usePadding } from './usePadding'
import { useSize } from './useSize'

export function useStore() {
  const { A4: size } = useSize()
  const padding = usePadding()

  const state = reactive({
    name: '',
    size: size.vertical,
    padding,
    components: [],
    currentComponent: null
  })

  return state
}

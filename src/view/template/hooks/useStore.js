import { reactive } from 'vue'
import { useSize } from './useSize'

export function useStore() {
  const { A4: size } = useSize()

  const state = reactive({
    size,
    components: []
  })

  return state
}

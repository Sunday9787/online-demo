import { reactive } from 'vue'

export function useLocation() {
  const state = reactive({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  })

  return state
}

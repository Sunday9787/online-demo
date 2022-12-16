import { reactive } from 'vue'

export function usePadding() {
  const padding = reactive({
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
  })

  return padding
}

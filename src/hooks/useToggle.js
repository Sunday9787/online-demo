import { ref } from 'vue'

export function useToggle(init = false) {
  const value = ref(init)
  const toggle = function () {
    value.value = !value.value
  }

  return { value, toggle }
}

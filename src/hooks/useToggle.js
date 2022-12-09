import { ref, getCurrentInstance } from 'vue'

export function useToggle(init = false) {
  const vm = getCurrentInstance().proxy
  const value = ref(init)

  /**
   * @param {boolean} [val]
   */
  const toggle = function (val) {
    if (val !== undefined) {
      value.value = val
      vm.$emit('input', value.value)
      vm.$emit('change', value.value)
      return
    }

    value.value = !value.value
    vm.$emit('input', value.value)
    vm.$emit('change', value.value)
  }

  return { value, toggle }
}

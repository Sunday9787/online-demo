import { getCurrentInstance, ref } from 'vue'

/**
 * @param {string} active
 */
export function useTab(active) {
  const vm = getCurrentInstance().proxy
  const tabActive = ref(active)

  /**
   * @param {string} val
   */
  const changeTab = function (val) {
    tabActive.value = val
    vm.$emit('input', tabActive.value)
    vm.$emit('change', tabActive.value)
  }

  return { tabActive, changeTab }
}

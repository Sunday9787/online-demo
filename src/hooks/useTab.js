import { ref } from 'vue'

/**
 * @param {string} active
 */
export function useTab(active) {
  const tabActive = ref(active)

  /**
   * @param {string} val
   */
  const changeTab = function (val) {
    tabActive.value = val
  }

  return { tabActive, changeTab }
}

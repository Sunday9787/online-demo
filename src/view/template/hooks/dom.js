import { isRef, onMounted, ref } from 'vue'

/**
 * @param {import('vue').Ref<HTMLElement> | HTMLElement} el
 */
export function useBoundingClientRect(el) {
  /**
   * @type {import('vue').Ref<DOMRect>}
   */
  const boundingClientRect = ref({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  })

  onMounted(function () {
    if (isRef(el)) {
      boundingClientRect.value = el.value.getBoundingClientRect()
      return
    }

    boundingClientRect.value = el.getBoundingClientRect()
  })

  return { boundingClientRect }
}

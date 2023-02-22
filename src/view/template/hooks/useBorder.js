import { onMounted } from 'vue'
import { getBorderSize } from '@/view/template/utils'

/**
 * @param {Vue} target
 */
export function useBorderSize(target) {
  const border = { w: 0, h: 0 }

  onMounted(function () {
    const [w, h] = getBorderSize(target.$el)
    border.w = w
    border.h = h
  })

  return border
}

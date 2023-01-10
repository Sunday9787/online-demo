import { onMounted, reactive } from 'vue'

const reg = /(?<width>\d+\.?\d+)\w+/

/**
 * @param {Vue} target
 */
export function useBorderSize(target) {
  const border = reactive({ w: 0, h: 0 })

  onMounted(function () {
    const style = window.getComputedStyle(target.$el)
    const borderLeftWidthMatch = reg.exec(style.borderLeftWidth)
    const borderTopWidthMatch = reg.exec(style.borderTopWidth)

    if (borderLeftWidthMatch && borderTopWidthMatch) {
      const w = Number(borderLeftWidthMatch.groups.width)
      const h = Number(borderTopWidthMatch.groups.width)

      border.w = w
      border.h = h
    }
  })

  return { border }
}

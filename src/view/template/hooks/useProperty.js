import { reactive } from 'vue'

/**
 * @param {number} [x]
 * @param {number} [y]
 */
export function usePosition(x = 0, y = 0) {
  const state = reactive({ x, y })
  return state
}

/**
 * @param {number} [w]
 * @param {number} [h]
 */
export function useSize(w = 0, h = 0) {
  const state = reactive({ w, h })
  return state
}

export function useFont() {
  const fonts = [
    { label: '微软雅黑', value: 'Microsoft YaHei' },
    { label: '黑体', value: 'STHeitiSC-Light' },
    { label: '华文黑体', value: 'STXihei' },
    { label: '华文宋体', value: 'STSong' },
    { label: '宋体', value: 'STSongti-SC-Regular' },
    { label: '楷体', value: 'STKaitiSC-Regular' },
    { label: 'Arial', value: 'Arial' },
    { label: 'Tahoma', value: 'Tahoma' },
    { label: 'Helvetica', value: 'Helvetica' }
  ]

  return { font: fonts[0], fonts }
}

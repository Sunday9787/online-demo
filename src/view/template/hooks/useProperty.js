import { isMac } from '@/util/validate'

/**
 * @param {number} [x]
 * @param {number} [y]
 */
export function usePosition(x = 0, y = 0) {
  const state = { x, y }
  return state
}

/**
 * @param {number} [w]
 * @param {number} [h]
 */
export function useSize(w = 0, h = 0) {
  const state = { w, h }
  return state
}

export function useFont() {
  /**
   * @type {ReadonlyArray<Readonly<{label: string, value: string}>>}
   */
  const fonts = [
    {
      label: '微软雅黑',
      get value() {
        return isMac() ? 'Microsoft YaHei' : '微软雅黑'
      }
    },
    {
      label: '黑体',
      get value() {
        return isMac() ? 'STHeitiSC-Light' : '黑体'
      }
    },
    {
      label: '华文黑体',
      get value() {
        return isMac() ? 'STHeiti' : '华文黑体'
      }
    },
    {
      label: '华文宋体',
      get value() {
        return isMac() ? 'STSong' : '华文宋体'
      }
    },
    {
      label: '宋体',
      get value() {
        return isMac() ? 'STSongti-SC-Regular' : '宋体'
      }
    },
    {
      label: '楷体',
      get value() {
        return isMac() ? 'STKaitiSC-Regular' : '楷体'
      }
    },
    {
      label: 'Arial',
      get value() {
        return isMac() ? 'Arial' : 'Arial'
      }
    },
    {
      label: 'Tahoma',
      get value() {
        return isMac() ? 'Tahoma' : 'Tahoma'
      }
    },
    {
      label: 'Helvetica',
      get value() {
        return isMac() ? 'Helvetica' : 'Helvetica'
      }
    }
  ]

  return { font: fonts[0], fonts }
}

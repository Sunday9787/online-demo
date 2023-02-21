/**
 * @param {number} [x]
 * @param {number} [y]
 */
export function usePosition(x = 0, y = 0) {
  const state = { x, y }
  return state
}

/**
 * @param {object} options
 * @param {number} [options.w]
 * @param {number} [options.h]
 * @param {Template.BuiltinComponentName} [options.type]
 */
export function useSize(options = { w: 0, h: 0, type: '' }) {
  const state = { w: options.w, h: options.h }

  switch (options.type) {
    case 'builtin-input':
    case 'builtin-select':
      state.w = 240
      state.h = 24
      break
  }

  return state
}

export function useFont() {
  /**
   * @type {ReadonlyArray<Readonly<{label: string, value: string}>>}
   */
  const fonts = [
    {
      label: '宋体',
      value: 'SimSun'
    },
    {
      label: '微软雅黑',
      value: 'Microsoft YaHei'
    },
    {
      label: '黑体',
      value: 'SimHei'
    },
    {
      label: '华文黑体',
      value: 'STHeiti'
    },
    {
      label: '华文宋体',
      value: 'STSong'
    },
    {
      label: '楷体',
      value: 'KaiTi'
    },
    {
      label: 'Arial',
      value: 'Arial'
    },
    {
      label: 'Tahoma',
      value: 'Tahoma'
    },
    {
      label: 'Helvetica',
      value: 'Helvetica'
    }
  ]

  return { font: fonts[0], fonts }
}

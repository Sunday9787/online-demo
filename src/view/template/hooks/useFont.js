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

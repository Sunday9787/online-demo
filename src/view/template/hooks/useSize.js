import { reactive } from 'vue'

export function useSize() {
  const A4 = reactive({
    name: 'A4',
    vertical: {
      width: 794,
      height: 1123
    },
    horizontal: {
      width: 1123,
      height: 794
    }
  })

  const A5 = reactive({
    name: 'A5',
    vertical: {
      width: 559,
      height: 794
    },
    horizontal: {
      width: 794,
      height: 559
    }
  })

  return { A4, A5 }
}

import { reactive } from 'vue'

export function useSize() {
  const A4 = reactive({
    name: 'A4',
    width: 794,
    height: 1123
  })

  const A5 = reactive({
    name: 'A5',
    width: 559,
    height: 794
  })

  return { A4, A5 }
}

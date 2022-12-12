import { reactive } from 'vue'

export function useSize() {
  const A4 = reactive({
    width: 794,
    height: 1123
  })

  const A5 = reactive({
    width: 559,
    height: 794
  })

  return { A4, A5 }
}

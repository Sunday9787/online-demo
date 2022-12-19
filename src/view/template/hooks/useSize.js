import { readonly } from 'vue'

const A4 = readonly({
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

const A5 = readonly({
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

export function useSize() {
  return { A4, A5 }
}

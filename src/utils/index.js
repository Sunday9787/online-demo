import Calculator from './class/Calculator'

/**
 * @param {number} value
 */
export function calculator(value) {
  return new Calculator(value)
}

/**
 * @param {Array<unknown>} data
 * @returns {unknown|null}
 */
export function last(data) {
  return data.length ? data[data.length - 1] : null
}

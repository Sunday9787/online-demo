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

/**
 * 角度转弧度
 * @param {number} angle 角度
 */
export function radian(angle) {
  return (Math.PI / 180) * angle
}

/**
 * @param {TemplateDocument.BuiltinComponent} time
 * @returns {Promise<void>}
 */
export function sleep(time) {
  return new Promise(function (resolve) {
    window.setTimeout(resolve, time)
  })
}

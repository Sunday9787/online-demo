/**
 * 是否为外部链接
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 数字仅保留一位小数点
 * @param {string} value
 * @returns {boolean}
 * @example
 * isNumberPoint1('09.0') => false
 *
 * isNumberPoint1('9.00') => false
 *
 * isNumberPoint1('999.0') => true
 *
 * isNumberPoint1('0.0') => true
 *
 * isNumberPoint1('0') => true
 */
export function isNumberPoint1(value) {
  return /^([1-9]\d*|0)(\.\d)?$/.test(value)
}

/**
 * 数字仅保留二位小数点
 * @param {string} value
 * @returns {boolean}
 * @example
 * isNumberPoint1('09.00') => false
 *
 * isNumberPoint1('9.00') => false
 *
 * isNumberPoint1('999.00') => true
 *
 * isNumberPoint1('0.00') => true
 *
 * isNumberPoint1('0') => true
 */
export function isNumberPoint2(value) {
  return /^([1-9]\d*|0)(\.\d{1,2})?$/.test(value)
}

/**
 * 检测是否为整型
 */
export function isInteger(value) {
  return /^([1-9]\d*|0)$/.test(value)
}

/**
 * 校验手机号
 * **/
export function validMobile(str) {
  return /^1[3-9]\d{9}$/.test(str)
}

export function isMac() {
  return /macintosh|mac os x/i.test(navigator.userAgent)
}

export function isWin() {
  return /win/i.test(navigator.userAgent)
}

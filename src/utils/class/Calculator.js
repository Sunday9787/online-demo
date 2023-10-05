import NP from 'number-precision'

export default class Calculator {
  /**
   * @private
   * @type {number}
   */
  value = null

  /**
   * @private
   * @type {Array<(prevValue: number) => number>}
   */
  queue = []

  /**
   * @param {number} value
   */
  constructor(value) {
    if (typeof value !== 'string' && typeof value !== 'number') {
      throw new TypeError('value 必须是 字符串number，或者 number')
    }

    this.value = value
  }

  /**
   * 加法
   * @param {number} value
   */
  plus(value) {
    this.queue.push(function (prevValue) {
      return NP.plus(value, prevValue)
    })

    return this
  }

  /**
   * 减法
   * @param {number} value
   */
  minus(value) {
    this.queue.push(function (prevValue) {
      return NP.minus(prevValue, value)
    })

    return this
  }

  /**
   * 乘法
   * @param {number} value
   */
  times(value) {
    this.queue.push(function (prevValue) {
      return NP.times(prevValue, value)
    })

    return this
  }

  /**
   * 除法
   * @param {number} value
   */
  divide(value) {
    this.queue.push(function (prevValue) {
      return NP.divide(prevValue, value)
    })

    return this
  }

  exec() {
    return this.queue.reduce(function (previousValue, currentValue) {
      return currentValue(previousValue)
    }, this.value)
  }
}

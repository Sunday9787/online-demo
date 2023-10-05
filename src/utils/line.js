/**
 * @param {Line.Config} config
 */
export function createLine(config) {
  /**
   * @type {Line.Hooks[]}
   */
  const hooks = []
  /**
   * @type {Line.Method}
   */
  const method = {
    hook(fn) {
      hooks.push(fn)
    }
  }

  /**
   * @param {Line.Handle} fn
   * @returns {unknown}
   */
  return function (fn) {
    let configured = false
    let step = 0

    /**
     * @this {any}
     * @param {unknown[]} args
     */
    return function (...args) {
      if (!configured) {
        config.call(this, method)
        configured = true
        step = hooks.length
      }

      let i = 0

      while (true) {
        const hook = hooks[i]
        const result = hook.apply(this, args)

        if (result) {
          if (i === step - 1) {
            fn.apply(this, args)
            break
          }

          i++
          continue
        }

        break
      }
    }
  }
}

export default createLine

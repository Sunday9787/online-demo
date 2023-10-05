class Dep {
  constructor() {
    this.dep = []
  }

  /**
   * @param {Function} fn
   */
  subscribe(fn) {
    this.dep.push(fn)
  }

  /**
   * @param {Function} fn
   */
  delete(fn) {
    for (const [index, item] of Object.entries(this.dep)) {
      if (item === fn) {
        this.dep.splice(index, 1)
        break
      }
    }
  }

  notify(...args) {
    this.dep.forEach(function (item) {
      item.update(args)
    })
  }
}

class Watcher {
  constructor(cb) {
    /**
     * @type {Function}
     */
    this.cb = cb
  }

  update(...args) {
    this.cb.apply(null, args)
  }
}

export default function reactive(obj) {
  if (Object.isFrozen(obj)) {
    return
  }

  for (const [key, value] of Object.entries(obj)) {
    const dep = new Dep()

    const watcher = new Watcher(function (...args) {
      console.log.apply(null, args)
    })

    dep.subscribe(watcher)

    Object.defineProperty(obj, key, {
      get() {
        return obj[key]
      },
      set(val) {
        dep.notify(val)
        obj[key] = val
      }
    })

    if (typeof value === 'object') {
      reactive(value)
    }
  }
}

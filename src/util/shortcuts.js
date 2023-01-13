/**
 * @type {Record<string, {handle: Array<(e: KeyboardEvent) => void>, cb: Array<(e: KeyboardEvent) => void>}
 */
const event = Object.create(null)

/**
 * @param {string[]} hotKeys
 * @param {(e: KeyboardEvent) => void} callback
 */
export function shortcuts(hotKeys, callback) {
  /**
   * @type {string[]}
   */
  const downKeys = []
  const eventKeys = hotKeys.join('-')

  /**
   * @param {KeyboardEvent} e
   */
  const keydown = function (e) {
    e.preventDefault()

    const key = e.key.toLowerCase()
    if (downKeys.indexOf(key) < 0) {
      downKeys.push(key)
    }

    console.log(downKeys)
    if (downKeys.length === hotKeys.length) {
      if (downKeys.every((key, index) => key === hotKeys[index])) {
        event[eventKeys].cb.forEach(cb => {
          cb(e)
        })
      }
    }
  }

  const keyup = function (e) {
    downKeys.splice(0)
  }

  if (eventKeys in event) {
    event[eventKeys].cb.push(callback)
  } else {
    event[eventKeys] = { handle: [keydown, keyup], cb: [callback] }
  }

  window.addEventListener('keydown', keydown)
  window.addEventListener('keyup', keyup)
}

/**
 * @param {string} hotKeys
 * @param {(e: KeyboardEvent) => void} handle
 */
shortcuts.off = function (hotKeys, cb) {
  const eventKeys = hotKeys.join('-')

  if (eventKeys in event[eventKeys]) {
    const index = event[eventKeys].cb.findIndex(item => item === cb)

    if (event[eventKeys].cb.length) {
      event[eventKeys].cb.splice(index, 1)
      return
    }

    delete event[eventKeys]

    const [keydown, keyup] = event[eventKeys].handle
    window.removeEventListener('keydown', keydown)
    window.removeEventListener('keyup', keyup)
  }
}

export default shortcuts

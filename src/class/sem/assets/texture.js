import { cache } from './cache'

export class Texture {
  /**
   * @type {string}
   */
  url

  /**
   * @type {number|null}
   */
  width = null

  /**
   * @type {number|null}
   */
  height = null

  /**
   * @type {ImageBitmap|null}
   */
  bitmap = null

  /**
   * @param {string} url
   * @param {number} [width]
   * @param {number} [height]
   */
  constructor(url, width, height) {
    this.url = url
    this.width = width
    this.height = height
  }

  /**
   * @returns {Promise<ImageBitmap>}
   */
  load() {
    const self = this

    if (cache.has(this.url)) {
      const data = cache.get(this.url)
      data.then(function (value) {
        self.bitmap = value
      })
      return data
    }

    /**
     * @type {Promise<ImageBitmap>}
     */
    const result = new Promise(function (resolve, reject) {
      const source = new Image()

      source.onerror = reject
      source.onload = async function () {
        if (self.width && self.height) {
          self.bitmap = await window.createImageBitmap(source, { resizeWidth: self.width, resizeHeight: self.height })
        } else {
          self.bitmap = await window.createImageBitmap(source)
          self.width = source.width
          self.height = source.height
        }

        cache.set(self.url, result)
        source.remove()

        resolve(self.bitmap)
      }

      source.src = self.url
    })

    return result
  }
}

import { cache } from './cache'

export class Texture {
  /**
   * @param {string} url
   */
  static from(url) {
    const asset = cache.get(url)
    if (asset) {
      return new Texture(asset)
    }
  }

  /**
   * @type {number|null}
   */
  width = null

  /**
   * @type {number|null}
   */
  height = null

  /**
   * @type {import('./assets').Asset|null}
   */
  asset = null

  /**
   * @param {ImageBitmap} asset
   * @param {number} [width]
   * @param {number} [height]
   */
  constructor(asset, width, height) {
    this.asset = asset
    this.width = width || asset.width
    this.height = height || asset.height
  }
}

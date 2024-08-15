import { cache } from './cache'

/**
 * @param {string} url
 */
function resolve(url) {
  /**
   * @type {Promise<ImageBitmap>}
   */
  return new Promise(function (resolve, reject) {
    const source = new Image()
    /**
     * @type {ImageBitmap}
     */
    let bitmap

    source.onerror = reject
    source.onload = async function () {
      bitmap = await window.createImageBitmap(source)

      const asset = new Asset()
      asset.bitmap = bitmap
      asset.width = source.width
      asset.height = source.height
      asset.url = url

      cache.set(url, asset)
      source.remove()

      resolve(bitmap)
    }
    source.src = url
  })
}

export class Asset {
  /**
   * @param {string[]} assets
   */
  static async load(assets) {
    for (const item of assets) {
      if (cache.has(item)) continue
      await resolve(item)
    }
  }

  /**
   * @type {ImageBitmap|null}
   */
  bitmap = null
  width = 0
  height = 0
  url = ''
}

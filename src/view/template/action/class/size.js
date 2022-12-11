/* eslint-disable no-useless-constructor */
/**
 * @returns {Promise<number>}
 */
function ratio() {
  return new Promise((resolve, reject) => {
    const el = document.createElement('div')
    el.style.width = '1cm'
    document.body.appendChild(el)

    setTimeout(() => {
      const size = Number(/\d+\.\d+/.exec(window.getComputedStyle(el).width)[0])
      resolve(size)
      document.body.removeChild(el)
    }, 0)
  })
}

export class TemplateSize {
  /**
   * @param {object} options
   * @param {number} options.width
   * @param {number} options.height
   * @param {number} options.DPI
   */
  constructor(options) {
    this.width = options.width
    this.height = options.height
    this.ratio = 0
    this.DPI = options.DPI || 300
  }

  async init() {
    this.ratio = await ratio()
    return this
  }

  /**
   * @param {number} mm
   */
  mm2Pixel(mm) {
    return (mm * (this.ratio / 10)).toFixed(2)
  }
}

export class TemplateMMSize extends TemplateSize {
  /**
   * @param {object} options
   * @param {number} options.width
   * @param {number} options.height
   * @param {number} options.DPI
   */
  constructor(options) {
    super(options)
  }

  toPixel() {
    return {
      width: this.mm2Pixel(this.width),
      height: this.mm2Pixel(this.height)
    }
  }
}

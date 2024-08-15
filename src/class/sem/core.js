export class Application {
  /**
   * @type {number}
   */
  width

  /**
   * @type {number}
   */
  height

  /**
   *
   * @type {HTMLCanvasElement}
   */
  canvas

  /**
   * @private
   * @type {CanvasRenderingContext2D}
   */
  ctx

  /**
   * @type {Stage}
   */
  stage = new Stage()

  /**
   * @param {number} [width]
   * @param {number} [height]
   */
  constructor(width, height) {
    this.height = height
    this.width = width
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')

    if (height) {
      this.canvas.width = width
      this.canvas.height = height
      this.width = width
      this.height = height

      return
    }

    this.canvas.width = document.documentElement.clientWidth
    this.canvas.height = document.documentElement.clientHeight
    this.width = document.documentElement.clientWidth
    this.height = document.documentElement.clientHeight
  }

  /**
   * @param {object} option
   * @param {string} option.background
   * @param {HTMLElement | Window} option.resizeTo
   */
  init(option) {
    const self = this

    option.resizeTo.onresize = function (e) {
      const width = self.canvas.parentElement.clientWidth
      const height = self.canvas.parentElement.clientHeight

      self.canvas.width = width
      self.canvas.height = height
      self.width = width
      self.height = height
    }

    const render = function () {
      self.render(option)
      self.stage.render(self)
      window.requestAnimationFrame(render)
    }

    window.requestAnimationFrame(render)
  }

  /**
   * @param {object} option
   * @param {string} option.background
   * @param {HTMLElement | Window} option.resizeTo
   */
  render(option) {
    this.ctx.fillStyle = option.background
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.restore()
  }
}

export class Stage {
  /**
   * @type {import('./spirit').Spirit[]}
   */
  children = []

  /**
   * @param {import('./spirit').Spirit} sprit
   */
  add(sprit) {
    this.children.push(sprit)
  }

  /**
   * @param {Application} app
   */
  render(app) {
    for (const item of this.children) {
      item.render(app)
    }
  }
}

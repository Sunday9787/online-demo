class Anchor {
  /**
   * @param {[number]|[number,number]} args
   * @returns {[number, number]}
   */
  static serialize(...args) {
    const [x, y] = args

    if (y) {
      return args
    }

    return [x, x]
  }

  x = 0
  y = 0

  /**
   * @type {[number, number]}
   */
  get anchor() {
    return [this.x, this.y]
  }

  /**
   * @param {[number]|[number,number]} args
   */
  constructor(...args) {
    const [x, y] = Anchor.serialize(...args)
    this.x = x
    this.y = y
  }

  /**
   * @example
   * set(0.5); // This will set the origin to center. (0.5) is same as (0.5, 0.5).
   * @param {[number]|[number,number]} args
   */
  set(...args) {
    const [x, y] = Anchor.serialize(...args)
    this.x = x
    this.y = y
  }
}

export class Spirit {
  /**
   * @type {import('./assets/texture').Texture}
   */
  texture

  /**
   * @type {Anchor}
   */
  anchor = new Anchor(0)

  x = 0
  y = 0

  /**
   * @param {import('./assets/texture').Texture} texture
   */
  constructor(texture) {
    this.texture = texture
  }

  /**
   * @param {import('./core').Application} app
   */
  async render(app) {
    await this.texture.load()
    app.ctx.drawImage(
      this.texture.bitmap,
      this.x - this.texture.width * this.anchor.x,
      this.y - this.texture.height * this.anchor.y,
      this.texture.width,
      this.texture.height
    )
  }
}

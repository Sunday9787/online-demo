import { register } from '@antv/x6-vue-shape'

const components = (function () {
  /**
   * @type {Record<string, GtGraphic.NodeComponent[]>}
   */
  const result = Object.create(null)

  /**
   * @type {Record<string, { default: GtGraphic.NodeComponent }>}
   */
  const data = import.meta.glob(['./**/index.js'], {
    eager: true
  })

  for (const [key, item] of Object.entries(data)) {
    register(item.default.register())

    const group = (function () {
      const result = key.match(/(\w+)*-(\w+)*/)
      if (result) {
        return result[1]
      }
    })()

    if (group) {
      if (result[group]) {
        result[group].push(item.default)
      } else {
        result[group] = [item.default]
      }
    }
  }

  return result
})()

export default components

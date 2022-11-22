const components = (function () {
  /**
   * @type {Vue.Component[]}
   */
  const result = []
  /**
   * @type {Record<string, {default: Vue.Component}>}
   */
  const data = import.meta.glob(['./**/index.vue', './**/index.jsx'], { eager: true })

  for (const item of Object.values(data)) {
    result.push(item.default)
  }

  return result
})()

/**
 * @type {Vue.PluginObject<Vue>}
 */
const setup = {
  install(vue) {
    components.forEach(item => {
      vue.component(item.name, item)
    })
  }
}

export default setup

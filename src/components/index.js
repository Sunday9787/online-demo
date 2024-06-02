const components = (function () {
  /**
   * @type {Record<string, {default: Vue.Component}>}
   */
  const data = import.meta.glob(['./**/index.vue', './**/index.jsx'], { eager: true })

  return Object.values(data).map(item => item.default)
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

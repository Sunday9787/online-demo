const directive = (function () {
  /**
   * @type {Directive[]}
   */
  const result = []
  /**
   * @type {Record<string, {default: Record<string, unknown>}>}
   */
  const data = import.meta.glob(['./v-*.js'], { eager: true })

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
    directive.forEach(item => {
      vue.directive(item.name, item.option)
    })
  }
}

export default setup

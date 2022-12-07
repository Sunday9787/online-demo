/**
 * @type {Vue.ComponentOptions<Vue>}
 */
const mixin = {
  methods: {
    noop() {}
  }
}

/**
 * @type {Vue.PluginObject<Vue>}
 */
const setup = {
  install(vue) {
    vue.mixin(mixin)
  }
}

export default setup

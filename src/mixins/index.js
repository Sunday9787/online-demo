import { mixinForm } from './form'

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
    vue.mixin(mixinForm)
  }
}

export default setup

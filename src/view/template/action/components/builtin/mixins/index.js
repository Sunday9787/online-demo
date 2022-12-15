/**
 * @type {Vue.ComponentOptions<Vue>}
 */
const mixin = {
  props: {
    mode: {
      type: String,
      default: 'shape'
    }
  },
  computed: {
    isShape() {
      return this.mode === 'shape'
    }
  }
}

export default mixin

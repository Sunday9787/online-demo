/**
 * @type {Vue.ComponentOptions<Vue>}
 */
const mixin = {
  props: {
    mode: {
      type: String,
      default: 'shape'
    },
    label: {
      type: String,
      required: true
    },
    size: {
      type: Object,
      required: true
    },
    property: {
      type: Object,
      required: true
    },
    position: {
      type: Object,
      required: true
    }
  },
  computed: {
    isShape() {
      return this.mode === 'shape'
    }
  }
}

export default mixin

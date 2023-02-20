import * as transformCase from '@/util/case'
import { formatComponentStyle } from '@/view/template/utils'

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
  data() {
    return {
      name: ''
    }
  },
  created() {
    this.name = this.$vnode.componentOptions.Ctor.options.name
  },
  computed: {
    id() {
      return transformCase.kebabCase(this.name) + '-' + this._uid
    },
    isShape() {
      return this.mode === 'shape'
    },
    style() {
      return formatComponentStyle(this.property)
    },
    containerStyle() {
      /**
       * @type {import('vue/types/jsx').StyleValue}
       */
      const style = Object.assign(Object.create(null), this.style)

      if (this.name === 'BuiltinInput') {
        delete style.borderWidth
        delete style.borderColor
        delete style.borderStyle
      }

      if (this.group) {
        style.position = 'absolute'
        style.left = this.position.x + 'px'
        style.top = this.position.y + 'px'
        style.width = this.size.w + 'px'
        style.height = style.lineHeight + 'px'
      }

      return style
    },
    valueStyle() {
      if (this.name === 'BuiltinInput') {
        return {
          borderWidth: this.style.borderWidth,
          borderBottomStyle: this.style.borderStyle,
          borderColor: this.style.borderColor
        }
      }

      return null
    }
  }
}

export default mixin

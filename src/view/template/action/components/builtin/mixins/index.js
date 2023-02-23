import * as transformCase from '@/util/case'
import { formatComponentStyle } from '@/view/template/utils'

const borderComponent = ['BuiltinInput', 'BuiltinSelect']

/**
 * @param {string} componentName
 */
function isInnerBorderComponent(componentName) {
  return borderComponent.indexOf(componentName) > -1
}

/**
 * @type {Vue.ComponentOptions<Vue>}
 */
const mixin = {
  inheritAttrs: false,
  props: {
    lock: {
      type: Boolean,
      required: true
    },
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
    },
    group: {
      type: Boolean,
      default: false
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
    formValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
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

      if (isInnerBorderComponent(this.name)) {
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
      if (isInnerBorderComponent(this.name)) {
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

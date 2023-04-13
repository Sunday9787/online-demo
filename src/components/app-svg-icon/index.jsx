import { defineComponent } from 'vue'

export default defineComponent({
  functional: true,
  name: 'AppSvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon'
    },
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#333'
    },
    height: {
      type: [Number, String],
      default: 50
    },
    width: {
      type: [Number, String],
      default: 50
    },
    size: {
      type: [Array, Number, String],
      required: false
    }
  },
  render(h, context) {
    const props = context.props
    /**
     * @type {[string|Number, string|Number]}
     */
    const [width, height] = (function () {
      if (props.size instanceof Array) {
        return props.size
      }

      if (typeof props.size === 'string' || typeof props.size === 'number') {
        return [props.size, props.size]
      }

      return [props.width, props.height]
    })()

    return (
      <svg aria-hidden='true' width={width} height={height}>
        <use xlinkHref={`#${props.prefix}-${props.name}`} fill={props.color} />
      </svg>
    )
  }
})

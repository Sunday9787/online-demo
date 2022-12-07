import { defineComponent } from 'vue'

const verticalMap = {
  vertical: 'height',
  horizontal: 'width'
}

const validate = ['horizontal', 'vertical']

export default defineComponent({
  name: 'AppCollapseTransition',
  props: {
    direction: {
      type: String,
      default: 'vertical',
      /**
       * @param {string} value
       */
      validator(value) {
        return validate.indexOf(value) > -1
      }
    },
    size: {
      type: Number,
      required: false
    },
    tag: {
      type: [Boolean, String],
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    /**
     * @type {'width'|'height'}
     */
    const transitionAttribute = verticalMap[props.direction]
    const transitionSize = props.size ? props.size + 'px' : null

    return {
      transitionAttribute,
      transitionSize
    }
  },
  methods: {
    /**
     * @param {HTMLElement} el
     */
    beforeEnter(el) {
      el.style[this.transitionAttribute] = '0px'
      el.style.overflow = el.dataset.overflow
      el.style.transitionProperty = this.transitionAttribute
      el.style.transitionTimingFunction = 'ease'
      el.style.transitionDuration = '400ms'
    },
    /**
     * @param {HTMLElement} el
     * @param {Function} done
     */
    enter(el, done) {
      setTimeout(() => {
        el.style[this.transitionAttribute] = el.dataset.size || this.transitionSize
        setTimeout(() => {
          done()
        }, 400)
      }, 0)
    },
    /**
     * @param {HTMLElement} el
     */
    afterEnter(el) {
      el.style.transitionProperty = ''
      el.style.transitionTimingFunction = ''
      el.style.transitionDuration = ''
    },
    /**
     * @param {HTMLElement} el
     */
    beforeLeave(el) {
      el.dataset.size = this.transitionSize || window.getComputedStyle(el)[this.transitionAttribute]

      el.style.overflow = 'hidden'
      el.style[this.transitionAttribute] = el.dataset.size
      el.style.transitionProperty = this.transitionAttribute
      el.style.transitionTimingFunction = 'ease'
      el.style.transitionDuration = '400ms'
    },
    /**
     * @param {HTMLElement} el
     * @param {Function} done
     */
    leave(el, done) {
      el.style[this.transitionAttribute] = '0px'
      setTimeout(() => {
        done()
      }, 400)
    },
    /**
     * @param {HTMLElement} el
     */
    afterLeave(el) {
      el.style.overflow = el.dataset.overflow
      el.style[this.transitionAttribute] = ''
      el.style.transitionProperty = ''
      el.style.transitionTimingFunction = ''
      el.style.transitionDuration = ''
    }
  },
  render(h) {
    /**
     * @type {import('vue').VNode}
     */
    const vnode = (function (context) {
      if (context.tag) {
        return h(
          context.tag,
          {
            style: { overflow: 'hidden', width: context.transitionSize },
            directives: [
              {
                name: 'show',
                rawName: 'v-show',
                value: context.visible,
                expression: 'visible'
              }
            ]
          },
          [context.$slots.default]
        )
      }

      return context.$slots.default
    })(this)

    return (
      <transition
        css={false}
        on={{
          beforeEnter: this.beforeEnter,
          enter: this.enter,
          afterEnter: this.afterEnter,
          beforeLeave: this.beforeLeave,
          leave: this.leave,
          afterLeave: this.afterLeave
        }}
      >
        {[vnode]}
      </transition>
    )
  }
})

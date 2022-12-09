<template>
  <transition
    :css="false"
    @beforeEnter="beforeEnter"
    @enter="enter"
    @afterEnter="afterEnter"
    @beforeLeave="beforeLeave"
    @leave="leave"
    @afterLeave="afterLeave"
  >
    <div v-if="tag" v-show="visible" :style="{ overflow: 'hidden', width: transitionSize }">
      <slot />
    </div>
    <slot v-else />
  </transition>
</template>

<script>
import { defineComponent } from 'vue'

const verticalMap = {
  vertical: 'height',
  horizontal: 'width'
}

const validate = ['horizontal', 'vertical']

export default defineComponent({
  name: 'AppCollapseTransition2',
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
      console.log(el, 'beforeEnter')
      console.log(this, 'beforeEnter')
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
      console.log(el, 'afterEnter')
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
      console.log(el.scrollHeight, 'beforeLeave')
    },
    /**
     * @param {HTMLElement} el
     * @param {Function} done
     */
    leave(el, done) {
      el.style[this.transitionAttribute] = '0px'
      setTimeout(() => {
        console.log(el, 'leave')
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
      console.log(el, 'afterLeave')
    }
  }
})
</script>

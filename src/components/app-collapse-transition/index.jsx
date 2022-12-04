import { defineComponent } from 'vue'

const event = {
  /**
   * @param {HTMLElement} el
   */
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = el.dataset.overflow
    el.style.transitionProperty = 'height'
    el.style.transitionTimingFunction = 'ease'
    el.style.transitionDuration = '400ms'
    console.log(el, 'beforeEnter')
  },
  /**
   * @param {HTMLElement} el
   * @param {Function} done
   */
  enter(el, done) {
    setTimeout(() => {
      el.style.height = el.dataset.scrollHeight
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
    el.dataset.scrollHeight = window.getComputedStyle(el).height

    el.style.overflow = 'hidden'
    el.style.height = el.dataset.scrollHeight
    el.style.transitionProperty = 'height'
    el.style.transitionTimingFunction = 'ease'
    el.style.transitionDuration = '400ms'
    console.log(el.scrollHeight, 'beforeLeave')
  },
  /**
   * @param {HTMLElement} el
   * @param {Function} done
   */
  leave(el, done) {
    el.style.height = '0px'
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
    el.style.height = ''
    el.style.transitionProperty = ''
    el.style.transitionTimingFunction = ''
    el.style.transitionDuration = ''
    console.log(el, 'afterLeave')
  }
}

export default defineComponent({
  functional: true,
  name: 'AppCollapseTransition',
  render(h, context) {
    return (
      <transition css={false} on={event}>
        {context.slots().default}
      </transition>
    )
  }
})

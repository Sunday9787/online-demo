import { debounce } from 'lodash-es'
import { isNumberPoint2 } from '@/util/validate'

/**
 * @type {Directive}
 */
export const number2 = {
  name: 'number2',
  option: {
    bind(el, binding, vnode) {
      /**
       * @type {import('element-ui').Input}
       */
      const instance = vnode.componentInstance
      const input = el.querySelector('input')

      if (!input) {
        console.error('未找到input原素')
        return
      }

      input.addEventListener(
        'blur',
        /**
         * @param {FocusEvent} e
         */
        debounce(function (e) {
          /**
           * @type {HTMLInputElement}
           */
          const target = e.target

          if (!target.value) {
            return
          }

          if (!isNumberPoint2(target.value)) {
            target.value = ''
            target.dispatchEvent(new Event('input'))
            instance.$message.warning('您输入的内容不正确，请重新输入')
            instance.focus()
          }
        }, 500)
      )
    }
  }
}

export default number2

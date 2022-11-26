import { debounce } from 'lodash-es'
import { isInteger } from '@/util/validate'

/**
 * @type {Directive}
 */
export const integer = {
  name: 'integer',
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
        debounce(
          /**
           * @param {FocusEvent} e
           */
          function (e) {
            /**
             * @type {HTMLInputElement}
             */
            const target = e.target
            console.log(target.value)

            if (!target.value) {
              return
            }

            if (!isInteger(target.value)) {
              target.value = ''
              target.dispatchEvent(new Event('input'))
              instance.$message.warning('您输入的内容不正确，请重新输入')
              instance.focus()
            }
          },
          500
        )
      )
    }
  }
}

export default integer

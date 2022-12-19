import { reactive, readonly } from 'vue'

/**
 * @param {object} options
 * @param {Function} options.submit
 * @param {Function} options.open
 */
export function useDialog(options) {
  const actionType = readonly({
    open: 'action:visible',
    close: 'action:hidden',
    submit: 'action:submit'
  })

  const state = reactive({
    visible: false,
    editor: true
  })

  /**
   * @param {'action:visible'|'action:hidden'|'action:submit'} type
   */
  const action = function (type) {
    switch (type) {
      case actionType.open:
        state.visible = true
        options.open?.apply(null)
        break
      case actionType.close:
        state.visible = false
        break
      case actionType.submit:
        options.submit()
    }
  }

  return { state, actionType, action }
}

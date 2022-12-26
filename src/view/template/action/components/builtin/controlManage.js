import { getCurrentInstance, inject, onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * @type {Map<number, Vue>}
 */
const controls = new Map()

export function useControl() {
  /**
   * @type {Vue}
   */
  const stageInstance = inject('stageInstance')
  const vm = getCurrentInstance().proxy

  /**
   * 是否多选
   */
  const multiple = ref(false)

  /**
   * @param {PointerEvent} e
   */
  const pointerdown = function (e) {
    for (const [_uid, control] of controls) {
      if (vm._uid === _uid) continue

      if (!multiple.value) {
        control.visible = false
      }
    }
  }

  /**
   * @param {KeyboardEvent} e
   */
  const keydown = function (e) {
    if (e.shiftKey) {
      multiple.value = true
    }
  }

  /**
   * @param {KeyboardEvent} e
   */
  const keyup = function (e) {
    multiple.value = false
  }

  onMounted(function () {
    controls.set(vm._uid, vm)

    vm.$el.addEventListener('pointerdown', pointerdown)
    stageInstance.$el.addEventListener('keydown', keydown)
    stageInstance.$el.addEventListener('keyup', keyup)
  })

  onBeforeUnmount(function () {
    controls.delete(vm._uid)

    vm.$el.removeEventListener('pointerdown', pointerdown)
    stageInstance.$el.removeEventListener('keydown', keydown)
    stageInstance.$el.removeEventListener('keyup', keyup)
  })

  return { multiple }
}

import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { storeSymbol, templateChannel } from '@/view/template/constant'
import { getRect } from '@/view/template/utils'
import eventBus from '@/util/eventBus'

/**
 * @param {number} dragValue
 * @param {number} targetValue
 */
function isNearly(dragValue, targetValue) {
  return Math.abs(dragValue - targetValue) <= 5
}

/**
 * @type {Record<string, (rect1: Template.Rect, rect2: Template.Rect) => {visible: boolean, position: {left: number, top: number}}}}>}
 */
const conditions = {
  yl(rect1, rect2) {
    const ll = {
      visible: isNearly(rect1.left, rect2.left),
      position: { left: rect2.left, top: 0 }
    }

    const lr = {
      visible: isNearly(rect1.left, rect2.right),
      position: { left: rect2.right, top: 0 }
    }

    return ll.visible ? ll : lr
  },
  yc(rect1, rect2) {
    return {
      visible: isNearly(rect1.right - rect1.width / 2, rect2.right - rect2.width / 2),
      position: { left: rect2.right - rect2.width / 2, top: 0 }
    }
  },
  yr(rect1, rect2) {
    const rr = {
      visible: isNearly(rect1.right, rect2.right),
      position: { left: rect2.right, top: 0 }
    }

    const rl = {
      visible: isNearly(rect1.right, rect2.left),
      position: { left: rect2.left, top: 0 }
    }

    return rr.visible ? rr : rl
  },
  xt(rect1, rect2) {
    const tt = {
      visible: isNearly(rect1.top, rect2.top),
      position: { left: 0, top: rect2.top }
    }

    const tb = {
      visible: isNearly(rect1.top, rect2.bottom),
      position: { left: 0, top: rect2.bottom }
    }

    return tt.visible ? tt : tb
  },
  xc(rect1, rect2) {
    return {
      visible: isNearly(rect1.bottom - rect1.height / 2, rect2.bottom - rect2.height / 2),
      position: { left: 0, top: rect2.bottom - rect2.height / 2 }
    }
  },
  xb(rect1, rect2) {
    const bb = {
      visible: isNearly(rect1.bottom, rect2.bottom),
      position: { left: 0, top: rect2.bottom }
    }

    const bt = {
      visible: isNearly(rect1.bottom, rect2.top),
      position: { left: 0, top: rect2.top }
    }

    return bb.visible ? bb : bt
  }
}

export function useMarkLine() {
  /**
   * @type {Template.Store}
   */
  const store = inject(storeSymbol)

  /**
   * @type {import('vue').Ref<Array<{type: 'yl'|'yc'|'yr'|'xt'|'xc'|'xb',direction: string, visible: boolean, position: {left: number, top: number}}>>}
   */
  const markLine = ref([
    { type: 'yl', direction: 'vertical', visible: false, position: { left: 0, top: 0 } },
    { type: 'yc', direction: 'vertical', visible: false, position: { left: 0, top: 0 } },
    { type: 'yr', direction: 'vertical', visible: false, position: { left: 0, top: 0 } },
    { type: 'xt', direction: 'horizontal', visible: false, position: { left: 0, top: 0 } },
    { type: 'xc', direction: 'horizontal', visible: false, position: { left: 0, top: 0 } },
    { type: 'xb', direction: 'horizontal', visible: false, position: { left: 0, top: 0 } }
  ])

  /**
   * @param {Template.Event<Template.BuiltinComponent>} e
   */
  const moveHandle = function (e) {
    const currentComponent = e.detail
    const currentRect = getRect(currentComponent)

    for (const [key, item] of store.components) {
      if (key === currentComponent.uid) continue

      const rect = getRect(item)

      let condition = 0

      for (const line of markLine.value) {
        const { visible, position } = conditions[line.type].apply(null, [currentRect, rect])
        line.visible = visible
        line.position = position

        if (visible) {
          condition += 1

          /**
           * @type {[number, number]}
           */
          const [x, y] = [
            position.left || currentComponent.props.position.x,
            position.top || currentComponent.props.position.y
          ]

          switch (line.type) {
            case 'xt':
              currentComponent.props.position.x = x
              currentComponent.props.position.y = y
              break
            case 'xc':
              currentComponent.props.position.x = x
              currentComponent.props.position.y = y - currentComponent.props.size.h / 2
              break
            case 'xb':
              currentComponent.props.position.x = x
              currentComponent.props.position.y = y - currentComponent.props.size.h
              break
            case 'yc':
              currentComponent.props.position.x = x - currentComponent.props.size.w / 2
              currentComponent.props.position.y = y
              break
            case 'yl':
              currentComponent.props.position.x = x
              currentComponent.props.position.y = y
              break
            case 'yr':
              currentComponent.props.position.x = x - currentComponent.props.size.w
              currentComponent.props.position.y = y
              break
          }
        }
      }

      if (condition) break
    }
  }

  /**
   * @param {Template.BuiltinComponentType} type
   * @param {Template.BuiltinComponent} component
   */
  const moveEndHandle = function (type, component) {
    markLine.value.forEach(item => {
      item.visible = false
    })
  }

  onMounted(function () {
    eventBus.$on(templateChannel.componentMove, moveHandle)
    eventBus.$on(templateChannel.componentMoveEnd, moveEndHandle)
  })

  onBeforeUnmount(function () {
    eventBus.$off(templateChannel.componentMove, moveHandle)
    eventBus.$off(templateChannel.componentMoveEnd, moveEndHandle)
  })

  return { markLine }
}

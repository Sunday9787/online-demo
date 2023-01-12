import { inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { storeSymbol, templateChannel } from '@/view/template/constant'
import { getRect } from '@/view/template/utils'
import eventBus from '@/util/eventBus'

/**
 * @param {number} dragValue
 * @param {number} targetValue
 */
function isNearly(dragValue, targetValue) {
  return Math.abs(dragValue - targetValue) <= 2
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
  const markLine = ref([
    { type: 'yl', direction: 'vertical', visible: false, position: { left: 0, top: 0 } },
    { type: 'yc', direction: 'vertical', visible: false, position: { left: 0, top: 0 } },
    { type: 'yr', direction: 'vertical', visible: false, position: { left: 0, top: 0 } },
    { type: 'xt', direction: 'horizontal', visible: false, position: { left: 0, top: 0 } },
    { type: 'xc', direction: 'horizontal', visible: false, position: { left: 0, top: 0 } },
    { type: 'xb', direction: 'horizontal', visible: false, position: { left: 0, top: 0 } }
  ])

  /**
   * @param {Template.Event} e
   */
  const moveHandle = function (e) {
    const currentRect = getRect(e.detail)

    // eslint-disable-next-line no-labels
    components: for (const [key, item] of store.components) {
      if (key === e.detail.key) continue

      const rect = getRect(item)

      for (const line of Object.values(markLine.value)) {
        const { visible, position } = conditions[line.type].apply(null, [currentRect, rect])
        line.visible = visible
        line.position = position
        // eslint-disable-next-line no-labels
        if (visible) break components
      }
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

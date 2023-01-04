<template lang="pug">
  svg.template-auxiliary-line(xmlns="http://www.w3.org/2000/svg"
    :style="svgStyle"
    :width="size.width"
    :height="size.height")
    line(:stroke="lineStyle" x1="0" y1="0" :x2="size.width" :y2="size.height")
</template>

<script>
import { onBeforeUnmount, inject, computed, ref, reactive } from 'vue'
import { templateChannel, storeSymbol } from '@/view/template/constant'
import eventBus from '@/util/eventBus'

/**
 * @param {Template.BuiltinComponent} component
 * @returns {Template.Rect}
 */
function getRect(component) {
  const left = component.props.position.x
  const top = component.props.position.y
  const right = left + component.props.size.w
  const bottom = top + component.props.size.h

  return { left, top, right, bottom }
}

const computerAidedLineDraw = {
  diff: 5,
  /**
   * @param {Template.Rect} current
   * @param {Template.Rect} item
   * @returns {boolean}
   */
  left(current, item) {
    const offsetLeft = Math.abs(current.left - item.left)
    return offsetLeft <= this.diff
  },
  /**
   * @param {Template.Rect} current
   * @param {Template.Rect} item
   * @returns {boolean}
   */
  top(current, item) {
    const offsetTop = Math.abs(current.top - item.top)
    return offsetTop <= this.diff
  },
  /**
   * @param {Template.Rect} current
   * @param {Template.Rect} item
   * @returns {boolean}
   */
  topBottom(current, item) {
    const offsetTopBottom = Math.abs(current.top - item.bottom)
    return offsetTopBottom <= this.diff
  },
  /**
   * @param {Template.Rect} current
   * @param {Template.Rect} item
   * @returns {boolean}
   */
  right(current, item) {
    const offsetRight = Math.abs(current.right - item.right)
    return offsetRight <= this.diff
  },
  /**
   * @param {Template.Rect} current
   * @param {Template.Rect} item
   * @returns {boolean}
   */
  bottom(current, item) {
    const offsetBottom = Math.abs(current.bottom - item.bottom)
    return offsetBottom <= this.diff
  },
  /**
   * @param {Template.Rect} current
   * @param {Template.Rect} item
   * @returns {boolean}
   */
  bottomTop(current, item) {
    const offsetBottom = Math.abs(current.bottom - item.top)
    return offsetBottom <= this.diff
  },
  /**
   * @param {Template.Rect} current
   * @param {Template.Rect} item
   * @returns {boolean}
   */
  rightLeft(current, item) {
    const offsetRightLeft = Math.abs(current.right - item.left)
    return offsetRightLeft <= this.diff
  },
  /**
   * @param {Template.Rect} current
   * @param {Template.Rect} item
   * @returns {boolean}
   */
  leftRight(current, item) {
    const offsetRightLeft = Math.abs(current.left - item.right)
    return offsetRightLeft <= this.diff
  }
}

export default {
  name: 'TemplateAuxiliaryLine',
  props: {
    direction: {
      type: String,
      default: 'horizontal'
    }
  },
  setup(props) {
    /**
     * @type {Template.Store}
     */
    const store = inject(storeSymbol)

    const visible = ref(false)
    const position = reactive({ x: 0, y: 0 })
    const isHorizontal = computed(() => props.direction === 'horizontal')
    const lineStyle = computed(() => (visible.value ? 'var(--color-primary)' : 'transparent'))

    /**
     * @param {Template.BuiltinComponentRecordType} type
     * @param {Template.BuiltinComponent} component
     */
    const handle = function (type, component) {
      const currentRect = getRect(component)

      for (const [key, item] of store.components) {
        if (component.key === key) continue
        const rect = getRect(item)

        if (isHorizontal.value) {
          const nearTop = computerAidedLineDraw.top(currentRect, rect)
          const nearBottom = computerAidedLineDraw.bottom(currentRect, rect)
          const nearTopBottom = computerAidedLineDraw.topBottom(currentRect, rect)
          const nearBottomTop = computerAidedLineDraw.bottomTop(currentRect, rect)

          if (nearTop) {
            visible.value = true
            position.y = rect.top
            break
          }

          if (nearBottom) {
            visible.value = true
            position.y = rect.bottom
            break
          }

          if (nearTopBottom) {
            visible.value = true
            position.y = rect.bottom
            break
          }

          if (nearBottomTop) {
            visible.value = true
            position.y = rect.top
            break
          }

          visible.value = false
        } else {
          const nearLeft = computerAidedLineDraw.left(currentRect, rect)
          const nearRight = computerAidedLineDraw.right(currentRect, rect)
          const nearRightLeft = computerAidedLineDraw.rightLeft(currentRect, rect)
          const nearLeftRight = computerAidedLineDraw.leftRight(currentRect, rect)

          if (nearLeft) {
            visible.value = true
            position.x = rect.left
            break
          }

          if (nearRight) {
            visible.value = true
            position.x = rect.right
            break
          }

          if (nearRightLeft) {
            visible.value = true
            position.x = rect.left
            break
          }

          if (nearLeftRight) {
            visible.value = true
            position.x = rect.right
            break
          }

          visible.value = false
        }
      }
    }

    eventBus.$on(templateChannel.componentPropertyPositionChange, handle)
    onBeforeUnmount(function () {
      eventBus.$off(templateChannel.componentPropertyPositionChange, handle)
    })

    return { isHorizontal, lineStyle, position }
  },
  computed: {
    size() {
      if (this.isHorizontal) {
        return { width: '100%', height: '1' }
      }

      return { width: '1', height: '100%' }
    },
    svgStyle() {
      return {
        left: this.position.x + 'px',
        top: this.position.y + 'px'
      }
    }
  }
}
</script>

<style lang="scss">
.template-auxiliary-line {
  position: absolute;
  left: 0;
  top: 0;
}
</style>

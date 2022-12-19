<template lang="pug">
  div.template-control(
    :class="{select}"
    :style="wrapperStyle"
    @pointerdown.stop="onPointerdown")
    div.template-control-mask
    i.template-control-point.top-left(@pointerdown.stop="onControlPointerdown('topLeft', $event)")
    i.template-control-point.top-center(@pointerdown.stop="onControlPointerdown('topCenter', $event)")
    i.template-control-point.top-right(@pointerdown.stop="onControlPointerdown('topRight', $event)")
    i.template-control-point.center-left(@pointerdown.stop="onControlPointerdown('centerLeft', $event)")
    i.template-control-point.center-right(@pointerdown.stop="onControlPointerdown('centerRight', $event)")
    i.template-control-point.bottom-left(@pointerdown.stop="onControlPointerdown('bottomLeft', $event)")
    i.template-control-point.bottom-center(@pointerdown.stop="onControlPointerdown('bottomCenter', $event)")
    i.template-control-point.bottom-right(@pointerdown.stop="onControlPointerdown('bottomRight', $event)")
    slot
</template>

<script>
import { getCurrentInstance, nextTick, onBeforeMount, onMounted, reactive, ref } from 'vue'

/**
 * @type {Record<string, (this: Vue, e: PointerEvent) => void>}
 */
const onPointeDownHandle = {
  topLeft(e) {},
  topCenter(e) {},
  topRight(e) {},
  centerLeft(e) {},
  centerRight(e) {
    const rect = this.$el.getBoundingClientRect()
    const scale = this.scale / 100
    this.stashPosition = {
      x: this.$el.offsetWidth * scale + rect.left,
      y: (this.$el.offsetHeight / 2) * scale + rect.top
    }
  },
  bottomLeft(e) {},
  bottomCenter(e) {
    const rect = this.$el.getBoundingClientRect()
    const scale = this.scale / 100

    this.stashPosition = {
      x: (this.$el.offsetWidth / 2) * scale + rect.left,
      y: this.$el.offsetHeight * scale + rect.top
    }
  },
  bottomRight(e) {
    const rect = this.$el.getBoundingClientRect()
    const scale = this.scale / 100
    this.stashPosition = {
      x: this.$el.offsetWidth * scale + rect.left,
      y: this.$el.offsetHeight * scale + rect.top
    }
  }
}

/**
 * @type {Record<string, (this: Vue, e: PointerEvent) => void>}
 */
const onPointermoveHandle = {
  topLeft(e) {},
  topCenter(e) {},
  topRight(e) {},
  centerLeft(e) {},
  centerRight(e) {
    if (this.stashPosition) {
      const scale = this.scale / 100
      let w = this.initSize.w * scale + (e.pageX - this.stashPosition.x)

      /**
       * 左边限制
       */
      if (w <= this.miniSize.w * scale) {
        w = this.miniSize.w * scale
      }

      /**
       * 右边限制
       */
      if (this.$el.offsetLeft * scale + w >= this.stageInstance.$el.clientWidth * scale) {
        w = (this.stageInstance.$el.clientWidth - this.$el.offsetLeft) * scale
      }

      this.position.w = w / scale
    }
  },
  bottomLeft(e) {},
  bottomCenter(e) {
    if (this.stashPosition) {
      const scale = this.scale / 100
      let h = this.initSize.h * scale + (e.pageY - this.stashPosition.y)

      /**
       * 上边限制
       */
      if (h <= this.miniSize.h * scale) {
        h = this.miniSize.h * scale
      }

      /**
       * 下边限制
       */
      if (this.$el.offsetTop * scale + h >= this.stageInstance.$el.clientHeight * scale) {
        h = this.stageInstance.$el.clientHeight * scale - this.$el.offsetTop * scale
      }

      this.position.h = h / scale
    }
  },
  bottomRight(e) {
    const scale = this.scale / 100
    let w = this.initSize.w * scale + (e.pageX - this.stashPosition.x)
    let h = this.initSize.h * scale + (e.pageY - this.stashPosition.y)

    /**
     * 左边限制
     */
    if (w <= this.miniSize.w * scale) {
      w = this.miniSize.w * scale
    }

    /**
     * 上边限制
     */
    if (h <= this.miniSize.h * scale) {
      h = this.miniSize.h * scale
    }

    /**
     * 右边限制
     */
    if (this.$el.offsetLeft * scale + w >= this.stageInstance.$el.clientWidth * scale) {
      w = (this.stageInstance.$el.clientWidth - this.$el.offsetLeft) * scale
    }

    /**
     * 下边限制
     */
    if (this.$el.offsetTop * scale + h >= this.stageInstance.$el.clientHeight * scale) {
      h = (this.stageInstance.$el.clientHeight - this.$el.offsetTop) * scale
    }

    this.position.w = w / scale
    this.position.h = h / scale
  }
}

export default {
  name: 'TemplateControl',
  inject: ['stageInstance'],
  props: {
    scale: {
      type: Number,
      default: 1
    }
  },
  setup(props, context) {
    const vm = getCurrentInstance().proxy
    const select = ref(false)
    /**
     * 指针点击类型 - 控制方向类型/null
     */
    const pointType = ref(null)
    /**
     * 实际显示 定位 & 宽度
     */
    const position = reactive({ x: 0, y: 0, h: 0, w: 0 })
    /**
     * 暂存拖动位置 pageX/pageY
     */
    const stashPosition = ref(null)
    /**
     * 初始控件大小
     * 每次拖动后需更新此值
     */
    const initSize = reactive({ w: 0, h: 0 })
    /**
     * 最小控件大小
     */
    const miniSize = reactive({ w: 0, h: 0 })

    /**
     * @param {PointerEvent} e
     */
    const onPointerdown = function (e) {
      const scale = props.scale / 100

      select.value = true
      pointType.value = null
      stashPosition.value = {
        x: e.pageX - vm.$el.offsetLeft * scale,
        y: e.pageY - vm.$el.offsetTop * scale
      }
      context.emit('select', vm)
    }

    /**
     * @param {PointerEvent} e
     */
    const onPointermove = function (e) {
      if (stashPosition.value) {
        const scale = props.scale / 100
        if (pointType.value) {
          onPointermoveHandle[pointType.value].call(vm, e)
          return
        }

        let x = e.pageX - stashPosition.value.x
        let y = e.pageY - stashPosition.value.y

        /**
         * 左边限制
         */
        if (x <= 0) x = 0

        /**
         * 上边限制
         */
        if (y <= 0) y = 0

        /**
         * 右边限制
         */
        if (x > (vm.stageInstance.$el.clientWidth - initSize.w) * scale) {
          x = (vm.stageInstance.$el.clientWidth - initSize.w) * scale
        }

        /**
         * 下边限制
         */
        if (y > (vm.stageInstance.$el.clientHeight - initSize.h) * scale) {
          y = (vm.stageInstance.$el.clientHeight - initSize.h) * scale
        }

        position.x = x / scale
        position.y = y / scale
      }
    }

    /**
     * @param {PointerEvent} e
     */
    const onPointerup = function (e) {
      stashPosition.value = null
      pointType.value = null
      initSize.w = position.w
      initSize.h = position.h
    }

    /**
     * @param {PointerEvent} e
     */
    const onBodyPointerdown = function (e) {
      select.value = false
    }

    onMounted(function () {
      nextTick(function () {
        position.w = initSize.w = miniSize.w = vm.$el.offsetWidth
        position.h = initSize.h = miniSize.h = vm.$el.offsetHeight
      })

      vm.stageInstance.$el.addEventListener('pointerdown', onBodyPointerdown)
      vm.stageInstance.$el.addEventListener('pointermove', onPointermove)
      vm.stageInstance.$el.addEventListener('pointerup', onPointerup)
    })

    onBeforeMount(function () {
      vm.stageInstance.$el.removeEventListener('pointerdown', onBodyPointerdown)
      vm.stageInstance.$el.removeEventListener('pointermove', onPointermove)
      vm.stageInstance.$el.removeEventListener('pointerup', onPointerup)
    })

    return { select, pointType, initSize, miniSize, position, stashPosition, onPointerdown }
  },
  computed: {
    wrapperStyle() {
      return {
        left: this.position.x + 'px',
        top: this.position.y + 'px',
        width: this.position.w ? this.position.w + 'px' : 'auto',
        height: this.position.h ? this.position.h + 'px' : 'auto'
      }
    }
  },
  methods: {
    /**
     * @param {string} pointType
     * @param {PointerEvent} e
     */
    onControlPointerdown(pointType, e) {
      this.pointType = pointType
      onPointeDownHandle[pointType].call(this, e)
    }
  }
}
</script>

<style lang="scss">
.template-control {
  position: absolute;
  user-select: none;

  &.select {
    .template-control-mask,
    .template-control-point {
      visibility: visible;
    }
  }

  &:active {
    cursor: grab;
  }
}

.template-control-mask,
.template-control-point {
  visibility: hidden;
}

.template-control-mask {
  position: absolute;
  height: 100%;
  width: 100%;
  border: 1px solid var(--color-primary);
}

.template-control-point {
  position: absolute;
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid var(--color-primary);

  &.top-left {
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    cursor: nwse-resize;
  }

  &.top-center {
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
    cursor: ns-resize;
  }

  &.top-right {
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    cursor: nesw-resize;
  }

  &.center-left {
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: ew-resize;
  }

  &.center-right {
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
    cursor: ew-resize;
  }

  &.bottom-left {
    left: 0;
    bottom: 0;
    transform: translate(-50%, 50%);
    cursor: nesw-resize;
  }

  &.bottom-center {
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 50%);
    cursor: ns-resize;
  }

  &.bottom-right {
    right: 0;
    bottom: 0;
    transform: translate(50%, 50%);
    cursor: nwse-resize;
  }
}
</style>

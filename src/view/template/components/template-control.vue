<template lang="pug">
  div.template-control(
    :class="{ visible, lock }"
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
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useControl } from '@/view/template/hooks/controlManage'
import { useBorderSize } from '@/view/template/hooks/useBorder'

/**
 * @type {Record<string, (this: Vue, e: PointerEvent) => void>}
 */
const onPointeDownHandle = {
  topLeft(e) {
    const rect = this.$el.getBoundingClientRect()
    this.stashPosition = {
      x: rect.left,
      y: rect.top
    }
  },
  topCenter(e) {
    const rect = this.$el.getBoundingClientRect()
    this.stashPosition = {
      x: rect.left,
      y: rect.top
    }
  },
  topRight(e) {
    const rect = this.$el.getBoundingClientRect()
    const scale = this.scale / 100
    this.stashPosition = {
      x: this.$el.offsetWidth * scale + rect.left,
      y: rect.top
    }
  },
  centerLeft(e) {
    const rect = this.$el.getBoundingClientRect()
    this.stashPosition = {
      x: rect.left,
      y: rect.top
    }
  },
  centerRight(e) {
    const rect = this.$el.getBoundingClientRect()
    const scale = this.scale / 100
    this.stashPosition = {
      x: this.$el.offsetWidth * scale + rect.left,
      y: (this.$el.offsetHeight / 2) * scale + rect.top
    }
  },
  bottomLeft(e) {
    const rect = this.$el.getBoundingClientRect()
    const scale = this.scale / 100

    this.stashPosition = {
      x: rect.left,
      y: this.$el.offsetHeight * scale + rect.top
    }
  },
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
  topLeft(e) {
    if (this.stashPosition) {
      const scale = this.scale / 100
      const rect = this.stageInstance.$el.getBoundingClientRect()
      let y = e.pageY - rect.top - this.offset.h * scale
      let x = e.pageX - rect.left - this.offset.w * scale

      if (x <= 0) {
        x = 0
      }

      let w = this.data.w + (this.data.x - x / scale)

      if (w <= this.miniSize.w) {
        w = this.miniSize.w
      } else {
        this.data.x = x / scale
      }

      if (y <= 0) {
        y = 0
      }

      let h = this.data.h + (this.data.y - y / scale)

      if (h <= this.miniSize.h) {
        h = this.miniSize.h
      } else {
        this.data.y = y / scale
      }

      this.data.h = h
      this.data.w = w
    }
  },
  topCenter(e) {
    if (this.stashPosition) {
      const scale = this.scale / 100
      const rect = this.stageInstance.$el.getBoundingClientRect()
      let y = e.pageY - rect.top - this.offset.h * scale

      if (y <= 0) {
        y = 0
      }

      let h = this.data.h + (this.data.y - y / scale)

      if (h <= this.miniSize.h) {
        h = this.miniSize.h
      } else {
        this.data.y = y / scale
      }

      this.data.h = h
    }
  },
  topRight(e) {
    if (this.stashPosition) {
      const scale = this.scale / 100
      const rect = this.stageInstance.$el.getBoundingClientRect()
      let w = this.initSize.w * scale + (e.pageX - this.stashPosition.x)

      /**
       * ????????????
       */
      if (w <= this.miniSize.w * scale) {
        w = this.miniSize.w * scale
      }

      /**
       * ????????????
       */
      if (this.$el.offsetLeft * scale + w >= this.stageInstance.$el.clientWidth * scale) {
        w = (this.stageInstance.$el.clientWidth - this.$el.offsetLeft) * scale
      }

      this.data.w = w / scale

      let y = e.pageY - rect.top - this.offset.h * scale

      if (y <= 0) {
        y = 0
      }

      let h = this.data.h + (this.data.y - y / scale)

      if (h <= this.miniSize.h) {
        h = this.miniSize.h
      } else {
        this.data.y = y / scale
      }

      this.data.h = h
    }
  },
  centerLeft(e) {
    if (this.stashPosition) {
      const scale = this.scale / 100
      const rect = this.stageInstance.$el.getBoundingClientRect()
      let x = e.pageX - rect.left - this.offset.w * scale

      if (x <= 0) {
        x = 0
      }

      let w = this.data.w + (this.data.x - x / scale)

      if (w <= this.miniSize.w) {
        w = this.miniSize.w
      } else {
        this.data.x = x / scale
      }

      this.data.w = w
    }
  },
  centerRight(e) {
    if (this.stashPosition) {
      const scale = this.scale / 100
      let w = this.initSize.w * scale + (e.pageX - this.stashPosition.x)

      /**
       * ????????????
       */
      if (w <= this.miniSize.w * scale) {
        w = this.miniSize.w * scale
      }

      /**
       * ????????????
       */
      if (this.$el.offsetLeft * scale + w >= this.stageInstance.$el.clientWidth * scale) {
        w = (this.stageInstance.$el.clientWidth - this.$el.offsetLeft) * scale
      }

      this.data.w = w / scale
    }
  },
  bottomLeft(e) {
    if (this.stashPosition) {
      const scale = this.scale / 100
      const rect = this.stageInstance.$el.getBoundingClientRect()
      let x = e.pageX - rect.left - this.offset.w * scale
      let h = this.initSize.h * scale + (e.pageY - this.stashPosition.y)

      /**
       * ????????????
       */
      if (h <= this.miniSize.h * scale) {
        h = this.miniSize.h * scale
      }

      /**
       * ????????????
       */
      if (this.$el.offsetTop * scale + h >= this.stageInstance.$el.clientHeight * scale) {
        h = this.stageInstance.$el.clientHeight * scale - this.$el.offsetTop * scale
      }

      this.data.h = h / scale

      if (x <= 0) {
        x = 0
      }

      let w = this.data.w + (this.data.x - x / scale)

      if (w <= this.miniSize.w) {
        w = this.miniSize.w
      } else {
        this.data.x = x / scale
      }

      this.data.w = w
    }
  },
  bottomCenter(e) {
    if (this.stashPosition) {
      const scale = this.scale / 100
      let h = this.initSize.h * scale + (e.pageY - this.stashPosition.y)

      /**
       * ????????????
       */
      if (h <= this.miniSize.h * scale) {
        h = this.miniSize.h * scale
      }

      /**
       * ????????????
       */
      if (this.$el.offsetTop * scale + h >= this.stageInstance.$el.clientHeight * scale) {
        h = this.stageInstance.$el.clientHeight * scale - this.$el.offsetTop * scale
      }

      this.data.h = h / scale
    }
  },
  bottomRight(e) {
    const scale = this.scale / 100
    let w = this.initSize.w * scale + (e.pageX - this.stashPosition.x)
    let h = this.initSize.h * scale + (e.pageY - this.stashPosition.y)

    /**
     * ????????????
     */
    if (w <= this.miniSize.w * scale) {
      w = this.miniSize.w * scale
    }

    /**
     * ????????????
     */
    if (h <= this.miniSize.h * scale) {
      h = this.miniSize.h * scale
    }

    /**
     * ????????????
     */
    if (this.$el.offsetLeft * scale + w >= this.stageInstance.$el.clientWidth * scale) {
      w = (this.stageInstance.$el.clientWidth - this.$el.offsetLeft) * scale
    }

    /**
     * ????????????
     */
    if (this.$el.offsetTop * scale + h >= this.stageInstance.$el.clientHeight * scale) {
      h = (this.stageInstance.$el.clientHeight - this.$el.offsetTop) * scale
    }

    this.data.w = w / scale
    this.data.h = h / scale
  }
}

export default {
  name: 'TemplateControl',
  inject: ['stageInstance'],
  props: {
    zIndex: {
      type: Number,
      required: true
    },
    scale: {
      type: Number,
      default: 1
    },
    position: {
      type: Object,
      required: true
    },
    size: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    },
    lock: {
      type: Boolean,
      required: true
    }
  },
  setup(props, context) {
    const vm = getCurrentInstance().proxy
    const visible = computed({
      get() {
        return props.value
      },
      set(val) {
        context.emit('input', val)
      }
    })

    const { multiple } = useControl()
    /**
     * ?????????????????? - ??????????????????/null
     */
    const pointType = ref(null)
    /**
     * ???????????? ?????? & ??????
     * @type {{x: number, y: number, h: number, w: number}}
     */
    const data = reactive({ x: props.position.x, y: props.position.y, h: props.size.h, w: props.size.w })
    /**
     * ?????????????????? pageX/pageY
     */
    const stashPosition = ref(null)
    /**
     * ??????????????????
     * ??????????????????????????????
     */
    const initSize = reactive({ w: 0, h: 0 })
    /**
     * ??????????????????
     */
    const miniSize = reactive({ w: 0, h: 0 })

    const offset = useBorderSize(vm.stageInstance)

    /**
     * @param {PointerEvent} e
     */
    const onPointerdown = function (e) {
      const scale = props.scale / 100

      visible.value = true
      pointType.value = null
      stashPosition.value = {
        x: e.pageX - vm.$el.offsetLeft * scale,
        y: e.pageY - vm.$el.offsetTop * scale
      }

      context.emit('select', vm)
      context.emit('moveStart', { x: data.x, y: data.y })
    }

    /**
     * @param {PointerEvent} e
     */
    const onPointermove = function (e) {
      if (props.lock) return
      if (stashPosition.value) {
        const scale = props.scale / 100
        if (pointType.value) {
          onPointermoveHandle[pointType.value].call(vm, e)

          context.emit('update:position', { x: data.x, y: data.y })
          context.emit('update:size', { w: data.w, h: data.h })
          return
        }

        let x = e.pageX - stashPosition.value.x
        let y = e.pageY - stashPosition.value.y

        /**
         * ????????????
         */
        if (x <= 0) x = 0

        /**
         * ????????????
         */
        if (y <= 0) y = 0

        /**
         * ????????????
         */
        if (x > (vm.stageInstance.$el.clientWidth - initSize.w) * scale) {
          x = (vm.stageInstance.$el.clientWidth - initSize.w) * scale
        }

        /**
         * ????????????
         */
        if (y > (vm.stageInstance.$el.clientHeight - initSize.h) * scale) {
          y = (vm.stageInstance.$el.clientHeight - initSize.h) * scale
        }

        data.x = x / scale
        data.y = y / scale

        context.emit('update:position', { x: data.x, y: data.y })
        context.emit('move', { x: data.x, y: data.y })
      }
    }

    /**
     * @param {PointerEvent} e
     */
    const onPointerup = function (e) {
      if (stashPosition.value) {
        stashPosition.value = null
        pointType.value = null
        initSize.w = data.w
        initSize.h = data.h

        context.emit('moveEnd')
        context.emit('resizeEnd')
      }
    }

    /**
     * @param {PointerEvent} e
     */
    const onBodyPointerdown = function (e) {
      visible.value = false
    }

    onMounted(function () {
      nextTick(function () {
        data.w = initSize.w = miniSize.w = vm.$el.offsetWidth
        data.h = initSize.h = miniSize.h = vm.$el.offsetHeight
        context.emit('update:size', { w: data.w, h: data.h })
      })

      window.addEventListener('pointerdown', onBodyPointerdown)
      vm.stageInstance.$el.addEventListener('pointermove', onPointermove)
      vm.stageInstance.$el.addEventListener('pointerup', onPointerup)
    })

    onBeforeUnmount(function () {
      window.removeEventListener('pointerdown', onBodyPointerdown)
      vm.stageInstance.$el.removeEventListener('pointermove', onPointermove)
      vm.stageInstance.$el.removeEventListener('pointerup', onPointerup)
    })

    return {
      offset,
      visible,
      multiple,
      pointType,
      initSize,
      miniSize,
      data,
      stashPosition,
      onPointerdown
    }
  },
  computed: {
    wrapperStyle() {
      return {
        zIndex: this.zIndex,
        left: this.data.x + 'px',
        top: this.data.y + 'px',
        width: this.data.w ? this.data.w + 'px' : 'auto',
        height: this.data.h ? this.data.h + 'px' : 'auto'
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
      onPointeDownHandle[pointType].apply(this, [e])
      this.$emit('resizeStart', { w: this.data.w, h: this.data.h })
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
    position: {
      deep: true,
      handler(val) {
        this.data.x = val.x
        this.data.y = val.y
      }
    },
    size: {
      deep: true,
      handler(val) {
        this.data.w = val.w
        this.data.h = val.h
      }
    }
  }
}
</script>

<style lang="scss">
.template-control {
  position: absolute;
  user-select: none;

  &.lock {
    .template-control-point {
      display: none;
    }
  }

  &.visible {
    .template-control-mask,
    .template-control-point {
      border-color: var(--color-primary);
    }

    .template-control-point {
      background-color: #fff;
    }
  }

  &:not(.lock):active {
    cursor: grab;
  }
}

.template-control-mask,
.template-control-point {
  border: 1px solid transparent;
}

.template-control-mask {
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
}

.template-control-point {
  position: absolute;
  z-index: 2;
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 50%;

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

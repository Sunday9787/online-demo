<template lang="pug">
  div.template-control(
    ref="el"
    :class="{select}"
    :style="wrapperStyle"
    @pointerdown.stop="onPointerdown")
    div.template-control-mask
    i.template-control-point.top-left(@pointerdown.stop="onControlPointerdown('top-left', $event)")
    i.template-control-point.top-center(@pointerdown.stop="onControlPointerdown('top-center', $event)")
    i.template-control-point.top-right(@pointerdown.stop="onControlPointerdown('top-right', $event)")
    i.template-control-point.center-left(@pointerdown.stop="onControlPointerdown('center-left', $event)")
    i.template-control-point.center-right(@pointerdown.stop="onControlPointerdown('center-right', $event)")
    i.template-control-point.bottom-left(@pointerdown.stop="onControlPointerdown('bottom-left', $event)")
    i.template-control-point.bottom-center(@pointerdown.stop="onControlPointerdown('bottom-center', $event)")
    i.template-control-point.bottom-right(@pointerdown.stop="onControlPointerdown('bottom-right', $event)")
    slot
</template>

<script>
import { getCurrentInstance, onBeforeMount, onMounted, reactive, ref } from 'vue'

/**
 * @type {Record<string, (this: Vue, e: PointerEvent) => void>}
 */
const onPointermoveHandle = {
  'top-left': function (e) {},
  'top-center': function (e) {},
  'top-right': function (e) {},
  'center-left': function (e) {},
  'center-right': function (e) {
    this.position.w = this.initSize.w + this.position.x + (e.pageX - this.stashPosition.x)
  },
  'bottom-left': function (e) {},
  'bottom-center': function (e) {},
  'bottom-right': function (e) {}
}

export default {
  name: 'TemplateControl',
  setup() {
    const vm = getCurrentInstance().proxy
    const select = ref(false)
    const pointType = ref(null)
    const position = reactive({ x: 0, y: 0, h: null, w: null })
    const stashPosition = ref(null)
    const initSize = reactive({ w: 0, h: 0 })

    /**
     * @param {PointerEvent} e
     */
    const onPointerdown = function (e) {
      select.value = true
      pointType.value = null
      stashPosition.value = {
        x: e.pageX - vm.$el.offsetLeft,
        y: e.pageY - vm.$el.offsetTop
      }
    }

    /**
     * @param {PointerEvent} e
     */
    const onPointermove = function (e) {
      if (stashPosition.value) {
        if (pointType.value) {
          onPointermoveHandle[pointType.value].call(vm, e)
          return
        }

        position.x = e.pageX - stashPosition.value.x
        position.y = e.pageY - stashPosition.value.y
      }
    }

    const onPointerup = function (e) {
      stashPosition.value = null
      pointType.value = null
      initSize.w = position.w
    }

    /**
     * @param {PointerEvent} e
     */
    const onBodyPointerdown = function (e) {
      select.value = false
    }

    onMounted(function () {
      position.w = initSize.w = vm.$el.offsetWidth
      position.h = initSize.h = vm.$el.offsetHeight

      document.body.addEventListener('pointerdown', onBodyPointerdown)
      document.body.addEventListener('pointermove', onPointermove)
      document.body.addEventListener('pointerup', onPointerup)
    })

    onBeforeMount(function () {
      document.body.removeEventListener('pointerdown', onBodyPointerdown)
      document.body.removeEventListener('pointermove', onPointermove)
      document.body.removeEventListener('pointerup', onPointerup)
    })

    return { select, pointType, initSize, position, stashPosition, onPointerdown }
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
      console.log(pointType, e.target)
      this.pointType = pointType
      this.stashPosition = {
        x: e.pageX - this.$el.offsetLeft,
        y: e.pageY - this.$el.offsetTop
      }
    }
  }
}
</script>

<style lang="scss">
.template-control {
  position: absolute;

  &.select {
    .template-control-mask,
    .template-control-point {
      visibility: visible;
    }
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

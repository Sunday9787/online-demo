<template lang="pug">
  svg.template-area(
    xmlns="http://www.w3.org/2000/svg"
    :width="rectStyle.width"
    :height="rectStyle.height"
    :style="{ left: rectStyle.left, top: rectStyle.top }")
    rect(stroke="var(--color-primary)" fill="rgba(0, 0, 0, 0.1)" stroke-width="1" height="100%" width="100%")
</template>

<script>
import { getCurrentInstance, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import eventBus from '@/util/eventBus'

export default {
  name: 'TemplateArea',
  inject: ['stageInstance'],
  props: {
    scale: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const vm = getCurrentInstance().proxy
    const stagePosition = ref(null)
    const rect = reactive({ w: 0, h: 0, x: 0, y: 0 })

    /**
     * @param {PointerEvent} e
     */
    const pointerdown = function (e) {
      if (vm.stageInstance.spaceDown) return
      const scale = props.scale / 100
      const x = (e.pageX - vm.stageRect.x) / scale - vm.offset.x
      const y = (e.pageY - vm.stageRect.y) / scale - vm.offset.y

      rect.x = x
      rect.y = y

      stagePosition.value = { x: e.pageX, y: e.pageY }
    }

    /**
     * @param {PointerEvent} e
     */
    const pointermove = function (e) {
      if (stagePosition.value) {
        const scale = props.scale / 100
        const w = (e.pageX - stagePosition.value.x) / scale
        const h = (e.pageY - stagePosition.value.y) / scale

        rect.w = w
        rect.h = h
      }
    }

    /**
     * @param {PointerEvent} e
     */
    const pointerup = function (e) {
      stagePosition.value = null
      rect.w = rect.h = rect.x = rect.y = 0
    }

    const stageChangeHandle = function (val) {
      nextTick(function () {
        vm.updateOffset()
        vm.updateRect()
      })
    }

    onMounted(function () {
      eventBus.$on('template-stage:position:change', stageChangeHandle)
      eventBus.$on('template-stage:padding:change', stageChangeHandle)
      eventBus.$on('template-stage:size:change', stageChangeHandle)
      eventBus.$on('template-stage:scale:change', stageChangeHandle)
      eventBus.$emit('template-stage:size:change')

      vm.stageInstance.$el.addEventListener('pointerdown', pointerdown)
      vm.stageInstance.$el.addEventListener('pointermove', pointermove)
      vm.stageInstance.$el.addEventListener('pointerup', pointerup)
    })

    onBeforeUnmount(function () {
      eventBus.$off('template-stage:position:change', stageChangeHandle)
      eventBus.$off('template-stage:padding:change', stageChangeHandle)
      eventBus.$off('template-stage:size:change', stageChangeHandle)
      eventBus.$off('template-stage:scale:change', stageChangeHandle)

      vm.stageInstance.$el.removeEventListener('pointerdown', pointerdown)
      vm.stageInstance.$el.removeEventListener('pointermove', pointermove)
      vm.stageInstance.$el.removeEventListener('pointerup', pointerup)
    })

    return { rect, stagePosition }
  },
  data() {
    return {
      stageRect: { x: 0, y: 0, w: 0, h: 0 },
      offset: { x: 0, y: 0 }
    }
  },
  computed: {
    rectStyle() {
      return {
        width: this.rect.w >= 0 ? this.rect.w : 0,
        height: this.rect.h >= 0 ? this.rect.h : 0,
        left: this.rect.x + 'px',
        top: this.rect.y + 'px'
      }
    }
  },
  methods: {
    updateOffset() {
      if (this.stageInstance.$el) {
        const style = window.getComputedStyle(this.stageInstance.$el)
        const reg = /(?<width>\d+\.?\d+)\w+/
        const borderLeftWidthMatch = reg.exec(style.borderLeftWidth)
        const borderTopWidthMatch = reg.exec(style.borderTopWidth)

        if (borderLeftWidthMatch && borderTopWidthMatch) {
          const x = Number(borderLeftWidthMatch.groups.width)
          const y = Number(borderTopWidthMatch.groups.width)

          this.offset = { x, y }
          return
        }

        this.offset = { x: 0, y: 0 }
        return
      }

      this.offset = { x: 0, y: 0 }
    },
    updateRect() {
      if (this.stageInstance.$el) {
        /**
         * @type {DOMRect}
         */
        const rect = this.stageInstance.$el.getBoundingClientRect()
        this.stageRect = {
          x: rect.left,
          y: rect.top,
          w: rect.width,
          h: rect.width
        }

        return
      }

      this.stageRect = { x: 0, y: 0, w: 0, h: 0 }
    }
  }
}
</script>

<style lang="scss">
.template-area {
  position: absolute;
}
</style>

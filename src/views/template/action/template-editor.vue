<template lang="pug">
main.template-editor
  section.template-canvas(ref="canvas")
    TemplateStage(
      :scale="scale.value"
      :position="position"
      :spaceDown="spaceDown"
      :scale-manual="scale.manual"
      @keydown.space.exact.native="spaceDownHandle"
      @keyup.space.exact.native="spaceUpHandle"
      ref="refComponent")
  app-scale(
    :scale.sync="scale.value"
    :max-scale="scale.max"
    :mini-scale="scale.mini"
    :step="scale.step"
    @change="scaleManual(true)")
</template>

<script>
import { inject, getCurrentInstance, onBeforeUnmount, onMounted, reactive } from 'vue'
import { storeSymbol } from '@/views/template/constant'
import TemplateStage from './template-stage.vue'

import { useToHtml } from '@/views/template/hooks/useToHtml'

export default {
  name: 'TemplateEditor',
  components: {
    TemplateStage
  },
  provide() {
    return {
      editorInstance: this
    }
  },
  data() {
    return {
      /** 空格是否按下 */
      spaceDown: false,
      /** 相对父级偏移量 */
      position: { x: 0, y: 0 },
      /**
       * 暂存偏移量
       * @type {{x: number, y: number}|null}
       */
      stashPosition: null
    }
  },
  setup() {
    const vm = getCurrentInstance().proxy
    /**
     * @type {Template.Store}
     */
    const store = inject(storeSymbol)
    const { refComponent } = useToHtml()
    /** 缩放比例 */
    const scale = reactive({ step: 5, value: 100, max: 200, mini: 20, manual: false })

    /**
     * @param {WheelEvent} e
     */
    const mousewheel = function (e) {
      vm.scaleManual(false)

      if (e.deltaY > 0) {
        if (scale.value > scale.mini) scale.value -= scale.step
      } else {
        if (scale.value < scale.max) scale.value += scale.step
      }

      /** @type {HTMLElement} */
      const stage = refComponent.value.$el
      const rect = stage.getBoundingClientRect()

      /** 鼠标距离元素 `left` 的比例 */
      const leftScale = (e.clientX - rect.left) / rect.width
      /** 鼠标距离元素 `top` 的比例 */
      const topScale = (e.clientY - rect.top) / rect.height
      /** 缩放后的元素宽度 */
      const newStageWidth = store.size.width * (scale.value / 100)
      /** 缩放后的元素高度 */
      const newStageHeight = store.size.height * (scale.value / 100)
      /** 缩放后的鼠标距离元素 left 值 */
      const newRectLeft = newStageWidth * leftScale
      /** 缩放后的鼠标距离元素 top 值 */
      const newRectTop = newStageHeight * topScale

      // 当前位置 = 当前位置 - (缩放后的 `left/top` - （鼠标距离元素 `left/top` 值))
      vm.position.x = vm.position.x - (newRectLeft - (e.clientX - rect.left))
      vm.position.y = vm.position.y - (newRectTop - (e.clientY - rect.top))
    }

    onMounted(function () {
      vm.$el.addEventListener('mousewheel', mousewheel)
    })

    onBeforeUnmount(function () {
      vm.$el.removeEventListener('mousewheel', mousewheel)
    })

    return { scale, store, refComponent }
  },
  mounted() {
    const context = this
    /** @type {HTMLElement} */
    const stage = this.refComponent.$el

    /**
     * @param {Event} e
     */
    const resize = function (e) {
      context.init()
    }

    /**
     * @param {PointerEvent} e
     */
    const pointerdown = function (e) {
      if (context.spaceDown && e.button === 0) {
        context.stashPosition = {
          x: e.clientX - stage.offsetLeft,
          y: e.clientY - stage.offsetTop
        }
      }
    }

    /**
     * @param {PointerEvent} e
     */
    const pointermove = function (e) {
      if (context.spaceDown && context.stashPosition) {
        context.position.x = e.clientX - context.stashPosition.x
        context.position.y = e.clientY - context.stashPosition.y
      }
    }

    /**
     * @param {PointerEvent} e
     */
    const pointerup = function (e) {
      context.stashPosition = null
    }

    window.addEventListener('resize', resize)
    window.addEventListener('pointerdown', pointerdown)
    window.addEventListener('pointermove', pointermove)
    window.addEventListener('pointerup', pointerup)

    this.$once('hook:beforeDestroy', function () {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointerdown', pointerdown)
      window.removeEventListener('pointermove', pointermove)
      window.removeEventListener('pointerup', pointerup)
    })

    window.dispatchEvent(new Event('resize'))
  },
  methods: {
    /**
     * 初始化 画布位置
     */
    init() {
      /** @type {HTMLElement} */
      const canvas = this.$refs.canvas

      const x = (canvas.offsetWidth - this.store.size.width) / 2
      const y = (canvas.offsetHeight - this.store.size.height) / 2

      this.position.x = x
      this.position.y = y
    },
    /**
     * @param {KeyboardEvent} e
     */
    spaceDownHandle(e) {
      /** @type {HTMLElement} */
      const target = e.target
      this.spaceDown = true
      target.style.cursor = 'grab'
    },
    /**
     * @param {KeyboardEvent} e
     */
    spaceUpHandle(e) {
      /** @type {HTMLElement} */
      const target = e.target
      target.style.cursor = 'default'
      this.spaceDown = false
    },
    /**
     * @param {boolean} manual 是否点击缩放
     */
    scaleManual(manual) {
      this.scale.manual = manual
    }
  }
}
</script>

<style lang="scss">
.template-editor {
  position: relative;
  flex: 1;
  overflow: hidden;
}

.template-canvas {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--color-background-light-gray);
}
</style>

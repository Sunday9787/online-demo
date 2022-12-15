<template lang="pug">
  main.template-editor
    section.template-canvas(ref="canvas")
      div.template-stage(
        tabindex="-1"
        ref="stage"
        :style="stageStyle"
        @keydown.space.exact="spaceDownHandle"
        @keyup.space.exact="spaceUpHandle")
    app-scale(
      :scale.sync="scale"
      :max-scale="200"
      :mini-scale="20"
      :step="5")
</template>

<script>
import { useSize } from '@/view/template/hooks/size'
import { useStore } from '@/hooks/useStore'

export default {
  name: 'TemplateEditor',
  setup() {
    const store = useStore('globalModule')
    const { A5: size } = useSize()

    store.commit('updateSize', size)
    return { size }
  },
  data() {
    return {
      /** 缩放比例 */
      scale: 100,
      /** 空格是否按下 */
      spaceDown: false,
      /** 相对父级偏移量 */
      position: { x: 0, y: 0 },
      /** 相对父级偏移量 */
      stagePosition: null
    }
  },
  computed: {
    stageStyle() {
      return {
        width: this.size.width + 'px',
        height: this.size.height + 'px',
        left: this.position.x + 'px',
        top: this.position.y + 'px',
        transformOrigin: 'center',
        transform: `scale3d(${this.scale / 100}, ${this.scale / 100}, 1)`
      }
    }
  },
  mounted() {
    const context = this
    /**
     * @param {PointerEvent} e
     */
    const pointerdown = function (e) {
      if (context.spaceDown) {
        /**
         * @type {HTMLDivElement}
         */
        const currentTarget = e.currentTarget
        context.stagePosition = {
          x: e.clientX - currentTarget.offsetLeft,
          y: e.clientY - currentTarget.offsetTop
        }
      }
    }

    /**
     * @param {PointerEvent} e
     */
    const pointermove = function (e) {
      if (context.stagePosition) {
        context.position.x = e.clientX - context.stagePosition.x
        context.position.y = e.clientY - context.stagePosition.y
      }
    }

    /**
     * @param {PointerEvent} e
     */
    const pointerup = function (e) {
      context.stagePosition = null
    }

    this.$refs.stage.addEventListener('pointerdown', pointerdown)
    window.addEventListener('pointermove', pointermove)
    window.addEventListener('pointerup', pointerup)

    this.$once('hook:beforeDestroy', function () {
      context.$refs.stage.removeEventListener('pointerdown', pointerdown)
      window.removeEventListener('pointermove', pointermove)
      window.removeEventListener('pointerup', pointerup)
    })

    this.init()
  },
  methods: {
    init() {
      // 初始化 画布位置
      this.position.x = (this.$refs.canvas.offsetWidth - this.size.width) / 2
      this.position.y = (this.$refs.canvas.offsetHeight - this.size.height) / 2
    },
    spaceDownHandle() {
      this.spaceDown = true
    },
    spaceUpHandle() {
      this.spaceDown = false
    }
  }
}
</script>

<style lang="scss">
.template-editor {
  overflow: hidden;
  position: relative;
  flex: 1;
}

.template-canvas {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
}

.template-stage {
  position: absolute;
  outline: none;
  background-color: #fff;
  background-repeat: repeat;
  background-image: url('@/view/template/action/image/sprite.svg');
}
</style>

<template lang="pug">
  main.template-editor
    section.template-canvas(ref="canvas")
      div.template-stage(
        tabindex="-1"
        ref="stage"
        :style="stageStyle"
        @keydown.space.exact="spaceDownHandle"
        @keyup.space.exact="spaceUpHandle")
        TemplateControl(v-for="(item, k) in store.components" :key="k")
          component(:is="item.component" v-bind="item.props")
    app-scale(
      :scale.sync="scale"
      :max-scale="200"
      :mini-scale="20"
      :step="5")
</template>

<script>
import { inject } from 'vue'
import { storeSymbol } from '@/view/template/constant'

export default {
  name: 'TemplateEditor',
  components: {
    TemplateInput: () => import('./builtin/template-input.vue'),
    TemplateControl: () => import('./builtin/template-control.vue')
  },
  setup() {
    const store = inject(storeSymbol)

    return { store }
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
        borderLeftWidth: this.store.padding.left + 'mm',
        borderTopWidth: this.store.padding.top + 'mm',
        borderRightWidth: this.store.padding.right + 'mm',
        borderBottomWidth: this.store.padding.bottom + 'mm',
        width: this.store.size.width + 'px',
        height: this.store.size.height + 'px',
        left: this.position.x + 'px',
        top: this.position.y + 'px',
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
      if (context.spaceDown && e.button === 0) {
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
      if (context.spaceDown && context.stagePosition) {
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

    /**
     * @param {Event} e
     */
    const resize = function (e) {
      context.init()
    }

    this.$refs.stage.addEventListener('pointerdown', pointerdown)
    window.addEventListener('pointermove', pointermove)
    window.addEventListener('pointerup', pointerup)
    window.addEventListener('resize', resize)

    this.$once('hook:beforeDestroy', function () {
      context.$refs.stage.removeEventListener('pointerdown', pointerdown)
      window.removeEventListener('pointermove', pointermove)
      window.removeEventListener('pointerup', pointerup)
      window.removeEventListener('resize', resize)
    })

    window.dispatchEvent(new Event('resize'))
  },
  methods: {
    init() {
      // 初始化 画布位置
      this.position.x = (this.$refs.canvas.offsetWidth - this.store.size.width) / 2
      this.position.y = (this.$refs.canvas.offsetHeight - this.store.size.height) / 2
    },
    spaceDownHandle() {
      this.spaceDown = true
    },
    spaceUpHandle() {
      this.spaceDown = false
    }
  },
  watch: {
    'store.size'() {
      this.init()
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
  background-color: var(--color-background-light-gray);
}

.template-stage {
  position: absolute;
  outline: none;
  transform-origin: center;
  background-repeat: repeat;
  background-image: url('@/view/template/action/image/sprite.svg');
  border: 0 solid #f2f2f2;
  box-shadow: 0 0 8px 1px darken($color: #f2f2f2, $amount: 20%);
}
</style>

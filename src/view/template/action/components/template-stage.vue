<template lang="pug">
  div.template-stage(
    tabindex="-1"
    :style="stageStyle"
    @pointerdown="unSelectComponent"
    @keydown.delete="deleteComponent"
    @keydown.space.exact="spaceDownHandle"
    @keyup.space.exact="spaceUpHandle")
    TemplateControl(v-for="(component, k) in store.components" :key="component.id" @select="selectComponent(component, k)")
      component(:is="component.name" v-bind="component.props")
</template>

<script>
import { inject } from 'vue'
import { storeSymbol } from '@/view/template/constant'

export default {
  name: 'TemplateStage',
  components: {
    TemplateInput: () => import('./builtin/template-input.vue'),
    TemplateControl: () => import('./builtin/template-control.vue')
  },
  props: {
    scale: {
      type: Number,
      required: true
    }
  },
  inject: ['editorInstance'],
  provide() {
    return {
      stageInstance: this
    }
  },
  setup() {
    const store = inject(storeSymbol)
    return { store }
  },
  data() {
    return {
      /** 空格是否按下 */
      spaceDown: false,
      /** 相对父级偏移量 */
      position: { x: 0, y: 0 },
      /** 暂存偏移量 */
      stashPosition: null
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
        context.stashPosition = {
          x: e.clientX - currentTarget.offsetLeft,
          y: e.clientY - currentTarget.offsetTop
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

    /**
     * @param {Event} e
     */
    const resize = function (e) {
      context.init()
    }

    this.$el.addEventListener('pointerdown', pointerdown)
    window.addEventListener('pointermove', pointermove)
    window.addEventListener('pointerup', pointerup)
    window.addEventListener('resize', resize)

    this.$once('hook:beforeDestroy', function () {
      context.$el.removeEventListener('pointerdown', pointerdown)
      window.removeEventListener('pointermove', pointermove)
      window.removeEventListener('pointerup', pointerup)
      window.removeEventListener('resize', resize)
    })

    window.dispatchEvent(new Event('resize'))
  },
  methods: {
    init() {
      // 初始化 画布位置
      this.position.x = (this.editorInstance.$refs.canvas.offsetWidth - this.store.size.width) / 2
      this.position.y = (this.editorInstance.$refs.canvas.offsetHeight - this.store.size.height) / 2
    },
    spaceDownHandle() {
      this.spaceDown = true
    },
    spaceUpHandle() {
      this.spaceDown = false
    },
    /**
     * @param {object} component
     * @param {number} index
     */
    selectComponent(component, index) {
      this.store.currentComponent = { component, index }
    },
    unSelectComponent() {
      this.store.currentComponent = null
    },
    /**
     * @param {KeyboardEvent} e
     */
    deleteComponent(e) {
      if (this.store.currentComponent) {
        const { index } = this.store.currentComponent
        this.store.components.splice(index, 1)
        this.store.currentComponent = null
      }
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

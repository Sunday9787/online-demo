<template lang="pug">
  div.template-stage(
    tabindex="-1"
    :style="stageStyle"
    @pointerdown="unSelectComponent"
    @keydown.delete="deleteComponent"
    @keydown.space.exact="spaceDownHandle"
    @keyup.space.exact="spaceUpHandle"
    @drop="dropHandle"
    @dragover.prevent="noop")
    TemplateArea(:scale="scale")
    TemplateAuxiliaryLine
    TemplateAuxiliaryLine(direction="vertical")
    TemplateControl(
      v-for="[key, component] of componentsData"
      v-model="component.visible"
      :key="component.id"
      :scale="scale"
      :position.sync="component.props.position"
      :size.sync="component.props.size"
      @sizeChange="componentSizeChange(component)"
      @positionChange="componentPositionChange(component)"
      @select="selectComponent(component)")
      component(
        :is="component.name"
        :label="component.props.label"
        :property="component.props.property"
        :position="component.props.position")
</template>

<script>
import { inject, ref, watch } from 'vue'
import { storeSymbol, templateChannel, componentRecordType } from '@/view/template/constant'
import eventBus from '@/util/eventBus'

export default {
  name: 'TemplateStage',
  components: {
    TemplateInput: () => import('./builtin/template-input.vue'),
    TemplateControl: () => import('./builtin/template-control.vue'),
    TemplateAuxiliaryLine: () => import('./builtin/template-auxiliary-line.vue'),
    TemplateArea: () => import('./builtin/template-area.vue')
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
    /**
     * @type {Template.Store}
     */
    const store = inject(storeSymbol)
    /**
     * @type {import('vue').Ref<Template.BuiltinComponent[]>}
     */
    const componentsData = ref([])

    /**
     * 因为 vue 并不会响应 Map 数据
     * 所以 hack 监听 相关联的数据变化 重新 渲染
     * @see https://github.com/vuejs/vue/issues/2410#issuecomment-318487855
     */
    watch(
      [() => store.record, () => store.restore],
      function (val, oldVal) {
        componentsData.value = Array.from(store.components)
      },
      { deep: true }
    )

    return { store, componentsData }
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
    /**
     * 初始化 画布位置
     */
    init() {
      const x = (this.editorInstance.$refs.canvas.offsetWidth - this.store.size.width) / 2
      const y = (this.editorInstance.$refs.canvas.offsetHeight - this.store.size.height) / 2

      this.position.x = x
      this.position.y = y
    },
    spaceDownHandle() {
      this.$el.style.cursor = 'grab'
      this.spaceDown = true
    },
    spaceUpHandle() {
      this.$el.style.cursor = 'default'
      this.spaceDown = false
    },
    /**
     * @param {DragEvent} e
     */
    dropHandle(e) {
      const response = e.dataTransfer.getData('application/json')
      /**
       * @type {Template.BuiltinComponent}
       */
      const data = JSON.parse(response)
      eventBus.$emit(templateChannel.stageComponentAdd, data)
    },
    /**
     * @param {object} component
     */
    selectComponent(component) {
      this.store.currentComponent = component
    },
    unSelectComponent() {
      this.store.currentComponent = null
    },
    /**
     * @param {Template.BuiltinComponent}
     * @param {number} index
     */
    componentSizeChange() {
      eventBus.$emit(
        templateChannel.componentPropertySizeChange,
        componentRecordType.componentPropertySizeChange,
        this.store.currentComponent
      )
    },
    /**
     * @param {Template.BuiltinComponent}
     * @param {number} index
     */
    componentPositionChange(component, index) {
      eventBus.$emit(
        templateChannel.componentPropertyPositionChange,
        componentRecordType.componentPropertyPositionChange,
        this.store.currentComponent
      )
    },
    /**
     * @param {KeyboardEvent} e
     */
    deleteComponent(e) {
      if (this.store.currentComponent) {
        const component = this.store.currentComponent

        this.store.currentComponent = null
        this.store.components.delete(component.key)
        eventBus.$emit(templateChannel.componentDel, componentRecordType.componentDel, component)
      }
    }
  },
  watch: {
    scale(val) {
      eventBus.$emit(templateChannel.stageScaleChange, val)
    },
    position: {
      handler(val) {
        eventBus.$emit(templateChannel.stagePositionChange, val)
      },
      deep: true
    },
    'store.size': {
      handler(val) {
        window.dispatchEvent(new Event('resize'))
        eventBus.$emit(templateChannel.stageSizeChange, val)
      },
      deep: true
    },
    'store.padding': {
      handler(val) {
        eventBus.$emit(templateChannel.stagePaddingChange, val)
      },
      deep: true
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

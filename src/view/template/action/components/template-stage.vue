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
    TemplateContextmenu(:scale="scale")
    TemplateArea(:scale="scale" @area="area")
    TemplateMarkLine(v-for="item of markLine"
      :key="item.type"
      :position="item.position"
      :direction="item.direction"
      :visible="item.visible")
    TemplateControl(v-for="component of store.componentsData"
      v-model="component.visible"
      :key="component.id"
      :scale="scale"
      :lock="component.props.lock"
      :zIndex="component.props.zIndex"
      :position.sync="component.props.position"
      :size.sync="component.props.size"
      @moveStart="moveStart(component)"
      @move="move(component)"
      @moveEnd="moveEnd(component)"
      @resizeStart="resizeStart(component)"
      @resize="resize(component)"
      @resizeEnd="resizeEnd(component)"
      @select="selectComponent(component)")
      component(
        top
        group
        :is="component.name"
        :children="component.children"
        v-bind="component.props"
        v-if="component.name === 'builtin-group'")
      component(:is="component.name" v-bind="component.props" v-else)
</template>

<script>
import { inject } from 'vue'
import { builtinComponent } from './builtin'
import { storeSymbol, templateChannel } from '@/view/template/constant'
import { useMarkLine } from '@/view/template/hooks/useMarkLine'
import { TemplateEvent, shapeLocation } from '@/view/template/utils'
import eventBus from '@/util/eventBus'

export default {
  name: 'TemplateStage',
  components: {
    BuiltinInput: () => import('./builtin/builtin-input.vue'),
    BuiltinGroup: () => import('./builtin/builtin-group.vue'),
    BuiltinSelect: () => import('./builtin/builtin-select.vue'),
    TemplateControl: () => import('./template-control.vue'),
    TemplateMarkLine: () => import('./template-mark-line.vue'),
    TemplateArea: () => import('./template-area.vue'),
    TemplateContextmenu: () => import('./template-contextmenu.vue')
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
    const { markLine } = useMarkLine()

    return { store, markLine }
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
       * @type {Template.BuiltinComponentItem}
       */
      const data = JSON.parse(response)
      const component = builtinComponent.get(data.id).create()
      const [x, y] = shapeLocation({ x: e.pageX, y: e.pageY, el: this.$el }, this.scale / 100)

      component.props.position.x = x - data.offset.x
      component.props.position.y = y - data.offset.y

      const event = new TemplateEvent(templateChannel.componentAdd, {
        detail: component,
        target: 'stage'
      })

      eventBus.$emit(templateChannel.componentAdd, event)
      eventBus.$emit(
        templateChannel.componentAddFinish,
        new TemplateEvent(templateChannel.componentAddFinish, { detail: data.id })
      )
    },
    /**
     * @param {Template.BuiltinComponent} component
     */
    selectComponent(component) {
      const event = new TemplateEvent(templateChannel.componentSelect, {
        detail: component,
        target: 'stage'
      })
      eventBus.$emit(templateChannel.componentSelect, event)
    },
    unSelectComponent() {
      if (this.store.currentComponent) {
        if (this.store.currentComponent.children && !this.store.currentComponent.builtin) {
          const event = new TemplateEvent(templateChannel.componentSelectUn, {
            detail: this.store.currentComponent,
            target: 'stage'
          })
          eventBus.$emit(templateChannel.groupUn, event)
          return
        }

        const event = new TemplateEvent(templateChannel.componentSelectUn, { detail: null, target: 'stage' })
        eventBus.$emit(templateChannel.componentSelectUn, event)
      }
    },
    /**
     * @param {KeyboardEvent} e
     */
    deleteComponent(e) {
      if (this.store.currentComponent) {
        const component = this.store.currentComponent
        const event = new TemplateEvent(templateChannel.componentDel, { detail: component, target: 'stage' })
        eventBus.$emit(templateChannel.componentDel, event)
      }
    },
    /**
     * @param {Template.BuiltinComponent} component
     */
    moveStart(component) {
      const event = new TemplateEvent(templateChannel.componentMoveStart, { detail: component, target: 'stage' })
      eventBus.$emit(templateChannel.componentMoveStart, event)
    },
    /**
     * @param {Template.BuiltinComponent} component
     */
    move(component) {
      const event = new TemplateEvent(templateChannel.componentMove, { detail: component, target: 'stage' })
      eventBus.$emit(templateChannel.componentMove, event)
    },
    /**
     * @param {Template.BuiltinComponent} component
     */
    moveEnd(component) {
      const event = new TemplateEvent(templateChannel.componentMoveEnd, { detail: component, target: 'stage' })
      eventBus.$emit(templateChannel.componentMoveEnd, event)
    },
    /**
     * @param {Template.BuiltinComponent} component
     */
    resizeStart(component) {
      const event = new TemplateEvent(templateChannel.componentResizeStart, { detail: component, target: 'stage' })
      eventBus.$emit(templateChannel.componentResizeStart, event)
    },
    /**
     * @param {Template.BuiltinComponent} component
     */
    resize(component) {
      const event = new TemplateEvent(templateChannel.componentResize, { detail: component, target: 'stage' })
      eventBus.$emit(templateChannel.componentResize, event)
    },
    /**
     * @param {Template.BuiltinComponent} component
     */
    resizeEnd(component) {
      const event = new TemplateEvent(templateChannel.componentResizeEnd, { detail: component, target: 'stage' })
      eventBus.$emit(templateChannel.componentResizeEnd, event)
    },
    /**
     * @param {Template.BuiltinComponent[]} data
     */
    area(data) {
      // 如果选中个数 大于 1 的时候 创建组 否则 选择组件
      if (data.length > 1) {
        const event = new TemplateEvent(templateChannel.groupPack, { detail: data, target: 'stage' })
        eventBus.$emit(templateChannel.groupPack, event)
        return
      }

      this.selectComponent(data[0])
    }
  },
  watch: {
    scale(val) {
      const event = new TemplateEvent(templateChannel.stageScaleChange, { detail: null, target: 'stage' })
      eventBus.$emit(templateChannel.stageScaleChange, event)
    },
    position: {
      handler(val) {
        const event = new TemplateEvent(templateChannel.stageMove, { detail: null, target: 'stage' })
        eventBus.$emit(templateChannel.stageMove, event)
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

<template lang="pug">
.template-stage(
  tabindex="-1"
  :style="stageStyle"
  @pointerdown="unSelectComponent"
  @keydown.delete="deleteComponent"
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
      ref="builtinGroupComponentRef"
      :is="component.name"
      :children="component.children"
      v-bind="component.props"
      v-if="component.name === 'builtin-group'")
    component(
      ref="builtinComponentRef"
      :is="component.name"
      v-bind="component.props"
      v-else)
</template>

<script>
import { inject } from 'vue'
import { builtinComponent } from '@/views/template/components/builtin'
import { storeSymbol, templateChannel } from '@/views/template/constant'
import { useMarkLine } from '@/views/template/hooks/useMarkLine'
import { TemplateEvent, shapeLocation } from '@/views/template/utils'
import eventBus from '@/utils/eventBus'

export default {
  name: 'TemplateStage',
  components: {
    BuiltinInput: () => import('../components/builtin/builtin-input.vue'),
    BuiltinGroup: () => import('../components/builtin/builtin-group.vue'),
    BuiltinSelect: () => import('../components/builtin/builtin-select.vue'),
    TemplateControl: () => import('../components/template-control.vue'),
    TemplateMarkLine: () => import('../components/template-mark-line.vue'),
    TemplateArea: () => import('../components/template-area.vue'),
    TemplateContextmenu: () => import('../components/template-contextmenu.vue')
  },
  props: {
    scale: {
      type: Number,
      required: true
    },
    position: {
      type: Object,
      required: true
    },
    spaceDown: {
      type: Boolean,
      required: true
    },
    scaleManual: {
      type: Boolean,
      required: false
    }
  },
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
        transformOrigin: this.scaleManual ? 'center' : 'left top',
        transform: `scale3d(${this.scale / 100}, ${this.scale / 100}, 1)`
      }
    }
  },
  methods: {
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
      component.shapeId = data.id

      const event = new TemplateEvent(templateChannel.componentAdd, {
        detail: component,
        target: 'stage'
      })

      eventBus.$emit(templateChannel.componentAdd, event)
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
    },
    toHtml() {
      /**
       * @type {Vue[]}
       */
      const builtinGroupComponentRef = Array.isArray(this.$refs.builtinGroupComponentRef)
        ? this.$refs.builtinGroupComponentRef
        : [this.$refs.builtinGroupComponentRef]

      /**
       * @type {Vue[]}
       */
      const builtinComponentRef = Array.isArray(this.$refs.builtinComponentRef)
        ? this.$refs.builtinComponentRef
        : [this.$refs.builtinComponentRef]

      /**
       * @type {HTMLElement}
       */
      const root = this.$el.cloneNode()
      const fragment = document.createDocumentFragment()
      const style = window.getComputedStyle(this.$el)

      root.style.left = ''
      root.style.top = ''
      root.style.transform = ''
      root.style.position = 'relative'
      root.style.border = style.border
      root.style.boxShadow = style.boxShadow
      root.style.backgroundImage = style.backgroundImage
      root.style.backgroundRepeat = style.backgroundRepeat

      builtinGroupComponentRef
        .concat(builtinComponentRef)
        .filter(Boolean)
        .forEach(function (item) {
          fragment.append(item.toHtml())
        })

      root.appendChild(fragment)

      return root
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
  background-image: url('@/views/template/action/image/sprite.svg');
  background-repeat: repeat;
  border: 0 solid #f2f2f2;
  outline: none;
  box-shadow: 0 0 8px 1px darken($color: #f2f2f2, $amount: 20%);
  transform-origin: center;
}
</style>

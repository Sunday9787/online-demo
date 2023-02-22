<template lang="pug">
  nav.template-contextmenu(:class="{ visible }" :style="wrapperStyle" @pointerdown.stop="noop")
    template(v-if="currentComponent")
      a.template-contextmenu-item(href="javascript:;" @pointerdown="command('del')") 删除
      a.template-contextmenu-item(href="javascript:;" @pointerdown="command('unlock')" v-if="current.lock") 取消锁定
      a.template-contextmenu-item(href="javascript:;" @pointerdown="command('lock')" v-else) 锁定
      a.template-contextmenu-item(href="javascript:;" @pointerdown="command('toTop')") 置于顶层
      a.template-contextmenu-item(href="javascript:;" @pointerdown="command('toBottom')") 置于底层
    a.template-contextmenu-item(href="javascript:;" @pointerdown="command('toPaste')" v-else) 粘贴
</template>

<script>
import { inject, onBeforeUnmount, onMounted, reactive, ref, computed } from 'vue'
import { storeSymbol, templateChannel } from '@/view/template/constant'
import { TemplateEvent, shapeLocation } from '@/view/template/utils'
import eventBus from '@/util/eventBus'

/**
 * @type {Record<string, (this: Template.BuiltinComponent) => void>}
 */
const commandHandle = {
  del() {
    const event = new TemplateEvent(templateChannel.componentDel, {
      detail: this,
      target: 'stage'
    })

    eventBus.$emit(templateChannel.componentDel, event)
  },
  lock() {
    this.props.lock = true
  },
  unlock() {
    this.props.lock = false
  },
  toTop() {},
  toBottom() {},
  toPaste() {}
}

export default {
  name: 'TemplateContextmenu',
  props: {
    scale: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    /**
     * @type {Vue}
     */
    const stageInstance = inject('stageInstance')
    /**
     * @type {Template.Store}
     */
    const store = inject(storeSymbol)
    const visible = ref(false)
    const position = reactive({ x: 0, y: 0 })

    /**
     * @type {import('vue').Ref<Template.BuiltinComponent>}
     */
    const currentComponent = computed(() => store.currentComponent)

    const current = computed(() => {
      if (currentComponent.value) {
        return currentComponent.value.props
      }

      return null
    })

    /**
     * @param {PointerEvent} e
     */
    const contextmenu = function (e) {
      e.preventDefault()

      const scale = props.scale / 100
      const [x, y] = shapeLocation({ x: e.pageX, y: e.pageY, el: stageInstance.$el }, scale)

      position.x = x
      position.y = y
      visible.value = true
    }

    /**
     * @param {PointerEvent} e
     */
    const pointerdown = function (e) {
      visible.value = false
    }

    onMounted(function () {
      stageInstance.$el.addEventListener('contextmenu', contextmenu)
      window.addEventListener('pointerdown', pointerdown)
    })

    onBeforeUnmount(function () {
      stageInstance.$el.removeEventListener('contextmenu', contextmenu)
      window.removeEventListener('pointerdown', pointerdown)
    })

    return { visible, position, currentComponent, current }
  },
  computed: {
    wrapperStyle() {
      return {
        left: this.position.x + 'px',
        top: this.position.y + 'px'
      }
    }
  },
  methods: {
    /**
     * @param {'del'|'lock'|'toTop'|'toBottom'|'toPaste'} type
     */
    command(type) {
      commandHandle[type].apply(this.currentComponent)
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
.template-contextmenu {
  position: absolute;
  visibility: hidden;
  z-index: 999;
  width: 98px;
  margin: 0;
  padding: 0;
  left: 0;
  top: 0;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

  &.visible {
    visibility: visible;
  }
}

.template-contextmenu-item {
  display: block;
  padding: 0 20px;
  line-height: 34px;
  @include ellipsis;

  &:hover {
    background-color: var(--color-primary-light-9);
  }
}
</style>

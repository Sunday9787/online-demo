<template lang="pug">
  main.template-editor
    section.template-canvas(ref="canvas")
      TemplateStage(:scale="scale.value")
    app-scale(
      :scale.sync="scale.value"
      :max-scale="scale.max"
      :mini-scale="scale.mini"
      :step="scale.step")
</template>

<script>
import { getCurrentInstance, onBeforeUnmount, onMounted, reactive } from 'vue'
import TemplateStage from './template-stage.vue'

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
  setup() {
    const vm = getCurrentInstance().proxy
    /** 缩放比例 */
    const scale = reactive({ step: 5, value: 100, max: 200, mini: 20 })

    /**
     * @param {WheelEvent} e
     */
    const mousewheel = function (e) {
      if (e.deltaY > 0) {
        if (scale.value > scale.mini) {
          scale.value -= scale.step
        }
        return
      }

      if (scale.value < scale.max) {
        scale.value += scale.step
      }
    }

    onMounted(function () {
      vm.$el.addEventListener('mousewheel', mousewheel)
    })

    onBeforeUnmount(function () {
      vm.$el.removeEventListener('mousewheel', mousewheel)
    })

    return { scale }
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
</style>

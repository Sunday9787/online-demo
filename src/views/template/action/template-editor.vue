<template lang="pug">
  main.template-editor
    section.template-canvas(ref="canvas")
      TemplateStage(:scale="scale.value" ref="refComponent")
    app-scale(
      :scale.sync="scale.value"
      :max-scale="scale.max"
      :mini-scale="scale.mini"
      :step="scale.step")
</template>

<script>
import { getCurrentInstance, onBeforeUnmount, onMounted, reactive } from 'vue'
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
  setup() {
    const vm = getCurrentInstance().proxy
    const { refComponent } = useToHtml()
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

    return { scale, refComponent }
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

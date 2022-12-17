<template lang="pug">
  main.template-editor
    section.template-canvas(ref="canvas")
      TemplateStage(:scale="scale")
    app-scale(
      :scale.sync="scale"
      :max-scale="200"
      :mini-scale="20"
      :step="5")
</template>

<script>
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
  data() {
    return {
      /** 缩放比例 */
      scale: 100
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
</style>

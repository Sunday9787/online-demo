<template lang="pug">
section.graphic-container
  GraphicToolbar
  GraphicEditor
</template>

<script>
import { defineComponent } from 'vue'
import GraphicEditor from './graphic-editor.vue'
import GraphicToolbar from './graphic-toolbar.vue'

export default defineComponent({
  name: 'AppGraphic',
  components: {
    GraphicEditor,
    GraphicToolbar
  }
})
</script>

<style lang="scss">
.graphic-container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.builtin-node {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 8px 1px #bfbfbf;
}
</style>

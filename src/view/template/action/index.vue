<template lang="pug">
  el-container.template-container
    TemplateAside
    TemplateEditor
    TemplateToolbar
</template>

<script>
import TemplateAside from './components/template-aside.vue'
import TemplateToolbar from './components/template-toolbar.vue'
import TemplateEditor from './components/template-editor.vue'

export default {
  name: 'TemplateAction',
  components: {
    TemplateAside,
    TemplateToolbar,
    TemplateEditor
  }
}
</script>

<style lang="scss">
.template-container {
  height: inherit;
  overflow: hidden;
  background-color: var(--color-background);
}
</style>

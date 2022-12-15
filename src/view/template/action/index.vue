<template lang="pug">
  main.template-container
    TemplateToolbar
    el-container.template-main
      TemplateAside
      TemplateEditor
      TemplateProperty
</template>

<script>
import { provide } from 'vue'
import { useStore } from '@/view/template/hooks/useStore'
import { storeSymbol } from '@/view/template/constant'

import TemplateAside from './components/template-aside.vue'
import TemplateToolbar from './components/template-toolbar.vue'
import TemplateEditor from './components/template-editor.vue'
import TemplateProperty from './components/template-property.vue'

export default {
  name: 'TemplateAction',
  components: {
    TemplateAside,
    TemplateToolbar,
    TemplateEditor,
    TemplateProperty
  },
  setup() {
    const store = useStore()

    provide(storeSymbol, store)
    return { store }
  }
}
</script>

<style lang="scss">
.template-container {
  display: flex;
  height: inherit;
  flex-direction: column;
  background-color: var(--color-background);
}

.template-main {
  position: relative;
  overflow: hidden;
}
</style>

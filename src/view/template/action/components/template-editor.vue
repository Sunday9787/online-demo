<template lang="pug">
  main.template-editor
    TemplateSprite(:size="size")
</template>

<script>
import { ref } from 'vue'
import { size as defaultSize } from './constant'
import TemplateSprite from './template-sprite.vue'

export default {
  name: 'TemplateEditor',
  components: {
    TemplateSprite
  },
  setup() {
    const size = ref({ width: 0, height: 0 })

    defaultSize().then(response => {
      size.value = response.A4
    })

    return { size }
  }
}
</script>

<style lang="scss">
.template-editor {
  flex: 1;
  height: 100%;
  overflow-y: auto;
}
</style>

<template lang="pug">
div.app-graphic-toolbar
  el-tabs(v-model="activeTab" type="border-card")
    el-tab-pane(:name="group.name" :label="group.label" v-for="group of components" :key="group.name")
      div.app-graphic-toolbar-menu
        el-button(type="primary" size="small" v-for="menu of group.children" :key="menu.shape") {{ menu.label }}
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useBuiltinComponents } from './hooks/builtin-components'

export default defineComponent({
  name: 'GraphicToolbar',
  setup() {
    const activeTab = ref('param')
    const components = useBuiltinComponents()

    return {
      components,
      activeTab
    }
  }
})
</script>

<style>
.app-graphic-toolbar {
  position: relative;
}
</style>

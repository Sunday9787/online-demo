<template lang="pug">
  header.template-toolbar
    el-button(primary) 清空画布
    el-button(primary) 导入模板
    el-button(primary) 模板属性
</template>

<script>
export default {
  name: 'TemplateToolbar',
  setup() {}
}
</script>

<style lang="scss">
.template-toolbar {
  position: relative;
}
</style>

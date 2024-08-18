<template lang="pug">
app-page
  app-card
    router-link(to="/canvas/sem")
      el-button(type="primary") SEM
</template>

<script>
export default {
  name: 'CanvasIndex'
}
</script>

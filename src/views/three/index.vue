<template lang="pug">
app-page
  app-card
    el-row(type="flex" style="column-gap: 10px")
      router-link(to="/three/game")
        el-button(type="primary") 填字游戏
      router-link(to="/three/map")
        el-button(type="primary") 3d地图
</template>

<script>
export default {
  name: 'ThreeIndex'
}
</script>

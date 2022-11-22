<template>
  <el-container>
    <LayoutSide />

    <el-container direction="vertical" style="background-color: #f1f1f1">
      <LayoutHeader />

      <el-main class="layout-main">
        <router-view :key="currentMechanism.mechanismId" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import LayoutHeader from './layout-header.vue'
import LayoutSide from './layout-side.vue'

export default {
  name: 'AppLayout',
  components: {
    LayoutHeader,
    LayoutSide
  },
  setup() {
    // return {
    //   organization: appModule.state
    // }
  },
  computed: {
    ...mapGetters('appModule', ['currentMechanism'])
  }
}
</script>

<style lang="scss">
.layout-main {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>

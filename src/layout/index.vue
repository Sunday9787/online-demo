<template>
  <el-container style="height: inherit">
    <LayoutSide />

    <el-container direction="vertical" class="layout-main">
      <LayoutHeader />

      <main class="layout-content" :style="mainStyle">
        <router-view :key="currentMechanism.mechanismId" />
      </main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import LayoutHeader from './layout-header.vue'
import LayoutSide from './layout-side.vue'

export default {
  name: 'AppLayout',
  props: {
    offset: {
      type: Boolean,
      default: true
    }
  },
  components: {
    LayoutHeader,
    LayoutSide
  },
  computed: {
    ...mapGetters('appModule', ['currentMechanism']),
    mainStyle() {
      if (this.offset) {
        return { padding: '20px' }
      }

      return null
    }
  }
}
</script>

<style lang="scss">
.layout-main {
  @include themed;
  @include themeify {
    background-color: theme('color-background-deep');
  }
}

.layout-content {
  flex: 1;
  overflow-y: auto;
}
</style>

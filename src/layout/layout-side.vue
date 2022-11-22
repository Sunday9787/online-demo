<template>
  <el-aside width="200px">
    <el-menu router :default-active="activeMenu" :style="{ minHeight: '100%' }">
      <el-menu-item v-for="route in routes" :key="route.name" :index="route.path + '/index'">
        <i class="el-icon-document"></i>
        <span slot="title">{{ route.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router/composables'

export default {
  name: 'LayoutSide',
  setup() {
    const router = useRouter()
    const route = useRoute()

    const routes = router.options.routes.filter(item => item.meta && item.meta.title)
    const activeMenu = computed(() => route.meta.activeMenu)

    return { routes, activeMenu }
  }
}
</script>

<template>
  <el-header class="layout-header">
    <el-container>
      <el-container>
        <el-dropdown trigger="click" @command="updateCurrentMechanism">
          <el-button type="primary">
            {{ currentMechanism.mechanismName }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, k) in organization.mechanismList" :key="k" :command="item">{{
              item.mechanismName
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-container>

      <el-container>
        <div v-for="(item, k) in page" :key="k">
          <app-permission :power="item.power">
            <el-button type="primary">{{ item.label }}</el-button>
          </app-permission>
        </div>
      </el-container>
    </el-container>
  </el-header>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('appModule')

export default {
  name: 'layout-header',
  setup() {
    const page = [
      { label: '核型分析', power: 'analysis' },
      { label: '样本机构', power: 'sample' },
      { label: '专家会诊', power: 'invite' },
      { label: '病例转交', power: 'transfer' }
    ]

    return { page }
  },
  computed: {
    ...mapState(['organization']),
    ...mapGetters(['mechanismMap', 'currentMechanism'])
  },
  methods: {
    ...mapMutations(['updateCurrentMechanism'])
  }
}
</script>

<style lang="scss">
.layout-header {
  background-color: #fff;
}
</style>

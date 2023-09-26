<template lang="pug">
  el-header.layout-header
    el-container
      el-container
        el-dropdown(trigger="click" @command="updateCurrentMechanism")
          el-button(type="primary")
            | {{ currentMechanism.mechanismName }}
            i.el-icon-arrow-down.el-icon--right

          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(v-for="(item, k) in organization.mechanismList" :key="k" :command="item") {{ item.mechanismName }}

      el-container
        app-permission(:power="item.power" v-for="(item, k) in page" :key="k")
          el-button(type="primary") {{ item.label }}

      el-row(align="middle" type="flex" style='column-gap: 10px')
        el-switch(
          v-model="themeMode"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="dark"
          inactive-value="light")

        a(href="javascript:;" @click="openCalculator")
          app-svg-icon(name="Icon_calculator" size="30" color="var(--color-primary)")

    app-calculator(:visible.sync="calculatorVisible")
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('appModule')

export default {
  name: 'layout-header',
  data() {
    return {
      calculatorVisible: false
    }
  },
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
    themeMode: {
      get() {
        return this.theme.model
      },
      set(model) {
        this.updateTheme({ model, manual: true })
      }
    },
    ...mapState(['organization', 'theme']),
    ...mapGetters(['mechanismMap', 'currentMechanism'])
  },
  methods: {
    ...mapMutations(['updateCurrentMechanism', 'updateTheme']),
    openCalculator() {
      this.calculatorVisible = true
    }
  }
}
</script>

<style lang="scss">
.layout-header {
  display: flex;
  align-items: center;
  background-color: var(--color-background);
  @extend %themed;
}
</style>

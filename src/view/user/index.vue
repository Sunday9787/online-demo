<template>
  <app-page direction="horizontal">
    <app-page-aside title="机构管理" v-model="tabActive" :menu="menu" />

    <app-gap direction="vertical" :gap="12" />

    <component :is="tabActive" />
  </app-page>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'UserIndex',
  components: {
    info: () => import('./components/info.vue'),
    member: () => import('./components/member.vue'),
    wallet: () => import('./components/wallet.vue'),
    reportTemplate: () => import('./components/reportTemplate.vue'),
    globalSetting: () => import('./components/globalSetting.vue'),
    operationLog: () => import('./components/operationLog.vue'),
    transactionLog: () => import('./components/transactionLog.vue'),
    autoUpload: () => import('./components/autoUpload.vue'),
    drag: () => import('./components/drag.vue')
  },
  setup() {
    const menu = [
      { label: '机构信息', name: 'info' },
      { label: '成员管理', name: 'member' },
      { label: '机构信息', name: 'wallet' },
      { label: '报告模板', name: 'reportTemplate' },
      { label: '全局设置', name: 'globalSetting' },
      { label: '操作日志', name: 'operationLog' },
      { label: '交易日志', name: 'transactionLog' },
      { label: '自动上传', name: 'autoUpload' },
      { label: 'drag', name: 'drag' }
    ]

    const tabActive = ref('info')

    return {
      menu,
      tabActive
    }
  }
}
</script>

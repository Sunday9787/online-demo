<template lang="pug">
app-table-container
  el-table(stripe height="100%" v-loading="page.table.loading" :data="page.table.data" ref="table")
    el-table-column(width="180" label="日期" prop="date")
    el-table-column(width="180" label="姓名" prop="name")
    el-table-column(label="地址" prop="address")
</template>

<script>
import { reactive } from 'vue'

export function useStatistics() {
  const form = reactive({
    mechanismId: '',
    /** 样本编号 */
    patientNo: '',
    /** 删除状态 -1 0 1 */
    delFlag: -1,
    /** 提交时间 */
    submitDateEnd: '',
    submitDateStart: ''
  })

  const delFlagOptions = Object.freeze([
    { label: '全部', value: -1 },
    { label: '是', value: 1 },
    { label: '否', value: 0 }
  ])

  return { form, delFlagOptions }
}

export default {
  name: 'dashboard-statistics',
  inject: ['page'],
  setup() {}
}
</script>

<template>
  <app-table-container>
    <el-table ref="table" :data="page.table.data" v-loading="page.table.loading" height="100%" stripe>
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table>
  </app-table-container>
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

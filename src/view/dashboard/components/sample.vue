<template>
  <app-table-container>
    <template slot="action">
      <el-button size="small" type="primary">导出病例</el-button>
      <el-button size="small" type="primary">导出EXCEL</el-button>
      <el-button size="small" type="primary">专家会诊</el-button>
      <el-button size="small" type="primary">病例分配</el-button>
      <el-button size="small" type="primary">删除病例</el-button>
    </template>

    <el-table ref="table" :data="page.table.data" v-loading="page.table.loading" height="100%" stripe>
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table>
  </app-table-container>
</template>

<script>
import { reactive } from 'vue'

export function useSample() {
  const form = reactive({
    mechanismId: '',
    /** 样本编号 */
    patientNo: '',
    /** 上传时间 */
    startTime: '',
    endTime: '',
    /** 会诊状态 0 | 1 */
    hasExpertPatient: 0,
    /** 是否转交 0 | 1 */
    hasTransferPatient: 0,
    /** 转交状态 */
    transferStatus: -1
  })

  const expertPatientOptions = Object.freeze([
    { label: '全部', value: -1 },
    { label: '是', value: 1 },
    { label: '否', value: 0 }
  ])

  const transferPatientOptions = Object.freeze([
    { label: '全部', value: -1 },
    { label: '是', value: 1 },
    { label: '否', value: 0 }
  ])

  return {
    form,
    expertPatientOptions,
    transferPatientOptions
  }
}

export default {
  name: 'dashboard-sample',
  inject: ['page'],
  setup() {}
}
</script>

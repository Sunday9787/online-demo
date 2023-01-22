<template lang="pug">
  app-table-container
    template(slot='action')
      el-button(size="small" type="primary" @click="exportCases('导出病例')") 导出病例
      el-button(size="small" type="primary" @click="exportExcel('导出EXCEL')") 导出EXCEL
      el-button(size="small" type="primary" @click="expertConsultation('专家会诊')") 专家会诊
      el-button(size="small" type="primary" @click="distributionCases('病例分配')") 病例分配
      el-button(size="small" type="primary" @click="deleteCases('删除病例')") 删除病例

    el-table(
      ref="table"
      :data="page.table.data"
      v-loading="page.table.loading"
      height="100%"
      stripe
      @selection-change="selectionChange")
      el-table-column(type="selection")
      el-table-column(prop="date" label="日期" width="180")
      el-table-column(prop="name" label="姓名" width="180")
      el-table-column(prop="address", label="地址")
</template>

<script>
import { reactive } from 'vue'
import createLine from '@/util/line'

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

const line = createLine(function (config) {
  config.hook(function () {
    if (this.selection.length) {
      return true
    }

    this.$message.error('请至少选择一个')
  })
})

export default {
  name: 'dashboard-sample',
  inject: ['page'],
  data() {
    return {
      selection: []
    }
  },
  methods: {
    /**
     * 导出病例
     */
    exportCases: line(function (e) {
      console.log(e)
    }),
    /**
     * 导出EXCEL
     */
    exportExcel: line(function (e) {
      console.log(e)
    }),
    /**
     * 专家会诊
     */
    expertConsultation: line(function (e) {
      console.log(e)
    }),
    /**
     * 病例分配
     */
    distributionCases: line(function (e) {
      console.log(e)
    }),
    /**
     * 删除病例
     */
    deleteCases: line(function (e) {
      console.log(e)
    }),
    selectionChange(val) {
      this.selection = val
    }
  }
}
</script>

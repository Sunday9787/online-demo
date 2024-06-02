<template lang="pug">
app-table-container
  template(slot="action")
    el-button(type="primary" size="small") 导出LIS
    el-button(type="primary" size="small") 导出EXCEL
    el-button(@click="exposePDF()" type="primary" size="small") 导出PDF
  el-table(stripe height="100%" v-loading="page.table.loading" :data="page.table.data" ref="table")
    template(v-for="head in tableHead")
      el-table-column(v-if="head.on || !head.prop" v-bind="head" :key="head.prop")
        app-table-widget(
          v-if="!head.prop"
          :text="head.label"
          :data="tableHead"
          storage-key="dashboard-report"
          slot="header")
</template>

<script>
import { reactive } from 'vue'

export function useReport() {
  const form = reactive({
    mechanismId: '',
    /** 样本编号 */
    patientNo: '',
    /** 审核进度 0 | 1 */
    tabType: 0,
    /** 导出 Lis 0 | 1 */
    hasExportLis: 0,
    /** 完成时间 */
    finishDateEndTime: '',
    finishDateStartTime: ''
  })

  const tabTypeOptions = Object.freeze([
    { label: '全部', value: -1 },
    { label: '未提交', value: 1 },
    { label: '待审核', value: 0 }
  ])

  const exportLisOptions = Object.freeze([
    { label: '全部', value: -1 },
    { label: '是', value: 1 },
    { label: '否', value: 0 }
  ])

  return { form, tabTypeOptions, exportLisOptions }
}

export default {
  name: 'dashboard-report',
  inject: ['page'],
  data() {
    return {
      tableHead: [
        {
          on: true,
          fixed: true,
          label: '日期',
          prop: 'date',
          width: '180'
        },
        {
          on: true,
          required: true,
          label: '姓名',
          prop: 'name',
          width: '380'
        },
        {
          on: true,
          required: true,
          label: '姓名名',
          prop: 'named',
          width: '380'
        },
        {
          on: true,
          label: '地址',
          prop: 'address',
          width: '380'
        },
        {
          label: '设置',
          fixed: 'right',
          width: '150'
        }
      ]
    }
  },
  created() {
    this.$nextTick(function () {
      console.log(this.page)
    })
  },
  methods: {
    exposePDF() {
      console.log(this)
    }
  }
}
</script>

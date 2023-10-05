<template>
  <app-table-container>
    <template slot="action">
      <el-button size="small" type="primary">导出LIS</el-button>
      <el-button size="small" type="primary">导出EXCEL</el-button>
      <el-button size="small" type="primary" @click="exposePDF()">导出PDF</el-button>
    </template>

    <el-table ref="table" :data="page.table.data" v-loading="page.table.loading" height="100%" stripe>
      <template v-for="head in tableHead">
        <el-table-column :key="head.prop" v-bind="head" v-if="head.on || !head.prop">
          <app-table-widget
            slot="header"
            storage-key="dashboard-report"
            :data="tableHead"
            :text="head.label"
            v-if="!head.prop"
          />
        </el-table-column>
      </template>
    </el-table>
  </app-table-container>
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
  methods: {
    exposePDF() {
      console.log(this)
    }
  }
}
</script>

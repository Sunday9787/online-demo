<template lang="pug">
app-page
  app-card
    app-form-tab(@change="tabChange" v-model="activeName")
      app-form-tab-pane(title="样本管理" name="sample" v-slot="{ visible }")
        app-form-collapse(:visible="visible")
          el-form(label-width="80px" size="small" :model="sampleForm" inline ref="sample")
            el-form-item(prop="patientNo" label="样本编号")
              el-input(@input="search()" v-model="sampleForm.patientNo")
            el-form-item(prop="startTime" label="上传时间")
              el-date-picker(@change="search()" end-placeholder="结束日期" start-placeholder="开始日期" v-model="uploadTime" type="daterange")
            el-form-item(prop="hasExpertPatient" label="会诊状态")
              el-select(@change="search()" default-first-option v-model="sampleForm.hasExpertPatient")
                el-option(
                  v-for="item in expertPatientOptions"
                  :value="item.value"
                  :label="item.label"
                  :key="item.value")
            el-form-item(prop="transferStatus" label="转交状态")
              el-select(default-first-option v-model="sampleForm.transferStatus")
                el-option(
                  v-for="item in transferPatientOptions"
                  :value="item.value"
                  :label="item.label"
                  :key="item.value")
          el-button(@click="resetForm('sample')" size="small" slot="action") 重置
      app-form-tab-pane(title="样本统计" name="statistics" v-slot="{ visible }")
        app-form-collapse(:visible="visible")
          el-form(label-width="80px" size="small" :model="statisticsForm" inline ref="statistics")
            el-form-item(prop="patientNo" label="样本编号")
              el-input(@input="search()" v-model="statisticsForm.patientNo")
            el-form-item(prop="delFlag" label="删除状态")
              el-select(@change="search()" default-first-option v-model="statisticsForm.delFlag")
                el-option(
                  v-for="item in delFlagOptions"
                  :value="item.value"
                  :label="item.label"
                  :key="item.value")
            el-form-item(prop="submitDateStart" label="提交时间")
              el-date-picker(
                @change="search()"
                end-placeholder="结束日期"
                start-placeholder="开始日期"
                v-model="submitTime"
                type="daterange")
          el-button(@click="resetForm('statistics')" size="small" slot="action") 重置
      app-form-tab-pane(title="报告报告统计" name="report" v-slot="{ visible }")
        app-form-collapse(:visible="visible")
          el-form(label-width="80px" size="small" :model="reportForm" inline ref="report")
            el-form-item(prop="patientNo" label="样本编号")
              el-input(@input="search()" v-model="reportForm.patientNo")
            el-form-item(prop="hasExportLis" label="导出Lsi")
              el-select(@change="search()" default-first-option v-model="reportForm.hasExportLis")
                el-option(
                  v-for="item in exportLisOptions"
                  :value="item.value"
                  :label="item.label"
                  :key="item.value")
            el-form-item(prop="tabType" label="审核进度")
              el-select(@change="search()" default-first-option v-model="reportForm.tabType")
                el-option(
                  v-for="item in tabTypeOptions"
                  :value="item.value"
                  :label="item.label"
                  :key="item.value")
            el-form-item(prop="finishDateEndTime" label="完成时间")
              el-date-picker(change="search()" end-placeholder="结束日期" start-placeholder="开始日期" v-model="finishTime" type="daterange")
          el-button(@click="resetForm('report')" size="small" slot="action") 重置
  app-data-view(pagination)
    keep-alive
      component(:is="activeName")
</template>

<script>
import Mock from 'mockjs'
import { plainToInstance } from 'class-transformer'
import { request } from '@/utils/net'
import pageMixin from '@/mixins/page'

import sample, { useSample } from './components/sample.vue'
import report, { useReport } from './components/report.vue'
import statistics, { useStatistics } from './components/statistics.vue'

function getData({ length = 10 }) {
  const data = Mock.mock({
    [`data|10-${length}`]: [
      {
        date: '@date',
        name: '@cname',
        address: '@province@city@county'
      }
    ]
  })
  return request(data.data)
}

;(async function () {
  /**
   * @param {0|1|null} status
   */
  function formatStatus(status) {
    if (status === null) return '未初始化'
    if (status > 0) return '启用'
    return '禁用'
  }

  class TableItem {
    date = ''

    name = ''

    address = ''

    /**
     * @type {0|1|null}
     */
    status = null

    lastModified = ''

    get statusName() {
      return formatStatus(this.status)
    }
  }

  const response = await getData({ length: 15 })
  const data = plainToInstance(TableItem, response)
  console.log(data)
})()

export default {
  name: 'DashboardIndex',
  mixins: [
    pageMixin({
      immediate: false,
      request: getData,
      timeFieldMap: {
        uploadTime: ['startTime', 'endTime'],
        submitTime: ['submitDateStart', 'submitDateEnd'],
        finishTime: ['finishDateEndTime', 'finishDateStartTime']
      }
    })
  ],
  components: {
    sample,
    report,
    statistics
  },
  setup() {
    const { form: sampleForm, expertPatientOptions, transferPatientOptions } = useSample()
    const { form: reportForm, tabTypeOptions, exportLisOptions } = useReport()
    const { form: statisticsForm, delFlagOptions } = useStatistics()
    const formMap = {
      sample: sampleForm,
      statistics: statisticsForm,
      report: reportForm
    }

    return {
      formMap,
      statisticsForm,
      sampleForm,
      reportForm,
      expertPatientOptions,
      transferPatientOptions,
      delFlagOptions,
      tabTypeOptions,
      exportLisOptions
    }
  },
  data() {
    return {
      activeName: 'sample'
    }
  },
  computed: {
    form() {
      return this.formMap[this.activeName]
    }
  },
  created() {
    this.form.mechanismId = this.currentMechanism.mechanismId
    this.search()

    this.$nextTick(function () {
      console.log(this.table)
    })
  },
  methods: {
    tabChange(tab) {
      this.resetForm(tab)
    }
  }
}
</script>

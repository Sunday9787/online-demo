<template>
  <app-page>
    <app-card>
      <app-form-tab v-model="activeName" @change="tabChange">
        <app-form-tab-pane v-slot="{ visible }" name="sample" title="样本管理">
          <app-form-collapse :visible="visible">
            <el-form ref="sample" inline :model="sampleForm" size="small" label-width="80px">
              <el-form-item label="样本编号" prop="patientNo">
                <el-input v-model="sampleForm.patientNo" @input="search()" />
              </el-form-item>
              <el-form-item label="上传时间" prop="startTime">
                <el-date-picker
                  type="daterange"
                  v-model="uploadTime"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="search()"
                />
              </el-form-item>
              <el-form-item label="会诊状态" prop="hasExpertPatient">
                <el-select v-model="sampleForm.hasExpertPatient" default-first-option @change="search()">
                  <el-option
                    v-for="item in expertPatientOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="转交状态" prop="transferStatus">
                <el-select v-model="sampleForm.transferStatus" default-first-option>
                  <el-option
                    v-for="item in transferPatientOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-form>
            <el-button slot="action" size="small" @click="resetForm('sample')">重置</el-button>
          </app-form-collapse>
        </app-form-tab-pane>

        <app-form-tab-pane v-slot="{ visible }" name="statistics" title="样本统计">
          <app-form-collapse :visible="visible">
            <el-form ref="statistics" inline :model="statisticsForm" size="small" label-width="80px">
              <el-form-item label="样本编号" prop="patientNo">
                <el-input v-model="statisticsForm.patientNo" @input="search()" />
              </el-form-item>
              <el-form-item label="删除状态" prop="delFlag">
                <el-select v-model="statisticsForm.delFlag" default-first-option @change="search()">
                  <el-option v-for="item in delFlagOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label="提交时间" prop="submitDateStart">
                <el-date-picker
                  type="daterange"
                  v-model="submitTime"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="search()"
                />
              </el-form-item>
            </el-form>
            <el-button slot="action" size="small" @click="resetForm('statistics')">重置</el-button>
          </app-form-collapse>
        </app-form-tab-pane>

        <app-form-tab-pane v-slot="{ visible }" name="report" title="报告报告统计">
          <app-form-collapse :visible="visible">
            <el-form ref="report" inline :model="reportForm" size="small" label-width="80px">
              <el-form-item label="样本编号" prop="patientNo">
                <el-input v-model="reportForm.patientNo" @input="search()" />
              </el-form-item>
              <el-form-item label="导出Lsi" prop="hasExportLis">
                <el-select v-model="reportForm.hasExportLis" default-first-option @change="search()">
                  <el-option
                    v-for="item in exportLisOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="审核进度" prop="tabType">
                <el-select v-model="reportForm.tabType" default-first-option @change="search()">
                  <el-option v-for="item in tabTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
              <el-form-item label="完成时间" prop="finishDateEndTime">
                <el-date-picker
                  type="daterange"
                  v-model="finishTime"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="search()"
                />
              </el-form-item>
            </el-form>
            <el-button slot="action" size="small" @click="resetForm('report')">重置</el-button>
          </app-form-collapse>
        </app-form-tab-pane>
      </app-form-tab>
    </app-card>

    <app-data-view pagination>
      <keep-alive>
        <component :is="activeName" />
      </keep-alive>
    </app-data-view>
  </app-page>
</template>

<script>
import Mock from 'mockjs'
import { plainToInstance } from 'class-transformer'
import { request } from '@/util/net'
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
  const data = plainToInstance(TableItem, response.data)
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
  },
  methods: {
    tabChange(tab) {
      this.resetForm(tab)
    }
  }
}
</script>

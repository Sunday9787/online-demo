<template>
  <app-page>
    <app-card>
      <app-form-collapse>
        <el-form ref="sample" inline :model="form" size="small" label-width="80px">
          <el-form-item label="样本编号" prop="patientNo">
            <el-input v-model="form.patientNo" @input="search()" />
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
            <el-select v-model="form.hasExpertPatient" default-first-option @change="search()">
              <el-option
                v-for="item in expertPatientOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="转交状态" prop="transferStatus">
            <el-select v-model="form.transferStatus" default-first-option>
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
    </app-card>

    <app-data-view pagination>
      <app-table-container>
        <template slot="action">
          <el-button size="small" type="primary">导出LIS</el-button>
          <el-button size="small" type="primary">导出EXCEL</el-button>
          <el-button size="small" type="primary" @click="exposePDF()">导出PDF</el-button>
        </template>

        <el-table ref="table" :data="table.data" v-loading="table.loading" height="100%" stripe>
          <template v-for="head in tableHead">
            <el-table-column :key="head.prop" v-bind="head" v-if="head.on || !head.prop">
              <app-table-widget
                slot="header"
                storage-key="online-organization"
                :data="tableHead"
                :text="head.label"
                v-if="!head.prop"
              />
            </el-table-column>
          </template>
        </el-table>
      </app-table-container>
    </app-data-view>
  </app-page>
</template>

<script>
import moment from 'moment'
import { reactive } from 'vue'
import * as format from '@/util/format'
import { request } from '@/util/net'
import pageMixin from '@/mixins/page'

function getData(param) {
  console.log(param)
  return request(
    Array.from({ length: param.length || 20 }, (v, k) => ({
      date: moment().format('YYYY-MM-DD'),
      name: '王小虎',
      address: `上海市普陀区金沙江路 151${k} 弄`
    }))
  )
}

function useForm() {
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

  return { form, expertPatientOptions, transferPatientOptions }
}

export default {
  name: 'OrganizationIndex',
  mixins: [
    pageMixin({
      immediate: false,
      request: getData,
      timeFieldMap: {
        uploadTime: ['startTime', 'endTime']
      }
    })
  ],
  filters: {
    /**
     * @param {string} size
     * @param {string} unit
     */
    formatByte(size, unit) {
      if (unit) {
        return format.byte(size).format(unit)
      }

      return '-'
    }
  },
  setup() {
    const { form, expertPatientOptions, transferPatientOptions } = useForm()

    return {
      form,
      expertPatientOptions,
      transferPatientOptions
    }
  },
  data() {
    return {
      tableHead: [
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
          on: true,
          fixed: true,
          label: '日期',
          prop: 'date',
          width: '180'
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
    this.form.mechanismId = this.currentMechanism.mechanismId
    this.search()
  },
  methods: {
    exposePDF() {
      console.log('123')
    }
  }
}
</script>

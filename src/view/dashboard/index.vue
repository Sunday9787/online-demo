<template>
  <app-page>
    <app-card>
      <app-form-tab v-model="activeName">
        <app-form-tab-pane name="sample" title="样本管理">
          <app-form-collapse>
            <el-form ref="form" inline :model="form" size="small" label-width="80px" @keyup.native.enter="search()">
              <el-form-item label="姓名">
                <el-input v-model="form.userName" />
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="form.userName" />
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="form.userName" />
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="form.userName" />
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="form.userName" />
              </el-form-item>
            </el-form>
            <el-button slot="action" size="small" @click="search()">搜索</el-button>
          </app-form-collapse>
        </app-form-tab-pane>

        <app-form-tab-pane name="statistics" title="样本统计">
          <app-form-collapse>
            <el-form ref="form" inline :model="form" size="small" label-width="80px" @keyup.native.enter="search()">
              <el-form-item label="电话">
                <el-input v-model="form.userPhone" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="form.userPhone" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="form.userPhone" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="form.userPhone" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="form.userPhone" />
              </el-form-item>
            </el-form>
            <el-button slot="action" size="small" @click="search()">搜索</el-button>
          </app-form-collapse>
        </app-form-tab-pane>

        <app-form-tab-pane name="report" title="报告报告统计">
          <app-form-collapse>
            <el-form ref="form" inline :model="form" size="small" label-width="80px" @keyup.native.enter="search()">
              <el-form-item label="电话">
                <el-input v-model="form.userPhone" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="form.userPhone" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="form.userPhone" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="form.userPhone" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="form.userPhone" />
              </el-form-item>
            </el-form>
            <el-button slot="action" size="small" @click="search()">搜索</el-button>
          </app-form-collapse>
        </app-form-tab-pane>
      </app-form-tab>
    </app-card>

    <app-card flex>
      <keep-alive>
        <component :is="activeName" />
      </keep-alive>
    </app-card>
  </app-page>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { request } from '@/util/net'
import pageMixin from '@/mixins/page'

import sample from './components/sample.vue'
import report from './components/report.vue'
import statistics from './components/statistics.vue'

function getData(param) {
  console.log(param)
  return request(
    Array.from({ length: param.length }, (v, k) => ({
      date: moment().format('YYYY-MM-DD'),
      name: '王小虎',
      address: `上海市普陀区金沙江路 151${k} 弄`
    }))
  )
}

export default {
  name: 'DashboardIndex',
  mixins: [pageMixin({ immediate: false, request: getData })],
  components: {
    sample,
    report,
    statistics
  },
  data() {
    return {
      activeName: 'sample',
      form: { length: 30, userName: '', userPhone: '', mechanismId: null }
    }
  },
  provide() {
    return {
      page: this
    }
  },
  computed: {
    ...mapGetters('appModule', ['currentMechanism'])
  },
  created() {
    this.form.mechanismId = this.currentMechanism.mechanismId
    this.search()
  },
  methods: {
    tabChange(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<template>
  <app-page>
    <app-card>
      <app-form-collapse>
        <app-form-tab v-model="activeName">
          <app-form-tab-pane name="sample" title="样本管理">
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
          </app-form-tab-pane>
          <app-form-tab-pane name="statistics" title="样本统计">
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
          </app-form-tab-pane>
        </app-form-tab>
        <el-button slot="action" size="small" @click="search()">搜索</el-button>
      </app-form-collapse>
    </app-card>

    <app-card flex>
      <el-table ref="table" :data="table.data" v-loading="table.loading" height="100%" stripe>
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </app-card>
  </app-page>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { request } from '@/util/net'
import pageMixin from '@/mixins/page'

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
  data() {
    return {
      activeName: 'sample',
      form: { length: 30, userName: '', mechanismId: null }
    }
  },
  computed: {
    ...mapGetters('appModule', ['currentMechanism'])
  },
  created() {
    this.form.mechanismId = this.currentMechanism.mechanismId
    this.search()
  }
}
</script>

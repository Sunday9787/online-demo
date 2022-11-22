<template>
  <app-page>
    <h1>Dashboard</h1>
    <el-form ref="form" :model="form" label-width="80px" @submit.native.prevent="search()">
      <el-form-item label="姓名">
        <el-input v-model="form.userName" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="table.data" v-loading="table.loading">
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table>
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

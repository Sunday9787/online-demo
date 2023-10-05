<template>
  <app-data-view pagination>
    <app-table-container>
      <template slot="action">
        <el-button size="small" type="primary">导出病例</el-button>
        <el-button size="small" type="primary">导出EXCEL</el-button>
        <el-button size="small" type="primary">专家会诊</el-button>
        <el-button size="small" type="primary">病例分配</el-button>
      </template>

      <el-table ref="table" :data="table.data" v-loading="table.loading" height="100%" stripe>
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </app-table-container>
  </app-data-view>
</template>

<script>
import { request } from '@/utils/net'
import pageMixin from '@/mixins/page'

function getData(param) {
  console.log(param)
  return request(
    Array.from({ length: param.length || 20 }, (v, k) => ({
      name: '王小虎',
      address: `上海市普陀区金沙江路 151${k} 弄`
    }))
  )
}

export default {
  name: 'org-transactionLog',
  mixins: [
    pageMixin({
      request: getData,
      immediate: false
    })
  ],
  setup() {
    const form = { mechanismId: null }

    return {
      form
    }
  },
  created() {
    this.form.mechanismId = this.currentMechanism.mechanismId
    this.search()
  }
}
</script>

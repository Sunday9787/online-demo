<template>
  <el-table ref="table" :data="page.table.data" v-loading="page.table.loading" height="100%" stripe>
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="address" label="地址" />
  </el-table>
</template>

<script>
export default {
  name: 'dashboard-sample',
  inject: ['page'],
  setup() {}
}
</script>

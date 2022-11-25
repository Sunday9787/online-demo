<template>
  <app-card flex>
    <slot />

    <el-row type="flex" justify="end" class="app-pagination" v-if="pagination">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="page.pagination.total"
        :current-page.sync="page.pagination.current"
        :page-size.sync="page.pagination.limit"
      />
    </el-row>
  </app-card>
</template>

<script>
export default {
  name: 'AppDataView',
  inject: ['page'],
  props: {
    pagination: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      dataView: this
    }
  },
  setup() {}
}
</script>

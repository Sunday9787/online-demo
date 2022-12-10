<template>
  <div class="app-table-container">
    <el-row class="app-table-button-group" v-if="$slots.action">
      <slot name="action" />
    </el-row>

    <el-row class="app-table__inner">
      <slot />
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'app-table-container',
  inject: ['dataView'],
  props: {
    groupHeight: {
      type: Number,
      default: 32
    }
  }
}
</script>

<style lang="scss">
.app-table-container {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.app-table__inner {
  overflow: hidden;
  flex: 1;
}

.app-table-container + .app-pagination,
.app-table-button-group + .app-table__inner {
  padding-top: 12px;
}
</style>

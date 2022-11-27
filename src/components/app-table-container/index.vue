<template>
  <div class="app-table-container" :style="tableContainerStyle">
    <el-row class="app-table-button-group" :style="{ height: groupHeight + 'px' }" v-if="$slots.action">
      <slot name="action" />
    </el-row>

    <el-row class="app-table__inner" :style="innerStyle">
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
  },
  computed: {
    innerStyle() {
      if (this.$slots.action) {
        return {
          height: `calc(100% - (${this.groupHeight}px))`
        }
      }

      return { height: '100%' }
    },
    tableContainerStyle() {
      if (this.dataView.pagination) {
        return { height: 'calc(100% - 44px)' }
      }

      return { height: '100%' }
    }
  }
}
</script>

<style lang="scss">
.app-table-container {
  position: relative;
}

.app-table-container + .app-pagination,
.app-table-button-group + .app-table__inner {
  padding-top: 12px;
}
</style>

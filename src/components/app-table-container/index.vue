<template lang="pug" functional>
  .app-table-container
    el-row.app-table-action(v-if="$slots.action")
      slot(name='action')

    el-row.app-table__inner
      slot
</template>

<script>
export default {
  name: 'app-table-container'
}
</script>

<style lang="scss">
.app-table-container {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
}

.app-table__inner {
  flex: 1;
  overflow: hidden;
}

.app-table-container + .app-pagination,
.app-table-action + .app-table__inner {
  padding-top: 12px;
}
</style>

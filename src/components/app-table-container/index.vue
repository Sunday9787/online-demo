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
.app-table-action + .app-table__inner {
  padding-top: 12px;
}
</style>

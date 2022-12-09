<template>
  <el-table :data="data" height="100%">
    <el-table-column v-for="item in column" :key="item.id" v-bind="item">
      <template v-slot="{ row }">
        <el-image
          style="width: 150px; height: 100px"
          fit="cover"
          :src="row.arrayedFig"
          v-if="item.prop === 'arrayedFig'"
        />
        <span v-else>{{ row[item.prop] }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'PatientListModel',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const column = [
      { label: '病例名称', prop: 'patientName', align: 'center' },
      { label: '玻片号', prop: 'glassSlide', align: 'center' },
      { label: '排列图', prop: 'arrayedFig', align: 'center' },
      { label: '计数数量', prop: 'countNum', align: 'center' },
      { label: '核型表达式', prop: 'karyotypeExpression', align: 'center' }
    ]

    return { column }
  }
}
</script>

<style lang="scss">
.patient-list-model {
  position: relative;
}
</style>

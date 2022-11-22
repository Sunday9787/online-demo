<template>
  <el-container class="app-patient">
    <PatientAside />
    <section class="app-patient-content">
      <el-row>
        <div class="app-patient-action__inner">
          <div class="app-patient-action">
            <el-button type="primary" size="small">完成病例分析</el-button>
            <el-button type="primary" size="small">追加分析</el-button>
          </div>
        </div>
      </el-row>

      <el-row type="flex" justify="end" class="app-patient-tools"> 工具栏 </el-row>

      <div class="app-patient-list">列表区域</div>
    </section>
  </el-container>
</template>

<script>
import PatientAside from './patient-aside.vue'

export default {
  name: 'app-patient',
  components: { PatientAside },
  setup() {}
}
</script>

<style lang="scss">
.app-patient {
  height: 100%;
}

.app-patient-action__inner {
  float: right;
}

.app-patient-action {
  display: table-cell;
  vertical-align: middle;
  height: 50px;
  text-align: right;
  padding-right: 10px;

  > .el-button {
    vertical-align: middle;
  }
}

.app-patient-list {
  flex: 1;
}

.app-patient-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.app-patient-tools {
  background-color: #fff;
}
</style>

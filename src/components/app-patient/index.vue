<template>
  <el-container class="app-patient">
    <PatientAside />

    <el-container>
      <hr class="app-patient__line" />

      <el-container direction="vertical">
        <el-row type="flex" justify="end" class="app-patient-tools">
          <div class="app-patient-action__inner">
            <div class="app-patient-action">
              <el-button type="primary" size="small">完成病例分析</el-button>
              <el-button type="primary" size="small">追加分析</el-button>
            </div>
          </div>
        </el-row>

        <section class="patient-list-container">
          <app-scale :scale.sync="scale" :max-scale="maxScale" />
          <PatientList :scale="scale" />
        </section>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { ref } from 'vue'
import PatientAside from './patient-aside.vue'
import PatientList, { maxScale } from './components/patient-list.vue'

export default {
  name: 'AppPatient',
  components: { PatientAside, PatientList },
  setup() {
    const scale = ref(0)

    return {
      scale,
      maxScale
    }
  }
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
  flex: 1;
}

.app-patient__line {
  width: 12px;
  height: 100%;
  border: none;
  margin: 0;

  @include themed;
  @include themeify {
    background-color: theme('color-background-deep');
  }
}

.app-patient-tools {
  padding: 5px 10px;

  @include themed;
  @include themeify {
    background-color: theme('color-background');
  }
}

.patient-list-container {
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
  margin-top: 10px;
}
</style>

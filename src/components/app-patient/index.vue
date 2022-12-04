<template>
  <el-container class="app-patient">
    <PatientAside />

    <el-container>
      <PatientGap :gap="12" direction="vertical" />

      <el-container direction="vertical">
        <PatientToolbar />

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
import PatientToolbar from './components/patient-toolbar.vue'
import PatientGap from './components/patient-gap.vue'

export default {
  name: 'AppPatient',
  components: { PatientAside, PatientList, PatientToolbar, PatientGap },
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

.app-patient-action {
  display: flex;
  align-items: center;
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

.patient-list-container {
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
  margin-top: 10px;
}
</style>

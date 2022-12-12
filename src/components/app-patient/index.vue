<template>
  <el-container class="app-patient">
    <PatientAside />

    <app-gap :gap="12" direction="vertical" />

    <el-container>
      <el-container direction="vertical">
        <PatientToolbar />

        <el-row type="flex" style="margin-top: 10px">
          <div class="flex1" />
          <PatientModelSwitch v-model="isThumbnail" />
        </el-row>

        <section class="patient-list-container">
          <app-scale :scale.sync="scale" :max-scale="maxScale" :mini-scale="0" :natural="false" v-show="isThumbnail" />
          <keep-alive>
            <PatientGridModel :data="patients" :scale="scale" v-if="isThumbnail" />
            <PatientListModel :data="patients" v-else />
          </keep-alive>
        </section>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { ref } from 'vue'
import PatientAside from './patient-aside.vue'
import PatientGridModel, { maxScale } from './components/patient-grid-model.vue'
import PatientListModel from './components/patient-list-model.vue'
import PatientToolbar from './components/patient-toolbar.vue'
import PatientModelSwitch from './components/patient-model-switch.vue'

import * as mockData from '@/mock/patient'

export default {
  name: 'AppPatient',
  components: {
    PatientAside,
    PatientGridModel,
    PatientListModel,
    PatientToolbar,
    PatientModelSwitch
  },
  setup() {
    const scale = ref(0)
    const isThumbnail = ref(false)
    const patients = ref(mockData.patients.data)

    return {
      patients,
      scale,
      maxScale,
      isThumbnail
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
  background-color: var(--color-background-deep);
  @extend %themed;
}

.patient-list-container {
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
  margin-top: 10px;
}
</style>

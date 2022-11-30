<template>
  <el-container class="patient-pane">
    <ul v-show="!local" class="patient-pane-org">
      <li v-for="(item, k) in organization.data" :key="k" class="patient-pane-org__item">{{
        item.name | formatFirstName
      }}</li>
    </ul>

    <el-container direction="vertical" class="patient-pane__inner">
      <div class="patient-pane__search">
        <el-input v-model="form.patientNo" placeholder="请输入病例号" />
      </div>

      <el-container class="patient-pane__content">
        <ul class="patient-pane-list">
          <li v-for="(item, k) in patientList.data" :key="k" class="patient-pane-list-item">{{ item.name }}</li>
        </ul>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import Vue from 'vue'
import * as mockData from '@/mock/patient'

export default Vue.extend({
  name: 'PatientItem',
  props: {
    local: {
      type: Boolean,
      default: true
    }
  },
  filters: {
    /**
     * @param {string} val
     */
    formatFirstName(val) {
      return val.charAt(0)
    }
  },
  data() {
    return {
      form: { patientNo: '' },
      patientList: mockData.patientList,
      organization: mockData.organization
    }
  }
})
</script>

<style lang="scss">
.patient-pane {
}

.patient-pane-org {
  overflow-y: auto;
  width: 60px;
  height: 100%;
  margin: 0;
  padding: 0;
}

.patient-pane-org__item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  height: 30px;
  cursor: pointer;

  @include themed;
  @include themeify {
    &:hover {
      background-color: theme('color-primary-light-9');
    }
  }
}

.patient-pane__inner {
}

.patient-pane__content {
  overflow: hidden;
}

.patient-pane-list {
  position: relative;
  display: block;
  flex: 1;
  margin: 0;
  padding: 0;
  overflow-y: auto;
}

.patient-pane-list-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 15px;
  height: 40px;

  @include themed;
  @include themeify {
    &:hover {
      background-color: theme('color-primary-light-9');
    }
  }
}
</style>

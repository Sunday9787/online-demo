<template>
  <el-form size="small" class="patient-pane">
    <el-row v-show="advancedSearchVisible" class="patient-advanced-search">
      <el-form-item prop="startTime">
        <el-date-picker
          v-model="dateTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
    </el-row>

    <ul v-show="!local" class="patient-pane-org">
      <li v-for="(item, k) in organization.data" :key="k" class="patient-pane-org__item">
        {{ item.name | formatFirstName }}<span></span>
      </li>
    </ul>

    <PatientGap direction="vertical" />

    <el-container direction="vertical" class="patient-pane__inner">
      <el-form-item prop="patientNo">
        <div class="patient-pane__search">
          <a class="el-icon-s-operation" href="javascript:;" @click="advancedSearchToggle()" />
          <el-input v-model="form.patientNo" placeholder="请输入病例号" />
        </div>
      </el-form-item>

      <el-container class="patient-pane__content">
        <ul class="patient-pane-list">
          <li v-for="(item, k) in patientList.data" :key="k" class="patient-pane-list-item">
            <i class="el-icon-s-order" />

            <div class="patient-pane__name" :title="item.name">{{ item.name | formatFirstName }}</div>

            <div class="patient-pane__status">
              <i class="el-icon-info" />
              <i class="el-icon-question" />
            </div>
          </li>
        </ul>
      </el-container>

      <PatientGap />

      <PatientData />
    </el-container>
  </el-form>
</template>

<script>
import Vue from 'vue'
import { request } from '@/util/net'
import PatientData from './components/patient-data.vue'
import PatientGap from './components/patient-gap.vue'
import * as mockData from '@/mock/patient'

import pageMixin from '@/mixins/page'
import { useToggle } from '@/hooks/useToggle'

function getData(param) {
  console.log(param)
  return request(
    Array.from({ length: param.length || 20 }, (v, k) => ({
      name: '王小虎',
      address: `上海市普陀区金沙江路 151${k} 弄`
    }))
  )
}

export default Vue.extend({
  name: 'PatientItem',
  mixins: [
    pageMixin({
      request: getData,
      timeFieldMap: {
        dateTime: ['startTime', 'endTime']
      }
    })
  ],
  components: { PatientData, PatientGap },
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
  setup() {
    const { value: advancedSearchVisible, toggle: advancedSearchToggle } = useToggle()
    return { advancedSearchVisible, advancedSearchToggle }
  },
  data() {
    return {
      advancedSearch: false,
      form: { patientNo: '', startTime: '', endTime: '' },
      patientList: mockData.patientList,
      organization: mockData.organization
    }
  }
})
</script>

<style lang="scss">
.patient-pane {
  display: flex;
  flex: 1;
}

.patient-pane-org {
  overflow-y: auto;
  width: 38px;
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

  @extend %themed;
  &:hover {
    background-color: var(--color-primary-light-9);
  }
}

.patient-pane__inner {
  width: 260px;
  padding-top: 20px;
}

.patient-advanced-search {
  padding-top: 20px;
}

.patient-pane__search {
  display: flex;
  column-gap: 10px;
  align-items: center;
  padding: 0 15px;

  .el-input__inner {
    border-radius: 16px;
  }

  [class^='el-icon-'] {
    width: 20px;
    height: 20px;
  }
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
  padding: 0 15px;
  height: 40px;

  &:hover {
    background-color: var(--color-primary-light-9);
  }

  @extend %themed;
}

.patient-pane__name {
  flex: 1;
  margin-left: 4px;
  margin-right: 10px;
  width: 0;
  cursor: pointer;
  @extend %ellipsis;
}

.patient-pane__status {
  display: flex;
  column-gap: 4px;
  font-size: 16px;
  color: var(--color-primary);
}
</style>

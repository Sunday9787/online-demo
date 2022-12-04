<template>
  <el-row type="flex" class="patient-toolbar">
    <el-row type="flex" style="column-gap: 4px">
      <ul class="patient-toolbar-list">
        <li v-for="(item, index) in glassSlide" :key="index" class="glass-cell">
          <label class="glass-label">{{ item.name }}：</label>

          <PatientPopover popover-class="glass-popover" :width="50" :height="24" v-if="index === glassSlide.length - 1">
            <span>{{ item.value[0] }}</span>
            <PatientPopoverItem v-for="(value, id) in item.value" :key="id" slot="content">{{
              value
            }}</PatientPopoverItem>
          </PatientPopover>
          <span class="glass-value" v-else>{{ item.value[0] }}个</span>
        </li>
      </ul>

      <ul class="patient-toolbar-list">
        <li v-for="(item, index) in glassSlide" :key="index" class="glass-cell">
          <label class="glass-label">{{ item.name }}：</label>

          <PatientPopover popover-class="glass-popover" :width="50" :height="24" v-if="index === glassSlide.length - 1">
            <span>{{ item.value[0] }}</span>
            <PatientPopoverItem v-for="(value, id) in item.value" :key="id" slot="content">{{
              value
            }}</PatientPopoverItem>
          </PatientPopover>
          <span class="glass-value" v-else>{{ item.value[0] }}个</span>
        </li>
      </ul>
    </el-row>

    <div class="flex1" />

    <div class="app-patient-action">
      <el-button type="primary" size="small">完成病例分析</el-button>
      <el-button type="primary" size="small">追加分析</el-button>
    </div>
  </el-row>
</template>

<script>
import PatientPopover from './patient-popover.vue'
import PatientPopoverItem from './patient-popover-item.vue'
import { glassSlide } from '@/mock/patient'

export default {
  name: 'PatientToolbar',
  components: { PatientPopover, PatientPopoverItem },
  setup() {
    return {
      glassSlide: glassSlide.data
    }
  }
}
</script>

<style lang="scss">
.patient-toolbar {
  padding: 5px 10px;

  @include themed;
  @include themeify {
    background-color: theme('color-background');
  }
}

.patient-toolbar-list {
  position: relative;
  display: grid;
  grid-template-rows: repeat(2, 24px);
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  margin: 0;
  font-size: 12px;
}

%glass-popover {
  padding-left: 10px;
  line-height: 24px;
  border-radius: 4px;
}

.glass-popover {
  padding-right: 4px;
  @extend %glass-popover;
  @include themed;

  @include themed;
  @include themeify {
    background-color: theme('color-background-deep');
    box-shadow: 0 0 2px 0 rgba(theme('color-background-deep'), 0.6);
  }
}

.glass-cell {
  position: relative;
}

.glass-label {
  display: inline-block;
  vertical-align: middle;
  width: 50px;
}

.glass-value {
  padding-right: 10px;
  height: 24px;
  cursor: default;
  @extend .glass-label;
  @extend %glass-popover;

  @include themed;
  background-color: var(--color-background-deep);
}
</style>

<template>
  <el-container class="patient-item">
    <ul v-show="!local" class="patient-item__head">
      <li>H</li>
    </ul>

    <el-container direction="vertical" class="patient-item__inner">
      <div class="patient-item__search">
        <el-input v-model="form.patientNo" placeholder="请输入病例号" />
      </div>
      <div class="patient-item__content">666</div>
    </el-container>
  </el-container>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'patient-item',
  props: {
    local: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      form: { patientNo: '' }
    }
  }
})
</script>

<style lang="scss">
.patient-item__head {
  width: 60px;
}

.patient-item__inner {
}
</style>

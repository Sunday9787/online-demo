<template>
  <section class="patient-data">
    <div class="patient-data__head">
      <h4 class="patient-data__title">病例信息</h4>

      <a href="javascript:;" :class="['el-icon-caret-' + toggleIcon]" @click="toggle()" />
    </div>

    <app-collapse-transition>
      <section class="patient-data__desc" v-show="visible"> 666 </section>
    </app-collapse-transition>
  </section>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'PatientData',
  setup() {
    const visible = ref(true)
    const toggle = function () {
      visible.value = !visible.value
    }
    const toggleIcon = computed(() => (visible.value ? 'bottom' : 'top'))

    return {
      visible,
      toggle,
      toggleIcon
    }
  }
}
</script>

<style lang="scss">
.patient-data {
  display: flex;
  flex-direction: column;
}

.patient-data__head {
  position: relative;
  display: flex;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  background-color: var(--color-background);
  border-bottom-color: var(--color-border-light);
  @extend %themed;

  [class^='el-icon-'] {
    font-size: 20px;
    @extend %themed;
    color: var(--color-primary);
  }
}

.patient-data__title {
  flex: 1;
}

.patient-data__desc {
  height: 330px;
  min-width: 240px;
  background-color: var(--color-background);
  @extend %themed;
}
</style>

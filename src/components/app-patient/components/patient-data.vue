<template>
  <section class="patient-data">
    <div class="patient-data__head">
      <h4 class="patient-data__title">病例信息</h4>

      <a
        href="javascript:;"
        class="el-icon-caret-bottom patient-data__toggle"
        :class="{ toggle: visible }"
        @click="toggle()"
      />
    </div>

    <app-collapse-transition>
      <section class="patient-data__desc" v-show="visible"> 666 </section>
    </app-collapse-transition>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'PatientData',
  setup() {
    const visible = ref(true)
    const toggle = function () {
      visible.value = !visible.value
    }

    return {
      visible,
      toggle
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
  border-bottom-width: 1px;
  border-bottom-style: solid;

  @include themed;
  @include themeify {
    background-color: theme('color-background');
    border-bottom-color: theme('color-border-light');
  }
}

.patient-data__title {
  flex: 1;
}

.patient-data__toggle {
  transition-duration: 0.2s;
  display: block;
  width: 18px;
  height: 18px;

  &.toggle {
    transform: rotate(180deg);
  }
}

.patient-data__desc {
  height: 330px;
  min-width: 240px;

  @include themed;
  @include themeify {
    background-color: theme('color-background');
  }
}
</style>

<template>
  <aside class="patient-aside">
    <div class="patient-tab">
      <a
        href="javascript:;"
        @click="changeTab('patient-item-one')"
        class="patient-tab-item local"
        :class="{ active: tabActive === 'patient-item-one' }"
      >
        <span>本机构病例</span>
        <i />
      </a>

      <a
        href="javascript:;"
        @click="changeTab('patient-item-two')"
        class="patient-tab-item other"
        :class="{ active: tabActive === 'patient-item-two' }"
      >
        <span>其他转入病例</span>
        <i />
      </a>
    </div>

    <div class="patient-tab-content flex1">
      <component :is="tabActive" :local="local" />
    </div>
  </aside>
</template>

<script>
import { computed } from 'vue'
import { useTab } from '@/hooks/useTab'
import patientItemFactory from './patient-item.vue'

export default {
  name: 'PatientAside',
  components: {
    patientItemOne: patientItemFactory.extend({ name: 'patientItemOne' }),
    patientItemTwo: patientItemFactory.extend({ name: 'patientItemTwo' })
  },
  setup() {
    const { tabActive, changeTab } = useTab('patient-item-one')
    const local = computed(() => tabActive.value === 'patient-item-one')

    return {
      local,
      tabActive,
      changeTab
    }
  }
}
</script>

<style lang="scss">
.patient-aside {
  display: flex;
  flex-direction: column;
  padding-left: 2px;
}

.patient-tab {
  position: relative;
  width: 264px;
  height: 50px;
}

.patient-tab-item {
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  font-size: 14px;
  color: #999;

  > span {
    position: relative;
    z-index: 1;
  }

  > i {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    height: 100%;
    width: 100%;
    background-color: #dde1e5;
    border-radius: 6px 6px 0 0;
  }

  &.local {
    padding: 0 50px 0 30px;
    left: 0;
    width: 200px;

    > i {
      transform: perspective(2px) scale(1, 1.2) rotateX(0.5deg);
      transform-origin: bottom left;
    }
  }

  &.other {
    padding: 0 30px 0 50px;
    right: 0;

    > i {
      transform: perspective(2px) scale(1, 1.2) rotateX(0.5deg);
      transform-origin: bottom right;
    }
  }

  &.active {
    height: 36px;
    color: #fff;

    > i {
      background: var(--color-primary);
    }
  }
}

.patient-tab-content {
  overflow: hidden;
  position: relative;
  display: flex;
  border-radius: 0 12px 12px 12px;
  background-color: var(--color-background);
  @extend %themed;
}
</style>

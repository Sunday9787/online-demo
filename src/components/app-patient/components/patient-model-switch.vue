<template>
  <div
    class="patient-model-switch"
    :class="{ 'is-thumbnail': isThumbnail, 'is-dark': isDarkModel, 'is-light': isLightModel }"
  >
    <a href="javascript:;" class="patient-model-switch__item" @click="toggle(true)" />
    <a href="javascript:;" class="patient-model-switch__item" @click="toggle(false)" />
  </div>
</template>

<script>
import { watch } from 'vue'
import { useToggle } from '@/hooks/useToggle'
import { useTheme } from '@/hooks/useTheme'

export default {
  name: 'PatientModelSwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { isDarkModel, isLightModel } = useTheme()
    const { value: isThumbnail, toggle } = useToggle(props.value)

    watch(
      () => props.value,
      function (val) {
        isThumbnail.value = val
      }
    )

    return { isThumbnail, toggle, isDarkModel, isLightModel }
  }
}
</script>

<style lang="scss">
.patient-model-switch {
  display: flex;
  align-items: center;
  width: 68px;
  height: 24px;
  margin-left: auto;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 4px;

  &.is-light {
    background-image: url('@/image/components/app-patient/thumbnail-list-light.svg');
    &.is-thumbnail {
      background-image: url('@/image/components/app-patient/thumbnail-grid-light.svg');
    }
  }

  &.is-dark {
    background-image: url('@/image/components/app-patient/thumbnail-list-dark.svg');
    &.is-thumbnail {
      background-image: url('@/image/components/app-patient/thumbnail-grid-dark.svg');
    }
  }
}

.patient-model-switch__item {
  display: block;
  flex: 1;
  height: 100%;
}
</style>

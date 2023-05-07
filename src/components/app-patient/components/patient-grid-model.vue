<template>
  <ul class="patient-grid-model" :style="patientStyle">
    <li v-for="(item, k) in data" :key="k" class="patient-item">
      <el-image class="patient-item__image" :src="item.arrayedFig" fit="cover" />

      <div class="patient-item__desc">
        {{ item.patientName }}
      </div>
    </li>
  </ul>
</template>

<script>
import { watch, ref } from 'vue'

/**
 * @type {ReadonlyArray<import('vue/types/jsx').StyleValue>}
 */
export const scaleMap = [
  {
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
  {
    gridTemplateColumns: 'repeat(4, 1fr)'
  },
  {
    gridTemplateColumns: 'repeat(5, 1fr)'
  },
  {
    gridTemplateColumns: 'repeat(6, 1fr)'
  },
  {
    gridTemplateColumns: 'repeat(8, 1fr)'
  }
]

export const maxScale = scaleMap.length - 1

export default {
  name: 'PatientGridModel',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    scale: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const patientStyle = ref(scaleMap[props.scale])

    watch(
      () => props.scale,
      function (val) {
        if (val > scaleMap.length) {
          console.error('超出最大scale范围', `0 - ${scaleMap.length}`)
          return
        }

        patientStyle.value = scaleMap[val]
      }
    )

    return { patientStyle }
  }
}
</script>

<style lang="scss">
.patient-grid-model {
  display: grid;
  grid-auto-rows: max-content;
  gap: 10px;
  width: 100%;
  margin: 0;
  overflow-y: auto;
}

.patient-item {
  position: relative;
  overflow: hidden;
  background-color: var(--color-background);
  @extend %themed;
}

.patient-item__image {
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 100%;

  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition-duration: 0.2s;
    will-change: transform;
  }

  &:hover {
    > img {
      transform: scale3d(1.2, 1.2, 1);
    }
  }
}

.patient-item__desc {
  height: 40px;
  padding: 10px;
  @extend %ellipsis;
}
</style>

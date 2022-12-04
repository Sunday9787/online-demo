<template>
  <hr class="patient-aside-gap" :style="style" />
</template>

<script>
/**
 * @type {ReadonlyArray<string>}
 */
const validate = ['horizontal', 'vertical']

const directionMap = {
  /**
   * @param {number} gap
   * @returns {[string, string]}
   */
  horizontal(gap) {
    return ['100%', gap + 'px']
  },
  /**
   * @param {number} gap
   * @returns {[string, string]}
   */
  vertical(gap) {
    return [gap + 'px', '100%']
  }
}

/**
 * @type {Vue.Component<Vue>}
 */
export default {
  name: 'PatientGap',
  props: {
    gap: {
      type: Number,
      default: 2
    },
    direction: {
      type: String,
      default: 'horizontal',
      /**
       * @param {string} value
       */
      validator(value) {
        return validate.indexOf(value) > -1
      }
    }
  },
  setup(props) {
    const [width, height] = directionMap[props.direction](props.gap)

    return { style: { width, height } }
  }
}
</script>

<style lang="scss">
.patient-aside-gap {
  margin: 0;
  border: none;

  @include themed;
  @include themeify {
    background-color: theme('color-background-deep');
  }
}
</style>

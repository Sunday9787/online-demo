<template>
  <hr class="app-gap" :style="style" />
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
    return ['100%', `${gap}px`, `0 0 ${gap}px`]
  },
  /**
   * @param {number} gap
   * @returns {[string, string]}
   */
  vertical(gap) {
    return [`${gap}px`, '100%', `0 0 ${gap}px`]
  }
}

/**
 * @type {Vue.Component<Vue>}
 */
export default {
  name: 'AppGap',
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
    const [width, height, flex] = directionMap[props.direction](props.gap)

    return { style: { width, height, flex } }
  }
}
</script>

<style lang="scss">
.app-gap {
  margin: 0;
  background-color: var(--color-background-deep);
  border: none;
  @extend %themed;
}
</style>

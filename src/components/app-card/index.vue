<template functional>
  <div
    class="app-card"
    :class="[
      data.staticClass,
      {
        flex1: props.flex1,
        'app-card--flex': props.type === 'flex',
        'app-card--vertical': props.direction === 'vertical',
        'app-card--horizontal': props.direction === 'horizontal'
      }
    ]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppCard',
  props: {
    type: {
      type: String,
      required: false
    },
    flex1: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss">
.app-card {
  padding: 16px;
  overflow: hidden;
  background-color: var(--color-background);
  border-radius: 10px;
  @extend %themed;

  & + & {
    margin-top: 8px;
  }

  &--flex {
    display: flex;
  }

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }
}
</style>

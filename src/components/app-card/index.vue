<template functional>
  <div class="app-card" :class="[data.staticClass, { flex1: props.flex }]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'app-card',
  props: {
    flex: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.app-card {
  overflow: hidden;
  padding: 16px;
  border-radius: 10px;

  @include themed;
  @include themeify {
    background-color: theme('color-background');
  }

  & + & {
    margin-top: 8px;
  }
}
</style>

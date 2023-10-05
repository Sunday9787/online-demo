<template lang="pug">
  svg.template-mark-line(
    xmlns="http://www.w3.org/2000/svg"
    :width="size.width"
    :height="size.height"
    :style="wrapperStyle"
    :class="{visible}")
    line(stroke="var(--color-primary)" x1="0" y1="0" :x2="size.width" :y2="size.height")
</template>

<script>
export default {
  name: 'TemplateMarkLine',
  props: {
    visible: Boolean,
    direction: {
      type: String,
      default: 'horizontal'
    },
    position: {
      type: Object,
      required: true
    }
  },
  computed: {
    wrapperStyle() {
      return {
        left: this.position.left + 'px',
        top: this.position.top + 'px'
      }
    },
    isHorizontal() {
      return this.direction === 'horizontal'
    },
    size() {
      if (this.isHorizontal) {
        return { width: '100%', height: '1' }
      }

      return { width: '1', height: '100%' }
    }
  }
}
</script>

<style lang="scss">
.template-mark-line {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;

  &.visible {
    opacity: 1;
  }
}
</style>

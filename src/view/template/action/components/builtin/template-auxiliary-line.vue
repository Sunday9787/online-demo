<template lang="pug">
  svg.template-auxiliary-line(xmlns="http://www.w3.org/2000/svg" :width="size.width" :height="size.height")
    line(stroke="var(--color-primary)" x1="0" y1="0" :x2="size.width" :y2="size.height")
</template>

<script>
export default {
  name: 'TemplateAuxiliaryLine',
  props: {
    direction: {
      type: String,
      default: 'horizontal'
    }
  },
  computed: {
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
.template-auxiliary-line {
  position: absolute;
  left: 0;
  top: 0;
}
</style>

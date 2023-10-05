<template lang="pug" functional>
  svg.template-sprite(
    xmlns="http://www.w3.org/2000/svg"
    :width="props.size.width"
    :height="props.size.height"
    :viewBox="`0 0 ${props.size.width} ${props.size.height}`"
    :transform="`scale(${props.scale})`"
  )
    defs
      pattern(id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse")
        path(d="M 10 0 L 0 0 L 0 10" fill="none" stroke-width="1" stroke="rgba(207, 207, 207, 0.3)")
      pattern(id="grid" width="50" height="50" patternUnits="userSpaceOnUse")
        rect(width="50" height="50" fill="url(#smallGrid)")
        path(d="M 50 0 L 0 0 L 0 50" fill="none" stroke-width="1" stroke="rgba(186, 186, 186, 0.5)")
    rect(width="100%" height="100%" fill="url(#grid)")
    path(
      :d="`M ${props.size.width} 0 L ${props.size.width} ${props.size.height} L 0 ${props.size.height}`"
      fill="none"
      stroke-width="1"
      stroke="rgba(186, 186, 186, 0.5)"
    )
</template>

<script>
export default {
  name: 'TemplateSprite',
  props: {
    size: {
      type: Object,
      required: true
    },
    scale: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss">
.template-sprite {
  background-color: #fff;
}
</style>

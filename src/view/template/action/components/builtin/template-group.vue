<template lang="pug">
  div.template-group(:style="wrapperStyle")
    component(
      v-for="(component) in data" :key="component.key"
      :is="component.name"
      :label="component.props.label"
      :property="component.props.property"
      :position="component.props.position")
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'TemplateGroup',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const rect = reactive({ w: 0, h: 0, x: 0, y: 0 })

    /**
     * @type {{x: number;y: number}[]}
     */
    const position = props.data.map(item => item.props.position)

    rect.x = Math.min.apply(
      null,
      position.map(item => item.x)
    )

    rect.y = Math.max.apply(
      null,
      position.map(item => item.y)
    )

    return { rect }
  },
  computed: {
    wrapperStyle() {
      return {
        width: this.rect.w + 'px',
        height: this.rect.h + 'px',
        left: this.rect.x + 'px',
        top: this.rect.y + 'px'
      }
    }
  }
}
</script>

<style lang="scss">
.template-group {
  position: relative;
}
</style>

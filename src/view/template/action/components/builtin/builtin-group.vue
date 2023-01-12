<template lang="pug">
  div.builtin-group(:style="wrapperStyle")
    component(
      v-for="(component) in children" :key="component.key"
      :is="component.name"
      :label="component.props.label"
      :size="component.props.size"
      :property="component.props.property"
      :position="component.props.position"
      group)
</template>

<script>
import { reactive } from 'vue'
import mixin from './mixins'
import BuiltinInput from './builtin-input.vue'

export default {
  name: 'BuiltinGroup',
  mixins: [mixin],
  components: {
    BuiltinInput
  },
  props: {
    children: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const rect = reactive({
      w: props.size.w,
      h: props.size.h
    })

    return { rect }
  },
  computed: {
    wrapperStyle() {
      return {
        position: 'relative',
        width: this.rect.w + 'px',
        height: this.rect.h + 'px'
      }
    },
    id() {
      return 'template-group-' + this._uid
    }
  }
}
</script>

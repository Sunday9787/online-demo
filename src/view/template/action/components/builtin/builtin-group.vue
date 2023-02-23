<template lang="pug">
  div.builtin-group(:style="groupStyle")
    component(
      v-for="(component) in children"
      v-bind="component.props"
      :children="component.children"
      :key="component.uid"
      :is="component.name"
      group)
</template>

<script>
import { reactive } from 'vue'
import mixin from './mixins'
import BuiltinInput from './builtin-input.vue'
import BuiltinSelect from './builtin-select.vue'

export default {
  name: 'BuiltinGroup',
  mixins: [mixin],
  components: {
    BuiltinInput,
    BuiltinSelect
  },
  props: {
    top: {
      type: Boolean,
      default: false
    },
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
    groupStyle() {
      const style = {
        width: this.rect.w + 'px',
        height: this.rect.h + 'px'
      }

      if (this.top) {
        style.position = 'reactive'
      } else {
        style.position = 'absolute'
        style.left = this.position.x + 'px'
        style.top = this.position.y + 'px'
      }

      return style
    }
  }
}
</script>

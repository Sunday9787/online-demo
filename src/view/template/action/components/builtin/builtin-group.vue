<template lang="pug">
  div.builtin-group(:style="wrapperStyle")
    component(
      v-for="(component) in children"
      v-bind="component.props"
      :key="component.key"
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
    }
  }
}
</script>

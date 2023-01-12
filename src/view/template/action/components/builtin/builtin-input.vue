<template lang="pug">
  div(v-if="isShape" :style="containerStyle")
    label(:for="id") {{ label }}
    div(:id="id" :style="propertyStyle" style="flex: 1")

  div(v-else :style="containerStyle")
    label(:for="id") {{ label }}
    el-input(v-model="form.value" :id="id" style="flex: 1")
</template>

<script>
import { reactive } from 'vue'
import mixin from './mixins'

export default {
  name: 'BuiltinInput',
  mixins: [mixin],
  props: {
    group: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const form = reactive({ value: '' })

    return { form }
  },
  computed: {
    containerStyle() {
      /**
       * @type {import('vue/types/jsx').StyleValue}
       */
      const style = {
        display: 'flex',
        color: this.property.color,
        fontFamily: this.property.font,
        lineHeight: this.size.h + 'px'
      }

      if (this.group) {
        style.position = 'absolute'
        style.left = this.position.x + 'px'
        style.top = this.position.y + 'px'
        style.width = this.size.w + 'px'
        style.height = this.size.h + 'px'
      }

      return style
    },
    propertyStyle() {
      return {
        borderBottom: this.property.underline && '1px solid #333'
      }
    },
    id() {
      return 'builtin-input-' + this._uid
    }
  }
}
</script>

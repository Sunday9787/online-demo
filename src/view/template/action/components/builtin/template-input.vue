<template lang="pug">
  div(v-if="isShape" :style="containerStyle")
    label(:for="id") {{ label }}
    div(:id="id" :style="propertyStyle")

  div(v-else :style="containerStyle")
    label(:for="id") {{ label }}
    el-input(v-model="form.value" :id="id")
</template>

<script>
import { reactive } from 'vue'
import mixin from './mixins'

export default {
  name: 'TemplateInput',
  mixins: [mixin],
  props: {
    label: {
      type: String,
      required: true
    },
    property: {
      type: Object,
      required: true
    },
    location: {
      type: Object,
      required: true
    }
  },
  setup() {
    const form = reactive({ value: '' })

    return { form }
  },
  computed: {
    containerStyle() {
      return {
        color: this.property.color,
        fontFamily: this.property.font
      }
    },
    propertyStyle() {
      return {
        borderBottom: this.property.underline ?? '1px solid #333'
      }
    },
    id() {
      return 'template-input-' + this._uid
    }
  }
}
</script>

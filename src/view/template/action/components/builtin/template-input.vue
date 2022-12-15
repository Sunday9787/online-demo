<template lang="pug">
  div(v-if="isShape" :style="containerStyle")
    label(:for="id") {{ label }}
    div(:id="id" :style="property")

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
    }
  },
  setup() {
    const form = reactive({ value: '' })

    return { form }
  },
  computed: {
    containerStyle() {
      return { color: this.property.color }
    },
    id() {
      return 'template-input-' + this._uid
    }
  }
}
</script>

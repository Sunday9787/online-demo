<template lang="pug">
  div(v-if="isShape" :style="containerStyle")
    label(:for="id") {{ label }}
    div(:id="id" :style="valueStyle" style="flex: 1")

  div(v-else :style="containerStyle")
    label(:for="id") {{ label }}
    el-select(v-model="formValue" :id="id" style="flex: 1")
      el-option(v-for="(item) of options" :key="item.key" :value="item.value" :label="item.label")
</template>

<script>
import mixin from './mixins'

export default {
  name: 'BuiltinSelect',
  mixins: [mixin],
  props: {
    value: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  }
}
</script>

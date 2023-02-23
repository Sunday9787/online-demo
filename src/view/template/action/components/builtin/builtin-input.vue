<template lang="pug">
  div(v-if="isShape" :style="containerStyle")
    label(:for="id") {{ label }}
    div(:id="id" :style="valueStyle" style="flex: 1")

  div(v-else :style="containerStyle")
    label(:for="id") {{ label }}
    el-input(v-model="formValue" :id="id" style="flex: 1")
</template>

<script>
import mixin from './mixins'

export default {
  name: 'BuiltinInput',
  mixins: [mixin],
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>

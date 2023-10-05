<template lang="pug">
  div.spec-group
    slot
</template>

<script>
export default {
  name: 'SpecGroup',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  provide() {
    return {
      rootGroup: this
    }
  },
  data() {
    return {
      current: null
    }
  },
  created() {
    this.current = this.value
  },
  watch: {
    value(val) {
      this.current = val
      this.$emit('input', val)
    },
    current(val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
.spec-group {
  display: flex;
  column-gap: 8px;
}
</style>

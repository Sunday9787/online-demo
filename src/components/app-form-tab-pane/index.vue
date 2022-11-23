<template>
  <div class="app-form-tab-pane" v-show="active"><slot /></div>
</template>

<script>
export default {
  name: 'app-form-tab-pane',
  inject: ['rootTabs'],
  props: {
    disabled: Boolean,
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    active() {
      return this.rootTabs.currentName === this.name
    }
  }
}
</script>

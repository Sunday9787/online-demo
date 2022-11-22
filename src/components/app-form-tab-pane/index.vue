<template>
  <div class="app-form-tab-pane"><slot /></div>
</template>

<script>
export default {
  name: 'app-form-tab-pane',
  inject: ['rootTabs'],
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  mounted() {
    console.log(this)
  }
}
</script>

<template>
  <h1>math-construct {{ progress }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'shape-math-construct',
  props: {
    progress: {
      type: Number,
      required: true
    }
  }
})
</script>

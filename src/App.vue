<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  created() {
    const theme = localStorage.getItem('online_access_theme') || 'light'
    this.updateTheme(theme)
  },
  methods: {
    ...mapMutations('appModule', ['updateTheme'])
  }
}
</script>

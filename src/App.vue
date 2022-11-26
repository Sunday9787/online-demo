<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { usePreferredColorScheme } from '@vueuse/core'
import { useStore } from './hooks/useStore'

export default {
  name: 'App',
  setup() {
    const preferredColor = usePreferredColorScheme()
    const store = useStore('appModule')
    store.commit('updateTheme', preferredColor.value)
  }
}
</script>

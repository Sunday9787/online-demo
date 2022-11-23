<template>
  <app-patient>
    <h1>当前主题 {{ theme }}</h1>
  </app-patient>
</template>

<script>
import { useStore } from '@/hooks/useStore'

export default {
  name: 'ConsultationIndex',
  setup() {
    const store = useStore('appModule')
    const theme = store.state.theme

    return {
      theme
    }
  }
}
</script>

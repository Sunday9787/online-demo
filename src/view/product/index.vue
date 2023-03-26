<template>
  <div>
    <app-card>
      <h1>Organization</h1>
      <h1>当前主题 {{ theme }}</h1>
      <p>{{ currentMechanism.mechanismName }}</p>
    </app-card>

    <app-card flex1>
      <router-link to="buy/1">
        <el-button type="primary">购买</el-button>
      </router-link>
    </app-card>
  </div>
</template>

<script>
import { computed } from 'vue'
import { mapGetters } from 'vuex'
import { useStore } from '@/hooks/useStore'

export default {
  name: 'ProductIndex',
  setup() {
    const store = useStore('appModule')
    const theme = computed(() => store.state.theme)

    return {
      theme
    }
  },
  data() {
    return {
      form: {
        mechanismId: null
      }
    }
  },
  computed: {
    ...mapGetters('appModule', ['currentMechanism'])
  }
}
</script>

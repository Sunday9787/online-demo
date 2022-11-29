<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { watch } from 'vue'
import { usePreferredColorScheme } from '@vueuse/core'
import { useRoute } from 'vue-router/composables'
import { useStore } from './hooks/useStore'

/**
 * @type {ReadonlyArray<string>}
 */
const themeWhiteList = ['/login']

export default {
  name: 'App',
  setup() {
    const preferredColor = usePreferredColorScheme()
    const store = useStore('appModule')
    const route = useRoute()

    const unWatch = watch(
      () => route.path,
      function () {
        if (store.state.theme.manual) {
          store.commit('updateTheme', {
            manual: false,
            model: store.state.theme.model
          })

          unWatch()
          return
        }

        const model = themeWhiteList.indexOf(route.path) < 0 ? preferredColor.value : 'light'

        store.commit('updateTheme', {
          manual: false,
          model
        })

        unWatch()
      }
    )
  }
}
</script>

<style lang="scss">
#app {
  overflow: hidden;
}

@media screen and (max-width: 1440px) {
  #app {
    width: 1440px;
  }
}
</style>

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import appModule from './module/app'
import userModule from './module/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: import.meta.env.DEV,
  modules: { appModule, userModule },
  plugins: [
    createPersistedState({
      key: 'online_access',
      paths: ['appModule.organization', 'appModule.theme'],
      storage: localStorage
    })
  ]
})

/**
 * @param {string} permission
 * @returns {boolean}
 */
export function hasPermission(permission) {
  const power = store.state.userModule.power

  return power[permission]
}

export default store

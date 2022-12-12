import Vuex from 'vuex'
import globalModule from './modules/global'

export default new Vuex.Store({
  devtools: true,
  modules: {
    globalModule
  }
})

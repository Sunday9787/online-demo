import Vue from 'vue'
import ElementUI from 'element-ui'

import store from './store'
import router from './router'
import App from './App.vue'

import Components from './components'

import './router/permission'
import './style/index.scss'

Vue.use(ElementUI)
Vue.use(Components)

// eslint-disable-next-line no-new
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

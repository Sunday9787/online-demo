import Vue from 'vue'
import ElementUI from 'element-ui'

import './router/permission'
import './style/index.scss'

import store from './store'
import router from './router'
import App from './App.vue'

import Mixin from './mixins'
import Components from './components'
import Directive from './directive'

Vue.use(ElementUI)
Vue.use(Mixin)
Vue.use(Components)
Vue.use(Directive)

// eslint-disable-next-line no-new
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'virtual:svg-icons-register'

import './router/permission'
import './styles/index.scss'

import store from './store'
import router from './router'
import App from './App.vue'

import Mixin from './mixins'
import Components from './components'
import Directive from './directives'

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

import Vue from 'vue'
import Router from 'vue-router'

import dashboardRoute from './module/dashboardRoute'
import organizationRoute from './module/organizationRoute'
import consultationRoute from './module/consultationRoute'
import userRoute from './module/userRoute'
import templateRoute from './module/templateRoute'
import productRoute from './module/productRoute'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    dashboardRoute,
    organizationRoute,
    consultationRoute,
    userRoute,
    templateRoute,
    productRoute,
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
    },
    {
      path: '/',
      name: 'AppIndex',
      component: () => import(/* webpackChunkName: "index" */ '@/views/index.vue')
    }
  ]
})

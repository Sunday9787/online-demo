import Vue from 'vue'
import Router from 'vue-router'

import dashboardRoute from './module/dashboardRoute'
import organizationRoute from './module/organizationRoute'
import consultationRoute from './module/consultationRoute'
import userRoute from './module/userRoute'
import templateRoute from './module/templateRoute'
import productRoute from './module/productRoute'
import threeRoute from './module/threeRoute'

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
    ...threeRoute,
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/view/login/index.vue')
    },
    {
      path: '/',
      name: 'AppIndex',
      component: () => import('@/view/index.vue')
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'

import dashboardRoute from './module/dashboardRoute'
import organizationRoute from './module/organizationRoute'
import userRoute from './module/userRoute'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/view/login/index.vue')
    },
    dashboardRoute,
    organizationRoute,
    userRoute
  ]
})

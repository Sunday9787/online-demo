import Vue from 'vue'
import Router from 'vue-router'

import dashboardRoute from './module/dashboardRoute'
import organizationRoute from './module/organizationRoute'
import consultationRoute from './module/consultationRoute'
import userRoute from './module/userRoute'
import templateRoute from './module/templateRoute'

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
    consultationRoute,
    userRoute,
    templateRoute
  ]
})

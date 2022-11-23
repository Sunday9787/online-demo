import Layout from '@/layout/index.vue'

/**
 * @type {import("vue-router").RouteConfig}
 */
const route = {
  path: '/dashboard',
  name: 'Dashboard',
  redirect: '/dashboard/index',
  meta: { title: '首页' },
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'DashboardIndex',
      meta: { activeMenu: '/dashboard/index' },
      component: () => import(/* webpackChunkName: "dashboard" */ '@/view/dashboard/index.vue')
    }
  ]
}

export default route

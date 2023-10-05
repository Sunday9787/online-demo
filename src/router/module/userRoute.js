import Layout from '@/layout/index.vue'

/**
 * @type {import("vue-router").RouteConfig}
 */
const route = {
  path: '/user',
  name: 'User',
  redirect: '/user/index',
  meta: { title: '用户' },
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'UserIndex',
      meta: { activeMenu: '/user/index' },
      component: () => import(/* webpackChunkName: "user" */ '@/views/user/index.vue')
    }
  ]
}

export default route

import Layout from '@/layout/index.vue'

/**
 * @type {import("vue-router").RouteConfig}
 */
const route = {
  path: '/organization',
  name: 'Organization',
  redirect: '/organization/index',
  meta: { title: '机构' },
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'OrganizationIndex',
      meta: { activeMenu: '/organization/index' },
      component: () => import(/* webpackChunkName: "organization" */ '@/views/organization/index.vue')
    }
  ]
}

export default route

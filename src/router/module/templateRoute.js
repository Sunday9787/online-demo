import Layout from '@/layout/page-view.vue'

/**
 * @type {import("vue-router").RouteConfig}
 */
const route = {
  path: '/template',
  name: 'Template',
  redirect: '/template/action',
  meta: { hidden: true },
  component: Layout,
  children: [
    {
      path: 'action',
      props: route => ({ type: route.query.type }),
      component: () => import(/* webpackChunkName: "template" */ '@/views/template/action/index.vue')
    }
  ]
}

export default route

import Layout from '@/layout/page-view.vue'

/**
 * @type {import("vue-router").RouteConfig}
 */
const route = {
  path: '/graphic',
  name: 'Graphic',
  redirect: '/graphic/action',
  meta: { hidden: true },
  component: Layout,
  children: [
    {
      path: 'action',
      props: route => ({ type: route.query.type }),
      component: () => import('@/view/graphic/index.vue')
    }
  ]
}

export default route

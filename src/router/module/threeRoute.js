import Layout from '@/layout/page-view.vue'

/**
 * @type {import("vue-router").RouteConfig}
 */
const route = {
  path: '/three',
  name: 'Three',
  redirect: '/three/action',
  meta: { hidden: true },
  component: Layout,
  children: [
    {
      path: 'action',
      props: route => ({ type: route.query.type }),
      component: () => import('@/view/three/index.vue')
    }
  ]
}

export default route

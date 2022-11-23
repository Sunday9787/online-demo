import Layout from '@/layout/index.vue'

/**
 * @type {import("vue-router").RouteConfig}
 */
const route = {
  path: '/consultation',
  name: 'Consultation',
  redirect: '/consultation/index',
  meta: { title: '会诊' },
  component: Layout,
  props: {
    offset: false
  },
  children: [
    {
      path: 'index',
      name: 'ConsultationIndex',
      meta: { activeMenu: '/consultation/index' },
      component: () => import(/* webpackChunkName: "consultation" */ '@/view/consultation/index.vue')
    }
  ]
}

export default route

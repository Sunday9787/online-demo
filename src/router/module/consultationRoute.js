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
    offset: ['12px', '16px']
  },
  children: [
    {
      path: 'index',
      name: 'ConsultationIndex',
      meta: { activeMenu: '/consultation/index' },
      component: () => import(/* webpackChunkName: "consultation" */ '@/views/consultation/index.vue')
    }
  ]
}

export default route

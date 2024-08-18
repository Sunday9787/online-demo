import Layout from '@/layout/index.vue'

/**
 * @type {import("vue-router").RouteConfig[]}
 */
const route = [
  {
    path: '/canvas/sem',
    name: 'CanvasSem',
    component: () => import('@/views/canvas/sem/index.vue')
  },
  {
    path: '/canvas',
    name: 'Canvas',
    redirect: '/canvas/index',
    meta: { title: 'Canvas' },
    component: Layout,
    props: {
      offset: ['12px', '16px']
    },
    children: [
      {
        path: 'index',
        name: 'CanvasIndex',
        meta: { activeMenu: '/canvas/index' },
        component: () => import(/* webpackChunkName: "canvas" */ '@/views/canvas/index.vue')
      }
    ]
  }
]

export default route

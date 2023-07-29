import Layout from '@/layout/index.vue'

/**
 * @type {import("vue-router").RouteConfig[]}
 */
const route = [
  {
    path: '/three/game',
    name: 'ThreeGame',
    component: () => import('@/view/three/game/index.vue')
  },
  {
    path: '/three/map',
    name: 'ThreeMap',
    component: () => import('@/view/three/map/index.vue')
  },
  {
    path: '/three',
    name: 'Three',
    redirect: '/three/index',
    meta: { title: 'three' },
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ThreeList',
        meta: { activeMenu: '/three/index' },
        component: () => import('@/view/three/index.vue')
      }
    ]
  }
]

export default route

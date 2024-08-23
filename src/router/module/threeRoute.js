import Layout from '@/layout/index.vue'

/**
 * @type {import("vue-router").RouteConfig[]}
 */
const route = [
  {
    path: '/three/game',
    name: 'ThreeGame',
    component: () => import('@/views/three/game/index.vue')
  },
  {
    path: '/three/map',
    name: 'ThreeMap',
    component: () => import('@/views/three/map/index.vue')
  },
  {
    path: '/three/dragon',
    name: 'ThreeDragon',
    component: () => import('@/views/three/dragon/index.vue')
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
        component: () => import('@/views/three/index.vue')
      }
    ]
  }
]

export default route

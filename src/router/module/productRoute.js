import Layout from '@/layout/index.vue'

/**
 * @type {import("vue-router").RouteConfig}
 */
const route = {
  path: '/product',
  name: 'Product',
  redirect: '/product/index',
  meta: { title: '产品' },
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'ProductIndex',
      meta: { activeMenu: '/product/index' },
      component: () => import(/* webpackChunkName: "product" */ '@/view/product/index.vue')
    },
    {
      path: 'buy/:id(\\d+)',
      name: 'ProductBuy',
      props: route => ({ id: Number(route.params.id) }),
      component: () => import(/* webpackChunkName: "productBuy" */ '@/view/product/buy/index.vue')
    }
  ]
}

export default route

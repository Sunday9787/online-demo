import router from '.'
import store from '@/store'
import NP from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login']

router.beforeEach(async (to, form, next) => {
  NP.start()

  if (whiteList.indexOf(to.path) > -1) {
    next()
  } else {
    if (!store.state.appModule.dispatchedTransInOrgList) {
      try {
        await store.dispatch('appModule/getTransInOrgList')
      } catch (error) {
        console.error(error)
        next('/login')
      }
    }

    next()
  }
})

router.afterEach((to, from) => {
  NP.done()
})

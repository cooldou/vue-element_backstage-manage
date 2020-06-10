import Vue from 'vue'
import Router from 'vue-router'
import {
  getSession
} from '@/modules/authentication'
import route from './routes'

Vue.use(Router)

const router = new Router({
  routes: route
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next({
      name: 'dashboard'
    })
  } else {
    next()
  }
  // if (to.matched.some(m => m.meta.authRequired)) {
  //   const session = getSession()
  //   if (session && session.token) {
  //     if (to.path === '/') {
  //       next({
  //         name: 'dashboard'
  //       })
  //     } else {
  //       next()
  //     }
  //   } else {
  //     next({
  //       name: 'signin',
  //       query: {
  //         redirectTo: to.fullPath
  //       }
  //     })
  //   }
  // } else {
  //   next()
  // }
})

export default router

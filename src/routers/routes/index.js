import dashboard from './dashboard'
import study from './study'

export default [
  {
    path: '/signin',
    name: 'signin',
    component: require('@/pages/signin').default
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: require('@/pages/Layout').default,
    meta: {
      authRequired: true
    },
    children: [
      dashboard,
      study,
      {
        path: 'account',
        name: 'account',
        component: require('@/pages/Account').default
      },
      {
        path: '*',
        name: '404',
        component: require('@/pages/Developing').default
      }
    ]
  }
]

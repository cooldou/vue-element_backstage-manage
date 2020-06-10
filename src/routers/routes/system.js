export default {
  path: '/system',
  name: 'system',
  redirect: '/system/system-role',
  component: {
    render(c) {
      return c('router-view')
    }
  },
  children: [
    {
      path: 'system-role',
      name: 'system-role',
      component: require('@/pages/system/system-role/SystemRole').default
    },
    {
      path: 'system-user',
      name: 'system-user',
      component: require('@/pages/system/system-user/SystemUser').default
    }
  ]
}

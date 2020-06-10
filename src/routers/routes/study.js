export default {
  path: '/study',
  name: 'study',
  redirect: 'study/online',
  component: {
    render(c) {
      return c('router-view')
    }
  },
  children: [{
      path: 'online',
      name: 'online',
      components: require('@/pages/learn-materials/Online')
    },
    {
      path: 'offline',
      name: 'offline',
      components: require('@/pages/learn-materials/Offline')
    },
    {
      path: 'contribute',
      name: 'contribute',
      components: require('@/pages/learn-materials/Contribute')
    },
  ]
}
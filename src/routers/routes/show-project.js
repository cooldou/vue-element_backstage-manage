export default {
  path: '/show-project',
  name: 'project',
  redirect: 'show-project/list',
  component: {
    render(c) {
      return c('router-view')
    }
  },
  children: [{
      path: 'list',
      name: 'list',
      components: require('@/pages/show-project/ShowProject')
    },
    {
      path: 'classify',
      name: 'classify',
      components: require('@/pages/show-project/ProjectClassify')
    }
  ]
}
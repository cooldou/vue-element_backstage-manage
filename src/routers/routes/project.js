export default {
  path: '/project',
  name: 'project',
  redirect: 'project/list',
  component: {
    render(c) {
      return c('router-view')
    }
  },
  children: [{
      path: 'list',
      name: 'list',
      components: require('@/pages/project-management/ProjectList')
    },
    {
      path: 'classify',
      name: 'classify',
      components: require('@/pages/project-management/ProjectClassify')
    },
    {
      path: 'maintain',
      name: 'maintain',
      components: require('@/pages/project-management/ProjectMaintain')
    },
  ]
}
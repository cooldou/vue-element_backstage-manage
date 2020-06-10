export default {
  path: 'basic-system',
  redirect: 'basic-system/compony-label',
  component: {
    render(c) {
      return c('router-view')
    }
  },
  children: [
    {
      path: 'compony-label',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '',
          name: 'compony-label',
          component: require('@/pages/basic-system/componyLabel/index').default,
          meta: {
            primaryNavPath: '/basic-system/compony-label'
          }
        },
      ]
    },
    {
      path: 'label-field',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '',
          name: 'label-field',
          component: require('@/pages/basic-system/field-management').default,
          meta: {
            primaryNavPath: '/basic-system/label-field'
          }
        },
      ]
    },
    {
      path: 'certificate-field',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '',
          name: 'certificate-field',
          component: require('@/pages/basic-system/field-management').default,
          meta: {
            primaryNavPath: '/basic-system/certificate-field'
          },
          props: {fieldType: '证书'}
        },
      ]
    },
    {
      path: 'certificate',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '',
          name: 'certificate',
          component: require('@/pages/basic-system/certificate').default,
          meta: {
            primaryNavPath: '/basic-system/certificate'
          }
        },
      ]
    },
    {
      path: 'industry',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '',
          name: 'industry',
          component: require('@/pages/basic-system/industry').default,
          meta: {
            primaryNavPath: '/basic-system/industry'
          }
        },
      ]
    },
    {
      path: 'MSDS',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '',
          name: 'MSDS',
          component: require('@/pages/basic-system/MSDS/MSDS').default,
          meta: {
            primaryNavPath: '/basic-system/MSDS'
          }
        },
        {
          path: 'form',
          name: 'form',
          component: require('@/pages/basic-system/MSDS/MSDSForm').default,
          meta: {
            primaryNavPath: '/basic-system/MSDS'
          }
        },
      ]
    },
    {
      path: 'chemistry-technology',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '',
          name: 'chemistry-technology',
          component: require('@/pages/basic-system/chemistry-technology/index').default,
          meta: {
            primaryNavPath: '/basic-system/chemistry-technology'
          }
        },
        {
          path: 'form',
          name: 'chemistry-technology-form',
          component: require('@/pages/basic-system/chemistry-technology/chemistryTechnologyForm').default,
          meta: {
            primaryNavPath: '/basic-system/chemistry-technology'
          }
        },
      ]
    },
    {
      path: 'risk-identification',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '',
          name: 'risk-identification',
          component: require('@/pages/basic-system/risk-identification/index').default,
          meta: {
            primaryNavPath: '/basic-system/risk-identification'
          }
        },
        {
          path: 'three-risk/:id',
          name: 'three-risk',
          component: require('@/pages/basic-system/risk-identification/three-risk').default,
          meta: {
            primaryNavPath: '/basic-system/risk-identification'
          }
        },
        {
          path: 'three-risk-many/:id',
          name: 'three-risk-many',
          component: require('@/pages/basic-system/risk-identification/three-risk-many').default,
          meta: {
            primaryNavPath: '/basic-system/risk-identification'
          }
        },
        {
          path: 'three-risk-form',
          name: 'three-risk-form',
          component: require('@/pages/basic-system/risk-identification/three-risk-form').default,
          meta: {
            primaryNavPath: '/basic-system/risk-identification'
          }
        },
        {
          path: 'three-risk-form/batch',
          name: 'three-risk-form/batch',
          component: require('@/pages/basic-system/risk-identification/batch/single-batch').default,
          meta: {
            primaryNavPath: '/basic-system/risk-identification'
          }
        },
        {
          path: 'three-risk-form-many',
          name: 'three-risk-form-many',
          component: require('@/pages/basic-system/risk-identification/three-risk-form-many').default,
          meta: {
            primaryNavPath: '/basic-system/risk-identification'
          }
        },
        {
          path: 'three-risk-form-many/batch',
          name: 'three-risk-form-many/batch',
          component: require('@/pages/basic-system/risk-identification/batch/many-batch').default,
          meta: {
            primaryNavPath: '/basic-system/risk-identification'
          }
        }
      ]
    },
    {
      path: 'laws',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '',
          name: 'laws',
          component: require('@/pages/basic-system/laws/index').default,
          meta: {
            primaryNavPath: '/basic-system/laws'
          }
        },
        {
          path: 'form',
          name: 'laws-form',
          component: require('@/pages/basic-system/laws/laws-form').default,
          meta: {
            primaryNavPath: '/basic-system/laws'
          }
        },
      ]
    },
    {
      path: 'main-listing',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '',
          name: 'main-listing',
          component: require('@/pages/basic-system/main-listing').default,
          meta: {
            primaryNavPath: '/basic-system/main-listing'
          }
        },
      ]
    },
    {
      path: 'three-risk-basic',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '',
          name: 'three-risk-basic',
          component: require('@/pages/basic-system/three-risk-basic/index').default,
          meta: {
            primaryNavPath: '/basic-system/three-risk-basic'
          }
        },
        {
          path: 'three-risk-basic/:id',
          name: 'three-risk-basic/:id',
          component: require('@/pages/basic-system/three-risk-basic/risk-form').default,
          meta: {
            primaryNavPath: '/basic-system/three-risk-basic'
          }
        }
      ]
    },
    {
      path: 'meter-type',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '',
          name: 'meter-type',
          component: require('@/pages/basic-system/meter-type').default,
          meta: {
            primaryNavPath: '/basic-system/meter-type'
          }
        },
      ]
    }
  ]
}

import Vue from 'vue'
import Vuebar from 'vuebar'
import ElementUI from 'element-ui'
import VueResize from 'vue-resize'

import 'element-ui/lib/theme-chalk/index.css'
import 'vue-resize/dist/vue-resize.css'

import { upperFirst, camelCase, find } from 'lodash'
import { getSession } from '@/modules/authentication'

import dayjs from 'dayjs'

Vue.use(Vuebar)
Vue.use(ElementUI)
Vue.use(VueResize)

const requireComponent = require.context(
  './components/inputs',
  false,
  /[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )

  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})

Vue.prototype.$resolveRoutePath = function(path) {
  return `/${this.$route.meta.primaryNavPath}/${path}`
}

Vue.config.productionTip = false

Vue.prototype.dateDesc = function (data) {// 转时间戳
  return data ? dayjs(data).format('YYYY-MM-DD') : ''
}

Vue.prototype.dateTimeDesc = function (data) {// 转时间戳
  return data ? dayjs(data).format('YYYY-MM-DD HH:mm') : ''
}

Vue.prototype.validatePermission = function (power) {
  if (getSession() && getSession().user && getSession().user.menus) {
    const menus = getSession().user.menus
    const isButton = find(menus, {code: power})
    if (isButton) return true
  }
  return false
}

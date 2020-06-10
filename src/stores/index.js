import Vue from 'vue'
import Vuex from 'vuex'

import account from './modules/account'
import systemRole from './modules/system/system-role'
import systemUser from './modules/system/system-user'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    systemRole,
    systemUser,
    account
  }
})

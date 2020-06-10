import pick from 'lodash/pick'
import request from '@/modules/request'
import { getAPIBaseURL } from '@/modules/utils'
import storage from '@/modules/storage'
import axios from 'axios'

export default {
  namespaced: true,

  state: {
    model: {
      id: '',
      nickName: '',
      account: '',
      password: '',
      roleId: '',
      name: '',
      menus: [],
      isDisable: '',
      isSystem: '',
      modifyDate: '',
      createDate: ''
    }
  },

  mutations: {
    setAccount (state, data) {
      state.model = Object.assign(state.model, pick(data, Object.keys(state.model)))
    }
  },

  actions: {
    // async loadData({ commit }) {
    //   const result = await request.get('/api/v1/homePage/getUserInfo')
    //   commit('setAccount', result)
    // },

    async updatePassword({}, formData) {
      return await request.put('/api/v1/business-people/updatePassword', formData)
    },

    async getConfigPath ({}, params) {
      await axios.get(getAPIBaseURL() + '/getPath', {
        params: params
      }).then ((res) => {
        storage.set('configPath', res.data.data)
      })
    },
  }
}

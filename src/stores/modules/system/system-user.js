import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v1/sysPersion'
const list = listBase({ url: `${baseURL}/getSysUserList` })

export default merge(list, {
  namespaced: true,

  state: {
  },

  mutations: {
  },

  actions: {
    async create ({ dispatch }, formData) {
      const result = await request.post(`${baseURL}/addSysUser`, formData)
      dispatch('loadListData')
      return result
    },

    async update ({ dispatch }, formData) {
      const result = await request.put(`${baseURL}/updateSysUser`, formData)
      dispatch('loadListData')
      return result
    },

    async delete ({ dispatch }, id) {
      const result = await request.delete(`${baseURL}/deleteSysUser?userId=${id}`)
      dispatch('loadListData')
      return result
    }
  }
})

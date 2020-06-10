import merge from 'lodash/merge'
import request from '@/modules/request'
import listBase from '@/stores/list'

const baseURL = '/api/v1/role'
const list = listBase({ url: baseURL })

export default merge(list, {
  namespaced: true,

  state: {
    menuList: []
  },

  mutations: {
    setListData (state, data) {
      state.list.items = data
    },
    setMenuList (state, data) {
      if (data) state.menuList = data
    },
  },

  actions: {
    // 角色列表
    async loadListData ({commit}) {
      const result = await request.get(baseURL)
      commit('setListData', result)
    },
    // 获取菜单
    async loadMenuList ({commit}) {
      const result = await request.get(`${baseURL}/getMenuCode`)
      commit('setMenuList', result)
    },
    // 获取角色菜单
    async loadRoleMenu ({}, roleId) {
      return await request.get(`${baseURL}/getRoleCode`, {
        params: {
          sysRoleId: roleId
        }
      })
    },

    async addPower ({}, formData) {
      await request.post(`${baseURL}`, formData)
    },

    async create ({ dispatch }, formData) {
      const result = await request.post(`${baseURL}/addRole`, formData)
      dispatch('loadListData')
      return result
    },

    async update ({ dispatch }, formData) {
      const result = await request.put(`${baseURL}/updateRole?roleId=${formData.id}&name=${formData.name}`)
      dispatch('loadListData')
      return result
    },

    async deleteRole ({ dispatch }, id) {
      const result = await request.delete(`${baseURL}/deleteRole?roleId=${id}`)
      dispatch('loadListData')
      return result
    }
  }
})

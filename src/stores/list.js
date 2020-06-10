import cloneDeep from 'lodash/cloneDeep'
import request from '@/modules/request'

export default function ({
  url,
  params = {}
} = {}) {
  return {
    state: {
      list: {
        loading: false,
        total: 0,
        pageSize: 20,
        currentPage: 1,
        params: {},
        filterParams: {},
        items: []
      }
    },

    mutations: {
      setListParams(state, params = {}) {
        state.list.params = Object.assign({}, state.list.params, params)
      },

      setListFilterParams(state, params = {}) {
        state.list.filterParams = cloneDeep(params)
      },

      setListPageSize(state, pageSize) {
        state.list.pageSize = pageSize
      },

      listLoading(state) {
        state.list.loading = true
      },

      listLoaded(state) {
        state.list.loading = false
      },

      setListData(state, { total, currentPage, items }) {
        state.list = Object.assign({}, state.list, {
          total,
          currentPage,
          items
        })
      }
    },

    actions: {
      async loadListData({ state, commit }, { page = 1, reset = false } = {}) {
        commit('listLoading')
        if (reset) commit('setListFilterParams', {})
        const result = await request.get(url, {
          params: Object.assign({
            current: page,
            size: state.list.pageSize
          }, params, state.list.params, state.list.filterParams)
        })
        commit('listLoaded')
        commit('setListData', {
          total: result.total,
          currentPage: page,
          items: result.records
        })
      },

      async filterListData({ commit, dispatch }, filterParams = {}) {
        commit('setListFilterParams', filterParams)
        await dispatch('loadListData')
      }
    }
  }
}

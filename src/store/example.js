import api from '../api'

export default {
  namespaced: true,
  state: () => ({
    edited: {
      stringValue: ''
    },
    crudData: [],
    editedIndex: -1,
    count: 0,
    page: 1,
    pageItemsCount: 5
  }),
  mutations: {
    setData: (state, crudData) => {
      state.crudData = crudData
    },
    setCount: (state, count) => {
      state.count = count
    },
    refresh: (state) => {
      state.edited.stringValue = ''
      state.editedIndex = -1
    },
    startUpdate: (state, index) => {
      state.editedIndex = index
      state.edited = {...state.crudData[state.editedIndex]}
    },
    setPage: (state, page) => {
      const value = parseInt(page)
      state.page = value <= 0
        ? 1
        : value
    },
    setPageItemsCount: (state, pageItemsCount) => {
      const value = parseInt(pageItemsCount)
      state.pageItemsCount = value <= 0
        ? 1
        : value
    },
    clear: (state) => {
      state.crudData = [];
    }

  },
  actions: {
    read: async function({commit}) {
      let crudData = await api.example.read()
      if (!crudData) {
        crudData = []
      }
      let count = await api.example.count()
      if (!count) {
        count = 0
      }
      commit('setCount', count)
      commit('setData', crudData)
      commit('refresh')
    },
    readPage: async function({commit, state}) {
      commit('clear')
      let crudData = await api.example.readPage(state.page - 1, state.pageItemsCount)
      if (!crudData) {
        crudData = []
      }
      let count = await api.example.count()
      if (!count) {
        count = 0
      }
      commit('setCount', count)
      commit('setData', crudData)
      commit('refresh')
    },
    save: async function({state, dispatch}) {
      if (!state.edited.stringValue) {
        return
      }
      if(state.editedIndex === -1) {
        await api.example.create(state.edited)
      } else {
        const id = state.crudData[state.editedIndex]._id;
        await api.example.update(id, state.edited)
      }
      dispatch('readPage')
    },
    delete: async function({state, dispatch}, index) {
      const id = state.crudData[index]._id;
      await api.example.delete(id)
      dispatch('readPage')
    },
    generate: async function({dispatch}, count) {
      await api.example.generate(count)
      dispatch('readPage')
    },
    setPageItemsCount({commit, dispatch}, pageItemsCount) {
      commit('setPageItemsCount', pageItemsCount)
      commit('setPage', 1)
      dispatch('readPage')
    },
    setPage({commit, dispatch}, page) {
      commit('setPage', page)
      dispatch('readPage')
    }
  },
  getters: {
    edited: (state) => state.edited,
    columns: (state) => state.columns,
    crudData: (state) => state.crudData,
    count: (state) => state.count,
    page: (state) => state.page,
    pageItemsCount: (state) => state.pageItemsCount
  }
}
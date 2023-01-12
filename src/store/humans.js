import api from '../api'

export default {
  namespaced: true,
  state: () => ({
    edited: {
      name: '',
      age: 0
    },
    humans: [],
    editedIndex: -1,
    count: 0,
    page: 1,
    pageItemsCount: 5
  }),
  mutations: {
    setData: (state, humans) => {
      state.humans = humans
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
      state.edited = {...state.humans[state.editedIndex]}
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
      state.humans = [];
    }

  },
  actions: {
    read: async function({commit}) {
      let humans = await api.humans.read()
      if (!humans) {
        humans = []
      }
      let count = await api.humans.count()
      if (!count) {
        count = 0
      }
      commit('setCount', count)
      commit('setData', humans)
      commit('refresh')
    },
    readPage: async function({commit, state}) {
      commit('clear')
      let humans = await api.humans.readPage(state.page - 1, state.pageItemsCount)
      if (!humans) {
        humans = []
      }
      let count = await api.humans.count()
      if (!count) {
        count = 0
      }
      commit('setCount', count)
      commit('setData', humans)
      commit('refresh')
    },
    save: async function({state, dispatch}) {
      if (!state.edited.name || !state.edited.age) {
        return
      }
      if(state.editedIndex === -1) {
        await api.humans.create(state.edited)
      } else {
        const id = state.humans[state.editedIndex]._id;
        await api.humans.update(id, state.edited)
      }
      dispatch('readPage')
    },
    delete: async function({state, dispatch}, index) {
      const id = state.humans[index]._id;
      await api.humans.delete(id)
      dispatch('readPage')
    },
    generate: async function({dispatch}, count) {
      await api.humans.generate(count)
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
    humans: (state) => state.humans,
    count: (state) => state.count,
    page: (state) => state.page,
    pageItemsCount: (state) => state.pageItemsCount
  }
}
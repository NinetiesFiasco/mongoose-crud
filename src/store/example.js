import api from '../api'

export default {
  namespaced: true,
  state: () => ({
    edited: {
      stringValue: ''
    },
    crudData: [],
    editedIndex: -1
  }),
  mutations: {
    setData: (state, crudData) => {
      state.crudData = crudData
    },
    refresh: (state) => {
      state.edited.stringValue = ''
      state.editedIndex = -1
    },
    startUpdate: (state, index) => {
      state.editedIndex = index
      state.edited = {...state.crudData[state.editedIndex]}
    }
  },
  actions: {
    read: async function({commit}) {
      let crudData = await api.example.read()
      if (!crudData) {
        crudData = []
      }
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
      dispatch('read')
    },
    delete: async function({state, dispatch}, index) {
      const id = state.crudData[index]._id;
      await api.example.delete(id)
      dispatch('read')
    }
  },
  getters: {
    edited: (state) => state.edited,
    columns: (state) => state.columns,
    crudData: (state) => state.crudData
  }
}
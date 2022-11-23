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
    create: (state) => {
      state.crudData.push({...state.edited})
    },
    startUpdate: (state, index) => {
      state.editedIndex = index
      state.edited = {...state.crudData[state.editedIndex]}
    },
    update: (state) => {
      state.crudData[state.editedIndex] = {...state.edited}
    },
    _delete: (state, index) => {
      state.crudData.splice(index, 1)
    },
  },
  actions: {
    read: async function({commit}) {
      const crudData = await api.example.read()
      commit('setData', crudData)
    },
    save: async function({state, commit, dispatch}) {
      if(state.editedIndex === -1) 
        await api.example.create(state.edited)
      else {
        const id = state.crudData[state.editedIndex]._id;
        await api.example.update(id, state.edited)
      }

      commit('refresh')
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
export default {
  namespaced: true,
  state: () => ({
    edited: {
      stringValue: ''
    },
    columns: ['head 1'],
    crudData: [
      {stringValue: 'data 1'},
      {stringValue: 'data 2'}
    ],
    editedIndex: -1
  }),
  mutations: {
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
    save: ({state, commit}) => {
      if(state.editedIndex === -1) 
        commit('create')
      else
        commit('update')

      commit('refresh')
    }
  },
  getters: {
    edited: (state) => state.edited,
    columns: (state) => state.columns,
    crudData: (state) => state.crudData
  }
}
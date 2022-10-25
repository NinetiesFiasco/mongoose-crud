import {createStore} from 'vuex'
import crud from './crud'

const store = createStore({
  modules: {
    crud
  }
})

export default store
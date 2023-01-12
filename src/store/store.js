import {createStore} from 'vuex'
import humans from './humans'

const store = createStore({
  modules: {
    humans
  }
})

export default store
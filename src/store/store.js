import {createStore} from 'vuex'
import example from './example'

const store = createStore({
  modules: {
    example
  }
})

export default store
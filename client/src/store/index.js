import Vue from 'vue'
import Vuex from 'vuex'
import value from './modules/value'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    value,
  },
})

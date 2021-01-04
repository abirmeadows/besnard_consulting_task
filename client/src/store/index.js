import Vue from 'vue'
import Vuex from 'vuex'
import value from './modules/value'
import principle from './modules/principle'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    value,
    principle,
  },
})

import axios from 'axios'

const state = {
  values: [],
  loader: {},
  errors: null,
}

const getters = {
  values: (state) => state.values,
}

const mutations = {
  setLoader(state, { key, val }) {
    state.loader[key] = val
    state.errors = null
  },
  loaded(state, val) {
    state.values = val
    state.loader.fetch = false
  },
  setErrors(state, val) {
    state.errors = val
  },
}

const actions = {
  async fetchAll({ commit }) {
    try {
      commit('setLoader', { key: 'fetch', val: true })

      const res = await axios.get('/api/value/all')

      commit('loaded', res.data)
    } catch (error) {
      commit('setErrors', {
        fetch: error.response.data,
      })
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

import axios from 'axios'

const state = {
  principles: [],
  loader: {},
  errors: null,
}

const getters = {
  principles: (state) => state.principles,
  loader: (state) => state.loader,
  errors: (state) => state.errors,
}

const mutations = {
  setLoader(state, { key, val }) {
    state.loader = {
      [key]: val,
    }
    state.errors = null
  },
  loaded(state, val) {
    state.principles = val
    state.loader.fetch = false
  },
  added(state, val) {
    state.principles = [val, ...state.principles]
    state.loader.add = false
  },
  updated(state, val) {
    let tempPrinciples = [...state.principles]

    const index = tempPrinciples.findIndex(
      (principle) => principle.uuid === val.uuid
    )

    tempPrinciples[index].body = val.body
    tempPrinciples[index].updatedAt = val.updatedAt

    state.principles = tempPrinciples

    state.loader.update = false
  },
  destroyed(state, val) {
    state.principles = [...state.principles].filter(
      (principle) => principle.uuid !== val
    )
    state.loader.destroy = false
  },
  setErrors(state, val) {
    state.errors = val
    state.loader = {}
  },
  clearErrors(state) {
    state.errors = null
  },
}

const actions = {
  async fetchAll({ commit }) {
    try {
      commit('setLoader', { key: 'fetch', val: true })

      const res = await axios.get('/api/principle/all')

      commit('loaded', res.data)
    } catch (error) {
      commit('setErrors', {
        fetch: error.response.data,
      })
    }
  },
  async addOne({ commit }, args) {
    try {
      const { body, clearForm } = args

      commit('setLoader', { key: 'add', val: true })

      const res = await axios.post('/api/principle', { body })

      commit('added', res.data)

      clearForm()
    } catch (error) {
      commit('setErrors', {
        add: error.response.data,
      })
    }
  },
  async updateOne({ commit }, args) {
    try {
      const { body, uuid } = args

      commit('setLoader', { key: 'update', val: true })

      const res = await axios.put(`/api/principle/${uuid}`, { body })

      commit('updated', res.data)
    } catch (error) {
      commit('setErrors', {
        update: error.response.data,
      })
    }
  },
  async destroyOne({ commit }, args) {
    try {
      const { uuid } = args

      commit('setLoader', { key: 'destroy', val: true })

      await axios.delete(`/api/principle/${uuid}`)

      commit('destroyed', uuid)
    } catch (error) {
      commit('setErrors', {
        destroy: error.response.data,
      })
    }
  },
  clearErrors({ commit }) {
    commit('clearErrors')
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

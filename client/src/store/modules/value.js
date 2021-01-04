import axios from 'axios'

const state = {
  values: [],
  loader: {},
  errors: null,
}

const getters = {
  values: (state) => state.values,
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
    state.values = val
    state.loader.fetch = false
  },
  added(state, val) {
    state.values = [val, ...state.values]
    state.loader.add = false
  },
  updated(state, val) {
    let tempValues = [...state.values]

    const index = tempValues.findIndex((value) => value.uuid === val.uuid)

    tempValues[index].body = val.body
    tempValues[index].updatedAt = val.updatedAt

    state.values = tempValues

    state.loader.update = false
  },
  destroyed(state, val) {
    state.values = [...state.values].filter((value) => value.uuid !== val)
    state.loader.destroy = false
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
  async addOne({ commit }, args) {
    try {
      const { body, clearForm } = args

      commit('setLoader', { key: 'add', val: true })

      const res = await axios.post('/api/value', { body })

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

      const res = await axios.put(`/api/value/${uuid}`, { body })

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

      await axios.delete(`/api/value/${uuid}`)

      commit('destroyed', uuid)
    } catch (error) {
      commit('setErrors', {
        destroy: error.response.data,
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

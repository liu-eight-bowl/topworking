// vuex实例
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let store = new Vuex.Store({
  // state
  state: {
    isActived: false,
    name: '',
    password: ''
  },

  // getters
  getters: {
    getStatus (state) {
      return state.isActived
    }
  },
  // actions
  actions: {
    setStatusValue ({commit, state}, param) {
      commit('setStatus', param)
    },
    setUserValue ({commit, state}, user) {
      commit('setUser', user)
    }
  },
  // mutations
  mutations: {
    setStatus (state, param) {
      state.isActived = param
    },
    setUser (state, user) {
      state.name = user.name
      state.password = user.password
    }
  }
})

export default store

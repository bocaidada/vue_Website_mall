import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

let store = new vuex.Store({
  state: {
    isLogin: false,
    testApi: 'http://10.10.10.23:8800'
  },
  mutations: {
    // loginState (state) {
    //   state.isLogin = !state.isLogin
    // }
    loginState: state => state.isLogin = !state.isLogin
  },
  actions: {
    loginState ({ commit }) {
      commit('loginState')
    }
  }
})
export default store


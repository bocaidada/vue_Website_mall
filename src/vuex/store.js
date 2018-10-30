import Vue from 'vue'
import vuex from 'vuex'
import md5 from '../../static/js/md5.min'
Vue.use(vuex);

let store = new vuex.Store({
  state: {
    sign:'',
    token: '',
    sendHost: 'http://192.168.1.121:8080/v1/auth'
  },
  mutations: {
    loginState (state) {
      state.token = !state.token
    },
    // loginState: state => state.token = !state.token,
    // 存储登陆token
    userToken (state,params) {
      state.token = params;
      localStorage.setItem('token', JSON.stringify(params))
    },
    //生成签名
    createSign (state,params) {
      state.sign = '';
      let arr = [];
      for(let key in params){
        arr.push(key)
      }
      arr = arr.sort();
      arr.forEach(ele =>{
        state.sign += `${ele}=${params[ele]}&`
      });
      state.sign = md5(state.sign.slice(0,state.sign.length-1));
    }
  },
  actions: {
    loginState ({ commit }) {
      commit('loginState')
    },
    userToken ({ commit },params) {
      commit('userToken',params)
    },
    createSign ({ commit },params) {
      commit('createSign',params)
    }
  }
})
export default store


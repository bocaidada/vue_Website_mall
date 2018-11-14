import Vue from 'vue'
import vuex from 'vuex'
import md5 from '../../static/js/md5.min'
Vue.use(vuex);

let store = new vuex.Store({
  state: {
    isLogin: false,     //登陆页面控制
    headNum:'0',
    sign:'',           //接口参数签名
    token: '',         //登陆token
    sendHost: 'http://api.jkmy.com/v1/'  //服务器地址
  },
  mutations: {
    loginState (state) {
      state.isLogin = !state.isLogin
    },
    // loginState: state => state.token = !state.token,
    // 存储登陆token
    userToken (state,params) {
      state.token = params;
      localStorage.setItem('token', JSON.stringify(params))
    },
    // 导航信息
    headNum (state,params) {
      state.headNum = params;
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


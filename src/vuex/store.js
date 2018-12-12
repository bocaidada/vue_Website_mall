import Vue from 'vue'
import vuex from 'vuex'
import md5 from '../../static/js/md5.min'
Vue.use(vuex);

let store = new vuex.Store({
  state: {
    method:'POST',
    headColorNum:0,      //头部全局控制高亮
    hT:'',
    tabNum: 0,           //产品风格切换
    fromSource: 1,       //下单类型  1：购物车，2：直接购买 3:门店下单
    orderType: 2,        //订单类型  1:门店订单,2:个人订单
    isLogin: false,     //登陆页面控制
    footerFlag: false,     //底部控制
    productFlag:true,
    caseFlag:true,
    storeFlag:true,
    orderFlag:true,
    regState:true,
    headNum:'0',
    sign:'',           //接口参数签名
    token: '',         //登陆token
    // sendHost: 'http://api.jkmy.com/v1',  //本地服务器地址
    sendHost: 'http://t-api.jinkaidoor.com/v1',  //测试服务器地址
    // sendHost: 'http://api.jinkaidoor.com/v1',  //正式服务器地址
    qiNiuServer:'http://pifi5lc1c.bkt.clouddn.com/web' //七牛云服务器
  },
  mutations: {
    loginState (state,params) {
      state.isLogin = !state.isLogin
      state.regState = params
    },
    method: (state,params) => state.method = params,
    headColorNum: (state,params) => state.headColorNum = params,
    fromSource: (state,params) => state.fromSource = params,
    orderType: (state,params) => state.orderType = params,
    caseFlag: (state,params) => state.caseFlag = params,
    orderFlag: (state,params) => state.orderFlag = params,
    productFlag: (state,params) => state.productFlag = params,
    storeFlag: (state,params) => state.storeFlag = params,
    footerFlag: (state,params) => state.footerFlag = params,
    headNum: (state,params) => state.headNum = params,
    tabNum: (state,params) => state.tabNum = params,
    // 存储登陆token
    userToken (state,params) {
      if(params === '') {
        state.token = '';
        localStorage.removeItem('token');
      }else{
        state.token = params;
        localStorage.setItem('token', params)
      }
    },
    //生成签名
    createSign (state,params) {
      state.hT = new Date().getTime().toString().substring(0,10)
      state.sign = '';
      if(params){
        let arr = [];
        for(let key in params){
          arr.push(key)
        }
        arr = arr.sort();
        arr.forEach(ele => {
          state.sign += `${ele}=${params[ele]}&`
        });
      }
      state.sign = md5(state.method+'&'+state.sign+state.hT);
    }
  },
  actions: {
    loginState ({ commit },params) {
      commit('loginState',params)
    },
    userToken ({ commit },params) {
      commit('userToken',params)
    },
    createSign ({ commit },params) {
      commit('createSign',params)
    },
    footerFlag ({ commit },params) {
      commit('footerFlag',params)
    },
    tabNum ({ commit },params) {
      commit('tabNum',params)
    },
    method ({ commit }) {
      commit('method')
    },
    caseFlag ({ commit },params) {
      commit('caseFlag',params)
    },
    productFlag ({ commit },params) {
      commit('productFlag',params)
    },
    fromSource ({ commit },params) {
      commit('fromSource',params)
    },
    orderType ({ commit },params) {
      commit('orderType',params)
    },
    storeFlag ({ commit },params) {
      commit('storeFlag',params)
    },
    orderFlag ({ commit },params) {
      commit('storeFlag',params)
    },
    headColorNum ({ commit },params) {
      commit('headColorNum',params)
    }
  }
})
export default store


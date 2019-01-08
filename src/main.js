// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './vuex/store'
import ElementUI from 'element-ui'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/index.css';
import index from './components/index'
import http from './request/http' // 导入api接口
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'vue-area-linkage/dist/index.css'; // v2 or higher
import VueAreaLinkage from 'vue-area-linkage'  //地区联动选择器
import 'swiper/dist/css/swiper.css'
let Base64 = require('js-base64').Base64

Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.use(VueAreaLinkage)
Vue.prototype.$http = http; // 将api挂载到vue的原型上
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { index },
  template: '<index/>'
})



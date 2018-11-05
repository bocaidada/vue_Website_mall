// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './vuex/store'
import ElementUI from 'element-ui'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/index.css';
import index from './components/index'
import api from './request/api' // 导入api接口
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'vue-area-linkage/dist/index.css'; // v2 or higher
import VueAreaLinkage from 'vue-area-linkage'  //地区联动选择器
import 'swiper/dist/css/swiper.css'
import VueAMap from 'vue-amap';   //高德地图
Vue.use(VueAMap)
Vue.use(VueAwesomeSwiper)
Vue.use(VueAreaLinkage)
Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.use(ElementUI)
Vue.config.productionTip = false

VueAMap.initAMapApiLoader({
  key: 'your amap key',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { index },
  template: '<index/>'
})

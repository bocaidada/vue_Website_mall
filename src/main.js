// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './vuex/store'
import ElementUI from 'element-ui'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/index.css';
import index from './components/index'
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { index },
  template: '<index/>'
})

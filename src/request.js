// 简单封装axios

import Vue from 'vue'
import axios from 'axios'


// 添加一个响应拦截器
axios.interceptors.response.use(function (res) {
  if (res.status !== 200) {
    Vue.prototype.$message({
      showClose: true,
      message: '响应失败',
      type: 'error'
    })
  } else if (res.data.code !== '0') {
    Vue.prototype.$message({
      showClose: true,
      message: res.data.msg,
      type: 'error'
    })
  } else if (res.data.code === '0') {
    // empty
  }
  return res
}, function () {
  // return Promise.reject(err)
  Vue.prototype.$message({
    showClose: true,
    message: '服务暂不可用',
    type: 'error'
  })
})



const Api = axios
export default Api

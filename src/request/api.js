import axios  from './request'; // 导入http中创建的axios实例
import qs  from 'qs';
import store from "../vuex/store"; // 根据需求是否导入qs模块
let base = store.state.sendHost;
// 登录模块
const api = {
  // 用户注册
  register (params) {
    return axios.post(`${base}/register`, JSON.stringify(params));
  },
  // 用户退出
  outLogin (params) {
    return axios.post(`${base}/logout`, qs.stringify(params));
  },
  // 用户登陆
  login (params) {
    return axios.post(`${base}/login`, qs.stringify(params));
  },
  // 职位列表
  list (params) {
    return axios.post(`${base}/recruit/list`, qs.stringify(params));
  },
  // 申请职位
  apply (params) {
    return axios.post(`${base}/recruit/apply`, params);
  },
  // 提交原材料
  sample (params) {
    return axios.post(`${base}/sample/material`, params);
  },
  // 获取手机短信验证码
  phone_code (params) {
    return axios.post(`${base}/auth/sms`, params);
  }
}
export default api;



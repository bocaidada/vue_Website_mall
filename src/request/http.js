import axios  from './request'; // 导入http中创建的axios实例
// import qs  from 'qs';
import store from "../vuex/store";
import md5 from "../../static/js/md5.min"; // 根据需求是否导入qs模块
let base = store.state.sendHost;
let hT = '';
let apiName = {
  // post
  register:'auth/register', // 用户注册
  logout:'auth/logout',        // 用户退出
  login:'auth/login',       // 用户登陆
  phone_code:'auth/sms',    // 获取手机短信验证码
  findpwd:'auth/findpwd',   // 找回密码
  resetpwd:'auth/resetpwd', // 重置密码
  sample:'sample/material', // 提交原材料
  apply:'recruit/apply',    // 申请职位
  carDelete:'cart/delete',    // 删除购物车条目
  carEdit:'cart/edit',    // 更新购物车条目数量
  carOrder:'cart/order',    // 购物车下单
  carAdd:'cart/add', // 加入购物车
  addressList:'user/address/list', // 收货地址列表
  addressAdd:'user/address/add', // 添加收货地址信息
  addressDelete:'user/address/delete', // 删除收货地址信息
  addressUpdate:'user/address/update', // 更新收货地址信息
  addressSelect:'user/address/select', // 设置默认地址
  orderList:'user/order/list', // 用户订单列表
  payList:'pay/list', // 待支付列表
  payCart:'pay/cart', // 购物车下单支付
  shopOrderPay:'shop/order/pay', // 门店订单发货按钮触发
  shopOrderStatus:'shop/order/status', // 门店订单收货按钮触发
  shopNearby:'shop/nearby', //附近门店
  shopApply:'shop/apply', //申请加入
  orderServiceCreate:'order/service/create', //创建订单售后信息
  orderServiceChatCreate:'order/service/chat/create', //创建订单售后工单消息
  orderServiceChatFinish:'order/service/chat/finish', //订单售后工单结单


  // get
  list:'recruit/list',      // 人才招聘列表
  index:'index',            // 获取首页数据
  goodsCatalog:'goods/catalog', // 商品分类
  goodsList:'goods/list', // 商品列表
  goodsInfo:'goods/info', // 商品详情
  caseList:'case/list', // 案例列表
  caseInfo:'case/info', // 案例详情
  newsAbout:'news/about', // 关于我们新闻列表
  newsList:'news/list', // 新闻动态列表
  newsInfo:'news/info', // 新闻详情
  carList:'cart/list', // 购物车列表
  goodsFreight:'goods/freight',    // 运费查询
  goodsTags:'goods/tags',    // 商品标签列表
  goodsList_by_tag:'goods/list_by_tag',    // 商品列表（根据商品标签筛选）
  goodsShowShop:'goods/show/shop',    // 是否展示门店按钮

  shopBanner:'shop/banner',    // 门店banner
  shopInfo:'shop/info',    // 门店信息
  shopGoodsCatalog:'shop/goods/catalog',    // 门店商品分类列表
  shopGoodsList:'shop/goods/list',    // 门店商品列表
  shopGoodsInfo:'shop/goods/info',    //  门店商品详情
  shopOrderList:'shop/order/list',    //   门店订单列表
  shopOrderInfo:'shop/order/info', // 门店订单详情
  userOrderInfo:'user/order/info', // 客户订单详情
  shopMap:'shop/map', //门店地图

  orderServiceInfo:'order/service/info', //获取售后订单商品详情
  serviceChatList:'order/service/chat/list', //获取订单售后工单记录
}
// 保证签名不一致
function  createSign(method,params) {
  hT = new Date().getTime().toString().substring(0,10)
  let sign = '';
  if(params){
    let arr = [];
    for(let key in params){
      arr.push(key)
    }
    arr = arr.sort();
    arr.forEach(ele => {
      //中文需要转码
      // sign += `${ele}=${encodeURIComponent(params[ele])}&`
      sign += `${ele}=${params[ele]}&`
    });
  }
  // console.log(method+'&'+sign+hT)
  // console.log(md5(method+'&'+sign+hT))
  return md5(method+'&'+sign+hT);
}
// 登录模块
const http = {
  post(api,params) {
    // store.commit('method','POST')
    // store.commit('createSign',params)
    return axios.post(`${base}/${apiName[api]}`,params,{headers:{hSign:createSign('POST',params),hT:hT}});
  },
  get(api,param) {
    // store.commit('method','GET')
    // store.commit('createSign',param)
    return axios.get(`${base}/${apiName[api]}`,{headers:{hSign:createSign('GET',param),hT:hT},params:param});
  }
}
export default http;



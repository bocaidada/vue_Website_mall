import Vue from 'vue'
import Router from 'vue-router'
// import home_page from '@/components/homePage/home_page'
// import product_style from '@/components/homePage/product_style'
// import online_store from '@/components/homePage/online_store'
// import about_us from '@/components/homePage/about_us'
// import login from '@/components/homePage/login'
// import store_manage from '@/components/homePage/store_manage'
// import store_info from '@/components/subPage/store_info'
// import product_detail from '@/components/subPage/product_detail'
// import pay_detail from '@/components/subPage/pay_detail'
// import receiver_address from '@/components/subPage/receiver_address'
// import aMap from '@/components/subPage/aMap'
// import shop_car from '@/components/homePage/shop_car'
// import store_custom from '@/components/homePage/store_custom'


//组件懒加载方式引入

const home_page = () => import('@/components/homePage/home_page');
const product_style = () => import('@/components/homePage/product_style');
const online_store = () => import ('@/components/homePage/online_store');
const about_us = () => import ('@/components/homePage/about_us');
const login = () => import ('@/components/homePage/login');
const store_manage = () => import ('@/components/homePage/store_manage');
const store_info = () => import ('@/components/subPage/store_info');
const product_detail = () => import ('@/components/subPage/product_detail');
const pay_detail = () => import ('@/components/subPage/pay_detail');
const receiver_address = () => import ('@/components/subPage/receiver_address');
// const aMap = () => import ('@/components/subPage/aMap');
const server = () => import ('@/components/subPage/server');
const purchase = () => import ('@/components/subPage/purchase');
const project_case = () => import ('@/components/subPage/project_case');
const detail_case = () => import ('@/components/subPage/detail_case');
const shop_car = () => import ('@/components/homePage/shop_car');
const store_custom = () => import ('@/components/homePage/store_custom');
const quality = () => import ('@/components/homePage/quality');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home_page',
      component: home_page,
      // redirect:'/home_page',  //路由重定向
      // children:[
      //   {
      //     path: 'product_style',
      //     name: 'product_style',
      //     component: product_style
      //   }
      // ]
    },
    {
      path: '/product_style',
      name: 'product_style',
      component: product_style
    },{
      path: '/quality',
      name: 'quality',
      component: quality,
      // children:[
      //   {
      //     path: 'store_manage',
      //     name: 'store_manage',
      //     component: store_manage
      //   }
      // ]
    },
    {
      path: '/online_store',
      name: 'online_store',
      component: online_store
    },{
      path: '/server',
      name: 'server',
      component: server
    },{
      path: '/purchase',
      name: 'purchase',
      component: purchase
    },{
      path: '/project_case',
      name: 'project_case',
      component: project_case,
      children: [
        {
          path: 'detail_case/:id',
          name: 'detail_case',
          component: detail_case
        }
      ]
    },
    {
      path: '/about_us',
      name: 'about_us',
      component: about_us
    },
    {
      path: '/shop_car',
      name: 'shop_car',
      component: shop_car
    },{
      path: '/store_custom',
      name: 'store_custom',
      component: store_custom
    },
    {
      path: '/product_detail',
      name: 'product_detail',
      component: product_detail
    },{
      path: '/pay_detail',
      name: 'pay_detail',
      component: pay_detail
    },{
      path: '/receiver_address',
      name: 'receiver_address',
      component: receiver_address
    },
    // {
    //   path: '/aMap',
    //   name: 'aMap',
    //   component: aMap
    // },
    {
      path: '/store_manage',
      name: 'store_manage',
      component: store_manage,
      children: [
        {
          path: 'info',
          name: 'store_info',
          component: store_info,
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path:'*',
      redirect: '/'
    },
  ]
})

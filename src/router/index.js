import Vue from 'vue'
import Router from 'vue-router'
import home_page from '@/components/homePage/home_page'
import product_style from '@/components/homePage/product_style'
import online_store from '@/components/homePage/online_store'
import about_us from '@/components/homePage/about_us'
import login from '@/components/homePage/login'
import store_manage from '@/components/homePage/store_manage'
import store_info from '@/components/subPage/store_info'
import product_detail from '@/components/subPage/product_detail'
import pay_detail from '@/components/subPage/pay_detail'
import receiver_address from '@/components/subPage/receiver_address'
import shop_car from '@/components/homePage/shop_car'

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
    },
    {
      path: '/online_store',
      name: 'online_store',
      component: online_store
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

import Vue from 'vue'
import Router from 'vue-router'
import home_page from '@/components/homePage/home_page'
import product_style from '@/components/homePage/product_style'
import online_store from '@/components/homePage/online_store'
import about_us from '@/components/homePage/about_us'
import login from '@/components/homePage/login'
import store_manage from '@/components/homePage/store_manage'
import store_info from '@/components/subPage/store_info'

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

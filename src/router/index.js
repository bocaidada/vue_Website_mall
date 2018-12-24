import Vue from 'vue'
import Router from 'vue-router'
//组件懒加载方式引入
const home_page = () => import('@/components/homePage/home_page');
const product = () => import('@/components/homePage/product');
const online_store = () => import ('@/components/homePage/online_store');
const about_us = () => import ('@/components/homePage/about_us');
const store_manage = () => import ('@/components/homePage/store_manage');
const product_detail = () => import ('@/components/subPage/product_detail');
const shop_product_detail = () => import ('@/components/subPage/shop_product_detail');
const pay_detail = () => import ('@/components/subPage/pay_detail');
const manage_pay_detail = () => import ('@/components/subPage/manage_pay_detail');
const receiver_address = () => import ('@/components/subPage/receiver_address');
const server = () => import ('@/components/subPage/server');
const purchase = () => import ('@/components/subPage/purchase');
const project_case = () => import ('@/components/subPage/project_case');
const detail_case = () => import ('@/components/subPage/detail_case');
const news_detail = () => import ('@/components/subPage/news_detail');
const oder_detail = () => import ('@/components/subPage/oder_detail');
const after_sale = () => import ('@/components/subPage/after_sale');
const after_sale_dispose = () => import ('@/components/subPage/after_sale_dispose');
const shop_car = () => import ('@/components/homePage/shop_car');
const store_custom = () => import ('@/components/homePage/store_custom');
const pay_success = () => import ('@/components/homePage/pay_success');
const quality = () => import ('@/components/homePage/quality');
const join_us = () => import ('@/components/homePage/join_us');
const news_list = () => import ('@/components/homePage/news_list');
const my_order = () => import ('@/components/homePage/my_order');
const offline_store = () => import ('@/components/homePage/offline_store');
const make = () => import ('@/components/homePage/make');

Vue.use(Router)

export default new Router({
  mode: 'history',   //去掉地址栏#（hash模式改为history模式）
  routes: [
    {
      path: '/',
      name: 'home_page',
      component: home_page,
      meta: {
        keepAlive: true,   //判断是否需要做页面缓存
        hedNum: 0          //页面刷新保持相应导航高亮
      }
    },
    {
      path: '/product',
      name: 'product',
      component: product,
      meta: {
        keepAlive: true,
        hedNum: 1
      }
    },
    {
      path: '/quality',
      name: 'quality',
      component: quality,
      meta: {
        keepAlive: true,
        hedNum: 3
      }
    },
    {
      path: '/make',
      name: 'make',
      component: make,
      meta: {
        keepAlive: true,
        hedNum: 3
      }
    },
    {
      path: '/pay_success/:id',
      name: 'pay_success',
      component: pay_success,
      meta: {
        keepAlive: false,
        hedNum: -1
      }
    },
    {
      path: '/my_order',
      name: 'my_order',
      component: my_order,
      meta: {
        keepAlive: false,
        hedNum: -5
      },
      children: [
        {
          path: 'oder_detail/:id',
          name: 'oder_detail',
          component: oder_detail,
          meta: {
            keepAlive: false,
            hedNum: -6
          }
        },{
          path: 'after_sale/:id',
          name: 'after_sale',
          component: after_sale,
          meta: {
            keepAlive: false,
            hedNum: -6
          }
        },{
          path: 'after_sale_dispose/:id',
          name: 'after_sale_dispose',
          component: after_sale_dispose,
          meta: {
            keepAlive: false,
            hedNum: -6
          }
        }
      ]
    },
    {
      path: '/online_store',
      name: 'online_store',
      component: online_store,
      meta: {
        keepAlive: true,
        hedNum: 2
      },
      children: [
        {
          path: 'product_detail/:id',
          name: 'product_detail',
          component: product_detail,
          meta: {
            keepAlive: false,
            hedNum: 2
          }
        }
     ]
    },
    {
      path: '/news_list',
      name: 'news_list',
      component: news_list,
      meta: {
        keepAlive: true,
        hedNum: -1
      },
      children: [
        {
          path: 'news_detail/:id',
          name: 'news_detail',
          component: news_detail,
          meta: {
            keepAlive: false,
            hedNum: -1
          }
        }
      ]
    },
    {
      path: '/server',
      name: 'server',
      component: server,
      meta: {
        keepAlive: true,
        hedNum: 3
      }
    },
    {
      path: '/offline_store',
      name: 'offline_store',
      component: offline_store,
      meta: {
        keepAlive: false,
        hedNum: 4
      }

    },
    {
      path: '/purchase',
      name: 'purchase',
      component: purchase,
      meta: {
        keepAlive: true,
        hedNum: 3
      }
    },
    {
      path: '/project_case',
      name: 'project_case',
      component: project_case,
      meta: {
        keepAlive: true,
        hedNum: 3
      },
      children: [
        {
          path: 'detail_case/:id',
          name: 'detail_case',
          component: detail_case,
          meta: {
            keepAlive: false,
            hedNum: 3
          }
        }
      ]
    },
    {
      path: '/about_us',
      name: 'about_us',
      component: about_us,
      meta: {
        keepAlive: true,
        hedNum: 6
      }
    },
    {
      path: '/join_us',
      name: 'join_us',
      component: join_us,
      meta: {
        keepAlive: true,
        hedNum: 5
      }
    },
    {
      path: '/shop_car',
      name: 'shop_car',
      component: shop_car,
      meta: {
        keepAlive: false,
        hedNum: -1
      }
    },
    {
      path: '/store_custom',
      name: 'store_custom',
      component: store_custom,
      meta: {
        keepAlive: false,
        hedNum: -1
      }
    },
    {
      path: '/pay_detail',
      name: 'pay_detail',
      component: pay_detail,
      meta: {
        keepAlive: false,
        hedNum: -1
      }
    },
    {
      path: '/manage_pay_detail',
      name: 'manage_pay_detail',
      component: manage_pay_detail,
      meta: {
        keepAlive: false,
        hedNum: -1
      }
    },
    {
      path: '/receiver_address',
      name: 'receiver_address',
      component: receiver_address,
      meta: {
        keepAlive: false,
        hedNum: -1
      }
    },
    {
      path: '/store_manage',
      name: 'store_manage',
      component: store_manage,
      meta: {
        keepAlive: false,
        hedNum: 4
      },
      children: [
        {
          path: 'shop_product_detail/:id',
          name: 'shop_product_detail',
          component: shop_product_detail,
          meta: {
            keepAlive: false,
            hedNum: -4
          }
        },{
          path: 'oder_detail/:id',
          name: 'oder_detail',
          component: oder_detail,
          meta: {
            keepAlive: false,
            hedNum: -4
          }
        },{
          path: 'after_sale/:id',
          name: 'after_sale',
          component: after_sale,
          meta: {
            keepAlive: false,
            hedNum: -4
          }
        },{
          path: 'after_sale_dispose/:id',
          name: 'after_sale_dispose',
          component: after_sale_dispose,
          meta: {
            keepAlive: false,
            hedNum: -4
          }
        }
      ]
    },
    {
      path:'/cn/zixun/baike/:id.html',       //百度搜录文章重定向接入
      redirect: '/news_list/news_detail/:id'
    },
    {
      path:'/cn/zixun/:id.html',       //百度搜录文章重定向接入
      redirect: '/news_list/news_detail/:id'
    },
    {
      path:'/html/cn/zixun/xinwen/:id.html',       //百度搜录文章重定向接入
      redirect: '/news_list/news_detail/:id'
    },
    {
      path:'/cn/zixun/',       //百度搜录文章重定向接入
      redirect: '/news_list'
    },
    {
      path:'/cn/chanpin/lukou',       //百度搜录文章重定向接入
      redirect: '/online_store'
    },{
      path:'/en/collection/guide',       //百度搜录文章重定向接入
      redirect: '/online_store'
    },
    {
      path:'/products_detail/productId=151.html',       //百度搜录文章重定向接入
      redirect: '/online_store'
    },
    {
      path:'/products_detail/&productId=262.html',       //百度搜录文章重定向接入
      redirect: '/online_store'
    },
    {
      path:'/cn/pinpai/',       //百度搜录文章重定向接入
      redirect: '/about_us'
    },
    {
      path:'/cn/lianxi/',       //百度搜录文章重定向接入
      redirect: '/about_us'
    },
    {
      path:'*',
      redirect: '/'
    }
  ]
})

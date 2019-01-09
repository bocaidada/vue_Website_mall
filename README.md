# houseofhello

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

##项目开发中问题详解

###去掉地址栏#问题
-改变路由模式，vue-cli中默认路由hash模式，要改为history，服务器要配置相关设置

###保持组件状态不随页面切换刷新
-在组件引入的地方使用keep-live
```
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"  ref="tree"/>
      </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"  ref="tree"/>

```

###签名重复问题
-初始做法是在state中设置全局变量sign，然后借口请求调用，问题是当网速慢的时候sign会被后面的借口重写从而导致签名错误，解决办法是把签名方法写成函数返回，调用接口的时候先调用sign函数
```
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
  return md5(method+'&'+sign+hT);
}
```
###整个项目完成初始打包速度很慢，解决方法如下
-组件按需加载
--废弃传统的import引入方式，改用函数引入方式
```
const make = () => import ('@/components/homePage/make');
```
-开启Gzip，后台同步配置
--安装compression-webpack-plugin插件（注意：直接安装运行可能会报错，这是需要指定低一点的版本）
```
npm install --save-dev compression-webpack-plugin
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

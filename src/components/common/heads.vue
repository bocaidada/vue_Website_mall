<template>
  <div>
    <header>
        <div class="mainTop" :class="{mainTopHit:navBarFixed}">
            <div class="main">
              <div class="fontStyle">
                <span>简</span>
                <span class="hit">|</span>
                <span>EN</span>
              </div>
              <div class="loginInfo">
                <span @click="login()">登陆</span>
                <span class="hit">|</span>
                <span>注册</span>
              </div>
            </div>
        </div>
        <div class="mainBot">
          <div class="main">
            <div class="logoImg">
              <router-link  to="/">
                <img src="../../../static/img/logo.png" alt="">
              </router-link>
            </div>
            <div class="navList">
              <ul>
                <li v-for="(item,index) in navList"  @click="change(index)">
                  <router-link class="listHref" :class="{ red:changeColor == index}" :to="item.path">{{item.name}}</router-link>
                  <ul v-if="item.children.length !== 0" class="list">
                    <li v-for="items in item.children">
                      <router-link :to="items.path">{{items.name}}</router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </header>
    <div class="hid" :class="{hidHit:navBarFixed}"></div>
  </div>
</template>

<script>
  export default {
    name: "heads",
    data() {
      return  {
        changeColor: 0,
        navBarFixed: false,
        navList:[
          {
            name: '首页',
            path: '/',
            children:[]
          },
          {
            name: '产品风格',
            path: '/product_style',
            children:[]
          },
          {
            name: '在线商城',
            path: '/online_store',
            children:[]
          },
          {
            name: '品质保障',
            path: '/quality',
            children:[
              {name: '原材料采购', path: '/purchase'},
              {name: '智能制造', path: '/make'},
              {name: '工程案例', path: '/project_case'},
              {name: '售后服务', path: '/server'}
            ]
          },
          {
            name: '线下门店',
            path: '#',
            children:[
              {name: '门店管理', path: '/store_manage'},
              {name: '门店分布', path: '/product_detail'},
              {name: '地图展示', path: '/store_custom'},
              {name: '购物车', path: '/shop_car'}
            ]
          },
          {
            name: '招贤纳士',
            path: '/join_us',
            children:[]
          },
          {
            name: '关于金凯',
            path: '/about_us',
            children:[]
          },
        ],
      }
    },
    mounted () {
      // 事件监听滚动条
      window.addEventListener('scroll', this.watchScroll)
    },
    methods: {
      change(index) {
        this.changeColor = index
      },
      login() {
        this.$store.commit('loginState')
        console.log(this.$store.state.isLogin)
      },
      watchScroll () {
        let _this = this;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop<400){
          _this.navBarFixed = false
        }else{
          let agent = navigator.userAgent;
          if (/.*Firefox.*/.test(agent)) {
            document.addEventListener("DOMMouseScroll", function(e) {
              e = e || window.event;
              let detail = e.detail;
              if (detail > 0) {
                if(!_this.navBarFixed){
                  // console.log("鼠标向下滚动");
                  _this.navBarFixed = true
                }
              } else {
                // console.warn("鼠标向上滚动");
                if(_this.navBarFixed){
                  _this.navBarFixed = false
                }
              }
            });
          }else {
            //鼠标滚动控制导航栏高度
            document.onmousewheel = function(e) {
              e = e || window.event;
              let wheelDelta = e.wheelDelta;
              if (wheelDelta > 0) {
                // console.warn("鼠标向上滚动");
                if(_this.navBarFixed){
                  _this.navBarFixed = false
                }
              } else {
                // console.log("鼠标向下滚动");
                if(!_this.navBarFixed){
                  _this.navBarFixed = true
                }
              }
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  header{
    width: 100%;
    font-size: 18px;
    color: #434343;
    background: #fff;
    letter-spacing: 1px;
    border-bottom: 1px solid #efefef;
    position: fixed;
    z-index: 1000;
  }
  .mainTop{
    height: 32px;
    background: #eee;
    color: #333;
    line-height: 32px;
    font-size: 12px;
    transition: all 1s;
    overflow: hidden;
  }
  header .mainTopHit{
    height: 0;
  }
  .hid{
    height: 112px;
    transition: all 1s;
    background: #fff;
  }
  header .hidHit{
    height: 80px;
  }
  .mainTop .fontStyle{
    width: 120px;
    float: left;
  }
  .loginInfo>.hit,.fontStyle>.hit{
    color: #dfdfdf;
    cursor: auto;
  }
  .loginInfo>span,.fontStyle>span{
    padding-right: 10px;
    cursor: pointer;
  }
  .loginInfo{
    float: right;
  }
  .mainBot{
    height: 80px;
    line-height: 80px;
    font-size: 16px;
  }
  .mainBot .logoImg{
    width: 20%;
    height: 100%;
    float: left;
    text-align: left;
    position: relative;
    margin-left: 15px;
  }
  .mainBot .logoImg img{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .mainBot .navList{
    width: 72%;
    height: 100%;
    float: right;
    position: relative;
  }
  .mainBot .navList>ul{
    width: 100%;
    height: 100%;
  }
  .mainBot .navList>ul>li{
    width: 14%;
    height: 100%;
    float: left;
    box-sizing: border-box;
  }
  a{
    color: #434343;
  }
  .navList>ul>li:last-child{
    text-align: right;
  }
  .navList>ul>li:nth-child(6){
    padding-left: 20px;
    box-sizing: border-box;
  }
  .navList>ul>li:hover .listHref{
    color: #CEA972;
    padding-bottom: 4px;
    border-bottom: 3px solid #CEA972;
  }
  .navList>ul>li>.list>li:hover a{
    color: #CFA972;

  }
  .navList>ul>li>.list{
    display: none;
    background: #fff;
  }
  .mainBot .navList>ul>li>.list>li{
    border-bottom: 1px solid #dfdfdf;
    height: 40px;
    line-height: 40px;
  }
  .navList>ul>li:hover .list{
    display: block;
  }
  .navList>ul>li>.red{
    color: #CFA972;
    padding-bottom: 4px;
    border-bottom: 3px solid #CFA972;
  }
</style>

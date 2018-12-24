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
              <!--<div class="squee">-->
                <!--<marquee><span style="font-weight: bolder;font-size: 40px;color: white;">Welcom CSDN!</span></marquee>-->
              <!--</div>-->
              <div class="loginInfo" v-if="rightFlag">
                <span @click="login('log')">登陆</span>
                <span class="hit">|</span>
                <span @click="login('reg')">注册</span>
              </div>
              <div class="carBox" v-else>
                <div class="car" @click="linkTo('car')">
                  <img :src="$store.state.qiNiuServer+'/gouwuche3.png'" alt="">
                </div>
                <div class="person" @click="pull()">
                  <img :src="$store.state.qiNiuServer+'/wo3.png'" alt="">
                </div>
              </div>
            </div>
        </div>
        <div class="mainBot">
          <div class="main">
            <div class="logoImg">
              <router-link  to="/">
                <img :src="$store.state.qiNiuServer+'/logo.png'" alt="">
              </router-link>
            </div>
            <div class="navList">
              <ul>
                <li v-for="(item,index) in navLists"  @click="change(index)">
                  <router-link class="listHref" :class="{ red:changeColor == index}" :to="item.path">{{item.name}}</router-link>
                  <ul v-if="item.children.length !== 0" class="list">
                    <li v-for="items in item.children">
                      <router-link :to="items.path">{{items.name}}</router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="pullDown" v-if="pullFlag">
              <p @click="linkTo('address')">收货地址</p>
              <p @click="linkTo('indent')">我的订单</p>
              <p @click="linkTo('logout')">退出登陆</p>
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
        pullFlag:false,
        rightFlag:true,
        // changeColor: 0,
        changeColor: this.$store.state.headColorNum,
        navBarFixed: false,
        navLists:[
          {
            name: '首页',
            path: '/',
            children:[]
          },
          {
            name: '产品风格',
            path: '/product',
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
            path: '/offline_store',
            children:[
              {name: '门店管理', path: '/store_manage'},
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
      this.rightFlag = localStorage.getItem('token') ? false : true
    },
    watch:{
      '$route' (to, from) {
        // 对路由变化作出响应...
        // console.log(to);
        // console.log(from);
        if(to.path == '/'){
          this.changeColor = 0
        }
      },
      "$store.state.token" (val,old) {
        if(val) {
          this.rightFlag = false
        }else{
          this.rightFlag = true
        }
      },
      "$store.state.headColorNum" (val,old) {
        if(val) {
          this.changeColor = val
        }
      }
    },
    methods: {
      change(index) {
        this.changeColor = index
      },
      linkTo(params) {
        // console.log(params)
        if(params == 'car') {
          this.$router.push('/shop_car')
        }else if(params == 'logout'){
          this.$http.post('logout','').then((res)=>{
            if(res.data.code == 200){
              this.$router.push('/');
              this.rightFlag = true;
              this.$store.commit('userToken','')
            }
          })
        }else if(params == 'address'){
          this.$router.push('/receiver_address')
        }else{
          this.$router.push('/my_order')
        }
        this.pullFlag = false
      },

      login(params) {
        if(params == 'log'){
          this.$store.commit('loginState',true)
        }else{
          this.$store.commit('loginState',false)
        }
      },
      pull() {
        this.pullFlag = !this.pullFlag
      },
      watchScroll () {
        let _this = this;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop < 400){
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
                  if(_this.pullFlag){
                    _this.pullFlag = false
                  }
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
                  if(_this.pullFlag){
                    _this.pullFlag = false
                  }
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
  .squee{
    width: 500px;
    height: 100%;
    background: red;
    margin: 0 auto;
  }
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
  .mainTop>.main{
    position: relative;
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
    height: 80px !important;
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
  .mainBot>.main{
    position: relative;
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
  .carBox{
    width: 150px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
  .carBox>div{
    height: 100%;
    float: left;
    text-align: center;
    position: relative;
  }
  .carBox>.car{
    width: 35%;
  }
  .carBox>.person{
    width: 65%;
  }
  .carBox>.person:hover{
    background: #fff;
  }
  .pullDown{
    position: absolute;
    width: 98px;
    right: 0;
    top: -1px;
    background: #fff;
    z-index: 10000;
    font-size: 14px;
    overflow: hidden;
  }
  .pullDown>p{
    line-height: 32px;
    border-bottom: 1px solid #dfdfdf;
    cursor: pointer;
  }
  .pullDown>p:hover{
    color: #CFA972;
  }
  .pullDown>p:first-child{
    border-top: 1px solid #dfdfdf;
  }
  .carBox>div>img{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    height: 70%;
    cursor: pointer;
  }
</style>

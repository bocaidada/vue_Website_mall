<template>
  <div>
    <header id="headers">
      <div class="main">
        <div class="main_left">
          <router-link  to="/">
            <img src="../../../static/img/1.png" alt="">
          </router-link>
        </div>
        <div class="main_center">
          <ul>
            <li v-for="item in navList">
              <router-link :to="item.path">{{item.name}}</router-link>
              <ul v-if="item.children.length !== 0" class="list">
                <li v-for="items in item.children">
                  <router-link :to="items.path">{{items.name}}</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="main_right">
          <div class="main_left_font">
            <span @click="click('jian')">简</span>
            <!--<span @click="click('fan')">繁</span>-->
            <span @click="click('en')">EN </span>
          </div>
          <div class="main_right_box">
            <div class="main_right_box_car" @click="click('car')">
              <img src="../../../static/img/2.jpg" alt="">
            </div>
            <div class="main_right_box_user">
              <img src="../../../static/img/3.jpg" alt="">
              <ul>
                <li>
                  <router-link to="">收货地址</router-link>
                </li>
                <li>
                  <router-link to="">我的订单</router-link>
                </li>
                <li v-if="isLogin" @click="out_login()">退出登录</li>
                <li v-else @click="out_login()">立即登陆</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div style="height: 90px"></div>
  </div>
</template>

<script>
  export default {
    name: "heads",
    data() {
      return  {
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
            path: '#',
            children:[
              {name: '原材料采购', path: '/purchase'},
              {name: '智能制造', path: '/make'},
              {name: '工程案例', path: '/case'},
              {name: '售后服务', path: '/server'}
            ]
          },
          {
            name: '线下门店',
            path: '#',
            children:[
              {name: '门店管理', path: '/store_manage'},
              {name: '门店分布', path: '/store_distribute'},
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
        isLogin:this.$store.state.isLogin
      }
    },
    methods: {
      click(params) {
        alert(params)
      },
      out_login() {
        if(this.isLogin){
          this.$router.push("/login")
        }else{
          this.$router.push("/")
        }
        this.$store.commit('loginState')
        this.isLogin = this.$store.state.isLogin
      },
    }
  }
</script>

<style scoped>
  #headers{
    width: 100%;
    height: 90px;
    background: #313949;
    color: #fff;
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
  }

  .main_left{
    width: 10%;
    float: left;
    margin-top: 12px;
  }
  .main_right{
    width: 25%;
    height: 100%;
    float: right;
  }
  .main_right>div{
    width: 50%;
    height: 100%;
    float: left;
    font-size: 12px;
  }
  .main_left_font>span{
    display: block;
    float: left;
    width: 30%;
    height: 14px;
    line-height: 14px;
    border-right: 1px solid #fff;
    margin-top: 40px;
    cursor: pointer;
  }
  .main_left_font>span:last-child{
    border: none;
  }
  .main_center{
    width: 55%;
    height: 100%;
    float: left;
    margin-left: 8%;
    position: relative;
  }
  .main_center>ul{
    width: 100%;
    height: 100%;
    line-height: 90px;
    font-size: 14px;
  }
  a{
    text-align: center;
    color: #fff;
    text-decoration: none;
  }
  .main_center>ul>li{
    width: 14%;
    height: 100%;
    float: left;
  }
  li{
    list-style-type: none;
  }
  .main_center>ul>li:hover a{
    color: #ccc;
  }
  .main_center>ul>li>.list>li:hover a{
    color: #ccc;
  }
  .main_center>ul>li>.list a{
    color: #fff;
  }
  .main_center>ul>li>.list{
    width: 100%;
    background: #313949;
    margin-top: 36px;
    display: none;
  }
  .main_center>ul>li:hover .list{
    display: block;
  }
  .main_center>ul>li>.list>li{
    height: 35px;
    line-height: 35px;
    border-top: 1px solid #fff;
  }
  .main_center>ul>li>a{
    display: block;
    height: 16px;
    line-height: 16px;
    margin-top: 38px;
    border-right: 1px solid #fff;
  }
  .main_center>ul>li:last-child>a{
    border: none;
  }
  .main_right_box::after{
    content: '';
    display: block;
    overflow: hidden;
  }
  .main_right_box>div{
    float: left;
    position: relative;
    cursor: pointer;
  }
  .main_right_box>div>img{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .main_right_box_car{
    width: 40%;
    height: 100%;
  }
  .main_right_box_user{
    width: 60%;
    height: 100%;
  }
  .main_right_box_user>ul{
    margin-top: 90px;
    width: 100%;
    background: #313949;
    display: none;
  }
  .main_right_box_user:hover ul{
    display: block;
  }
  .main_right_box_user>ul>li{
    height: 35px;
    line-height: 35px;
    border-top: 1px solid #fff;
    cursor: pointer;
  }
  .main_right_box_user>ul>li:hover a{
    color: #ccc;
  }
</style>

<template>
  <header id="headers">
    <div class="main">
      <div class="main_left">
        <router-link  to="/">
          <img src="../../../static/img/1.png" alt="">
        </router-link>
      </div>
      <div class="main_center">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="3">订单管理</el-menu-item>
          <el-menu-item index="4">订单管理</el-menu-item>
          <el-menu-item index="5">订单管理</el-menu-item>
          <el-menu-item index="6">订单管理</el-menu-item>
          <el-menu-item index="7">订单管理</el-menu-item>
        </el-menu>
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
              <li>
                <router-link to="/outLogin">退出登录</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: "heads",
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      click(params) {
        alert(params)
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  #headers{
    width: 100%;
    height: 90px;
    background: #313949;
    color: #fff;
  }
  .main{
    width: 70%;
    height: 100%;
    margin: 0 auto;
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

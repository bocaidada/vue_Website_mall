<template>
  <div>
    <header>
        <div class="mainTop">
            <main class="main">
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
            </main>
        </div>
        <div class="mainBot">
          <main class="main">
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
                      <!--<a :href="items.path">{{items.name}}</a>-->
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </main>
        </div>
    </header>
    <div style="height: 150px"></div>
  </div>
</template>

<script>
  export default {
    name: "heads",
    data() {
      return  {
        changeColor: 0,
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
    methods: {
      change(index) {
        this.changeColor = index
        // this.$store.commit('headNum',index)
      },
      login() {
        this.$store.commit('loginState')
        console.log(this.$store.state.isLogin)
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
    height: 50px;
    background: #eee;
    color: #333;
    line-height: 50px;
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
    height: 100px;
    line-height: 100px;
  }
  .mainBot .logoImg{
    width: 20%;
    height: 100%;
    float: left;
    text-align: left;
    position: relative;
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

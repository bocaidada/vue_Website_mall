<template>
  <footer>
    <div class="main">
      <div class="footerLogo">
        <router-link to="/">
          <img src="../../../static/img/index/05_logo.png" alt="">
        </router-link>
      </div>
      <div class="main_left footerList">
        <dl v-for="(item,index) in footList" :key="index">
          <dt>{{item.name}}</dt>
          <dd v-for="(items,index1) in item.children" :key="index1">
            <router-link :to="items.path">{{items.name}}</router-link>
          </dd>
        </dl>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: "foot",
    data() {
      return {
        footList:[
          {
            name: '关于我们',
            children:[
              {name: '公司简介', path: '/purchase'},
              {name: '发展历程', path: '/make'},
              {name: '公司动态', path: '/case'},
              {name: '奖项荣誉', path: '/server'}
            ]
          },{
            name: '加盟我们',
            children:[
              {name: '加盟条件', path: '/purchase'},
              {name: '加盟优势', path: '/make'},
              {name: '加盟流程', path: '/case'},
              {name: '加盟申请', path: '/server'},
              {name: '门店地图', path: '/server'}
            ]
          },{
            name: '产品中心',
            children:[
              {name: '实木门', path: '/purchase'},
              {name: '复合门', path: '/case'},
              {name: '烤漆木门', path: '/make'},
              {name: '全屋定制', path: '/server'}
            ]
          },{
            name: '工程案例',
            children:[
              {name: '工程案例', path: '/purchase'}
            ]
          },{
            name: '关注我们',
            children:[
              {name: '微信', path: '/purchase'}
            ]
          },
        ]
      }
    }
  }
</script>

<style scoped>
  footer{
    width: 100%;
    height: 500px;
    background: #7E6B5A;
  }
  .main{
    width: 70%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    box-sizing: border-box;
    color: #fff;
  }
  .footerList{
    width: 100%;
    height: 58%;
  }
  .footerList dl{
    width: 20%;
    height: 100%;
    float: left;
    border-right: 1px solid #887979;
    text-align: center;
    box-sizing: border-box;
  }
  .footerList dl:last-child{
    border-right: none;
  }
  .footerList dt{
    height: 40px;
    letter-spacing: 1px;
    font-size: 20px;
  }
  .footerList dd{
    line-height: 45px;
    letter-spacing: 1px;
    cursor: pointer;
    font-size: 16px;
  }
  .footerList dd:hover a{
    color: #fff;
  }
  .footerList dd a{
    color: #ccc;
  }
  .footerLogo{
    width: 100%;
    height: 35%;
    border-bottom: 1px solid #887979;
    margin-bottom: 30px;
    position: relative;
  }
  .footerLogo img{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>

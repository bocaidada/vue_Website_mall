<template>
  <footer>
    <main>
      <div class="main_left">
        <dl v-for="(item,index) in footList" :key="index">
          <dt>{{item.name}}</dt>
          <dd v-for="(items,index1) in item.children" :key="index1">
            <router-link :to="items.path">{{items.name}}</router-link>
          </dd>
        </dl>
      </div>
      <div class="main_right">
        <div class="imgBox">
          <img src="../../../static/img/1.png" alt="">
          <span>金凯木业</span>
        </div>
      </div>
    </main>
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
              {name: '烤漆木门', path: '/make'},
              {name: '复合门', path: '/case'},
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
    height: 400px;
    background: #313949;
  }
  main{
    width: 85%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    box-sizing: border-box;
    padding-top: 60px;
    color: #fff;
  }
  .main_left{
    width: 70%;
    height: 100%;
    float: left;
    display: flex;
    justify-content: space-around;
  }
  .main_left dl{
    text-align: left;
  }
  .main_left dt{
    line-height: 80px;
    letter-spacing: 1px;
    font-size: 20px;
  }
  .main_left dd{
    line-height: 45px;
    letter-spacing: 1px;
    cursor: pointer;
    font-size: 16px;
  }
  .main_left dd:hover a{
    color: #fff;
  }
  .main_left dd a{
    color: #ccc;
  }
  .main_right{
    width: 30%;
    height: 100%;
    float: left;
  }
  .imgBox{
    width: 100%;
    margin-top: 70px;
    cursor: pointer;
  }
  .imgBox>span{
    font-size: 26px;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .imgBox>img{
    width: 50%;
    vertical-align: middle;
  }
</style>

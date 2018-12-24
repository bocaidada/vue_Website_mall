<template>
  <footer v-if="footFlag">
    <div class="main">
      <div class="footerLogo">
        <router-link to="/">
          <img :src="$store.state.qiNiuServer+'/index/05_logo.png'" alt="">
        </router-link>
      </div>
      <div class="main_left footerList">
        <dl v-for="(item,index) in footList" :key="index">
          <dt>{{item.name}}</dt>
          <dd v-for="(items,index1) in item.children" :key="index1"  @click="footTab(items.path,index1)">
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
        footFlag:this.$store.state.footerFlag,
        footList:[
          {
            name: '关于我们',
            children:[
              {name: '公司简介', path: '/about_us'},
              {name: '发展历程', path: '/about_us'},
              {name: '行业资讯', path: '/news_list'},
              {name: '奖项荣誉', path: '/about_us'}
            ]
          },{
            name: '加盟我们',
            children:[
              {name: '加盟条件', path: '/offline_store'},
              {name: '加盟优势', path: '/offline_store'},
              {name: '加盟流程', path: '/offline_store'},
              {name: '加盟申请', path: '/offline_store'},
              {name: '门店地图', path: '/offline_store'}
            ]
          },{
            name: '产品中心',
            children:[
              {name: '新款', path: '/product'},
              {name: '爆款', path: '/product'},
              {name: '经典', path: '/product'},
              {name: '整木', path: '/product'}
            ]
          },{
            name: '工程案例',
            children:[
              {name: '工程案例', path: '/project_case'}
            ]
          },{
            name: '联系我们',
            children:[
              {name: 'TEL：400-6057-086', path: '/'}
            ]
          },
        ]
      }
    },
    watch:{
      '$store.state.footerFlag':function (val,old) {
        // console.log(val,old)
        this.footFlag = val
      }
    },
    methods: {
      footTab(item,index) {
        if(item === '/product') {
          this.$store.commit('tabNum',index)
        }
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
    height: 55%;
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

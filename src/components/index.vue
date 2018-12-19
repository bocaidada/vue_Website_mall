<template>
  <div id="app">
    <div class="service">
      <div class="service_left">
        客 <br> 服<br>中<br>心
      </div>
      <div class="service_right">
        <div onclick="window.open('http://p.qiao.baidu.com/cps/chat?siteId=12829790&userId=26860524','门店客服','width=1000,height=600,menubar=no,toolbar=no, status=no,scrollbars=yes,top=100');">
          <img :src="$store.state.qiNiuServer+'/icon_01.png'" alt="">
          在线客服
        </div>
        <div title="TEL：4006-0570-85" @click="open('加盟咨询','TEL：4006-0570-85')">
          <img :src="$store.state.qiNiuServer+'/icon_02.png'" alt="">
          加盟咨询
        </div>
        <div title="TEL：4006-0570-86" @click="open('客服电话','TEL：4006-0570-86')">
          <img :src="$store.state.qiNiuServer+'/icon_03.png'" alt="">
          客服电话
        </div>
      </div>
    </div>
    <login/>
    <headers/>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"  ref="tree"/>
      <!--<router-view ref="tree"/>-->
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"  ref="tree"/>
    <footers/>
  </div>
</template>

<script>
  import headers from './common/head'
  import footers from './common/foot'
  import login from './homePage/login'
  export default {
      name: "index",
      components: {headers,footers,login},
      data() {
          return {
            isLogin:false,
          }
      },
      mounted:function(){
        setTimeout(()=>{
          this.$store.commit('footerFlag',true)
        },500)
        this.$router.afterEach((to, from, next) => {
          window.scrollTo(0, 0)   //跳转页面回到顶部
        })
      },
      watch:{
        '$route' (to,from) {
          // console.log(to)
          // console.log(from)
          if(to.path == '/news_list'){
            this.$store.commit('caseFlag',true)
          }
          if(to.path.indexOf("news_list/news_detail") != -1){
            this.$store.commit('caseFlag',false)
          }
          if(to.path == '/online_store'){
            this.$store.commit('productFlag',true)
            this.$store.commit('headColorNum',2)
            this.$store.commit('orderType',2)
          }
          if(to.path == '/product'){
            this.$store.commit('headColorNum',1)
          }
          if(to.path == '/quality' || to.path == '/purchase' || to.path == '/make' || to.path == '/project_case' || to.path == '/server'){
            this.$store.commit('headColorNum',3)
          }
          if(to.path == '/offline_store'){
            this.$store.commit('headColorNum',4)
          }
          if(to.path == '/join_us'){
            this.$store.commit('headColorNum',5)
          }
          if(to.path == '/about_us'){
            this.$store.commit('headColorNum',6)
          }
          if(to.path.indexOf("online_store/product_detail") != -1){
            this.$store.commit('headColorNum',2)
            this.$store.commit('productFlag',false)
            this.$store.commit('orderType',2)
          }
          if(to.path == '/project_case'){
            this.$store.commit('headColorNum',3)
            this.$store.commit('caseFlag',true)
          }
          if(to.path.indexOf("project_case/detail_case") != -1){
            this.$store.commit('headColorNum',3)
            this.$store.commit('caseFlag',false)
          }
          if(to.path == '/store_manage'){
            this.$store.commit('storeFlag',true)
            this.$store.commit('orderType',1)
          }
          if(to.path.indexOf("store_manage/shop_product_detail") != -1 || to.path.indexOf("store_manage/oder_detail") != -1 || to.path.indexOf("store_manage/after_sale_dispose") != -1 || to.path.indexOf("store_manage/after_sale") != -1){
            this.$store.commit('storeFlag',false)
            this.$store.commit('orderType',1)
          }
          if(to.path == '/my_order'){
            this.$store.commit('orderFlag',true)
            this.$store.commit('orderType',2)
          }
          if(to.path == '/shop_car'){
            this.$store.commit('orderType',2)
          }
          if(to.path.indexOf("my_order/oder_detail") != -1 || to.path.indexOf("my_order/after_sale_dispose") != -1 || to.path.indexOf("my_order/after_sale") != -1){
            this.$store.commit('orderFlag',false)
            this.$store.commit('orderType',2)
          }
        }
      },
      methods:{
        open(name,tel) {
          this.$notify({
            title: name,
            message: tel,
            duration: 8000,
            offset: 100,
            type: 'success'
          });
        }
      }
    }
</script>
<style>
  .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    box-shadow: none !important;
  }
  /*解决火狐浏览器点击出现虚线选框问题*/
  a:focus {
    outline: none;
  }
  button{
    outline: none;
  }
  h2{
    text-align: left !important;
  }
</style>
<style scoped>

 .service{
   width: 46px;
   /*width: 200px;*/
   height: 140px;
   background: #D6C198;
   /*background: rgba(195,161,102,.8);*/
   position: fixed;
   right: 0;
   top: 40%;
   z-index: 10000;
   overflow: hidden;
   cursor: pointer;
   color: #fff;
   border-radius: 5px;
   transition: width 1s;
 }
 .service:hover{
   width: 200px;
 }
  .service_left{
    width: 50px;
    height: 100%;
    float: left;
    border-right: 2px solid #efefef;
    box-sizing: border-box;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    padding: 10px 0;
    line-height: 30px;
  }
 .service_right{
    width: 150px;
    height: 100%;
    float: left;
    letter-spacing: 1px;
  }
 .service_right>div{
   width: 100%;
   height: 46px;
   border-bottom: 2px solid #efefef;
   box-sizing: border-box;
   line-height: 46px;
   text-align: left;
 }
 .service_right>div>img{
   height: 60%;
   vertical-align: middle;
   padding:0 5px 0 16px;
 }
 .service_right>div:last-child{
   border-bottom: none;
 }
</style>

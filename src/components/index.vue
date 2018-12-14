<template>
  <div id="app">
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
</style>
<style scoped>

</style>

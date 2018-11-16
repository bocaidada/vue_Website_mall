<template>
  <div id="app">
    <login/>
    <headers/>
    <router-view ref="tree"/>
    <footers/>
  </div>
</template>

<script>
  import headers from './common/heads'
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
        this.$router.push('/');  //页面刷新回到首页
        this.$router.afterEach((to, from, next) => {
          window.scrollTo(0, 0)   //跳转页面回到顶部
        })
        this.imgMove()
      },
      watch:{

      },
      methods:{
        imgMove() {
          document.getElementsByTagName('img')[0].onmousedown = function(e){
            e.preventDefault()
          }
        }
      }
    }
</script>

<style scoped>

</style>

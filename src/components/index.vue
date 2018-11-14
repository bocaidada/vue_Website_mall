<template>
  <div id="app">
    <login/>
    <headers/>
    <!--<transition name="turn-on" mode='out-in'>-->
      <router-view ref="tree"/>
    <!--</transition>-->
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
      },
      watch:{

      },
      methods:{

      }
    }
</script>

<style scoped>
  .login{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,.8);
  }
  /*转场动画*/
  /*.turn-on-enter {*/
    /*transform: translate3d(100%, 0, 0);*/
  /*}*/
  /*.turn-on-leave-to {*/
    /*transform: translate3d(-100%, 0, 0);*/
    /*!* transform: translate3d(-20%, 0, 0); *!*/
  /*}*/
  /*.turn-on-enter-active,*/
  /*.turn-on-leave-active {*/
    /*transition: transform 1s ease;*/
  /*}*/
</style>

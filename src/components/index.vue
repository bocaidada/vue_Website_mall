<template>
  <div id="app">
    <!--<div v-if="isLogin" class="login"></div>-->
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
            isLogin:false
          }
      },
      mounted:function(){
        this.$router.push('/');
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
</style>

<template>
  <div id="app">
    <headers/>
    <router-view></router-view>
    <footers/>
  </div>
</template>

<script>
  import headers from './common/heads'
  import footers from './common/foot'
  export default {
        name: "index",
        components: {headers,footers}
    }
</script>

<style scoped>
  /*#app {*/
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*!*margin-top: 60px;*!*/
  /*}*/

</style>

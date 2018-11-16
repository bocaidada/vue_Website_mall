<template>
  <section class="content">
    <div class="banner">
      <img :src="pageData.bannerImg" alt="" ondragstart="return false">
    </div>
    <div class="main">
      <img class="contentBox" ondragstart="return false" :src="item.imgUrl" v-for="(item,index) in pageData.contentImg" :key="index"  alt="">
    </div>
  </section>
</template>

<script>
  export default {
    name: "whole_wood",
    data() {
      return {
        pageData:{
          bannerImg:'../../../static/img/style/mu_01.jpg',
          contentImg:[
            {imgUrl:'../../../static/img/style/mu_02.jpg'},
            {imgUrl:'../../../static/img/style/mu_03.jpg'},
            {imgUrl:'../../../static/img/style/mu_04.jpg'}
          ]
        }
      }
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style scoped>
  .content{
    width: 100%;
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
  }
  .banner{
    width: 100%;
  }
  .banner>img{
    width: 100%;
  }
  .contentBox{
    display: block;
    width: 100%;
  }
</style>

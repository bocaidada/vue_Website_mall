<template>
  <section class="content">
    <div class="banner">
      <img :src="qiNiuBase+pageData.bannerImg" alt="" ondragstart="return false">
    </div>
    <div class="main">
      <div class="imgBox">
        <img class="contentBox" ondragstart="return false" :src="qiNiuBase+item.imgUrl" v-for="(item,index) in pageData.contentImg" :key="index"  alt="">
      </div>
      <router-link tag="div" to="/online_store" class="openStore">进入商城</router-link>
      <div class="botTab">
        <div :class="{hot:tabNum == 0}" @click="changeNUm(0)">
          <img :src="[tabNum == 0 ? qiNiuBase+botTabImg.new2 : qiNiuBase+botTabImg.new1]" alt="">
        </div>
        <div :class="{hot:tabNum == 1}" @click="changeNUm(1)">
          <img :src="[tabNum == 1 ? qiNiuBase+botTabImg.hot2 : qiNiuBase+botTabImg.hot1]" alt="">
        </div>
        <div :class="{hot:tabNum == 2}" @click="changeNUm(2)">
          <img :src="[tabNum == 2 ? qiNiuBase+botTabImg.classics2 : qiNiuBase+botTabImg.classics1]" alt="">
        </div>
        <div :class="{hot:tabNum == 3}" @click="changeNUm(3)">
          <img :src="[tabNum == 3 ? qiNiuBase+botTabImg.wood2 : qiNiuBase+botTabImg.wood1]" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name:"product",
    data() {
      return {
        qiNiuBase:this.$store.state.qiNiuServer,
        tabNum: this.$store.state.tabNum,
        botTabImg:{
          new1:'/style/new1.png',
          new2:'/style/new2.png',
          hot1:'/style/hot1.png',
          hot2:'/style/hot2.png',
          classics1:'/style/classics1.png',
          classics2:'/style/classics2.png',
          wood1:'/style/wood1.png',
          wood2:'/style/wood2.png',
        },
        pageData:{},
        newData:{
          bannerImg:'/style/new_01.jpg',
          contentImg:[
            {imgUrl:'/style/new_02.jpg'},
            {imgUrl:'/style/new_03.jpg'},
            {imgUrl:'/style/new_04.jpg'}
          ]
        },
        hotData:{
          bannerImg:'/style/hot_01.jpg',
          contentImg:[
            {imgUrl:'/style/hot_02.jpg'},
            {imgUrl:'/style/hot_03.jpg'},
            {imgUrl:'/style/hot_04.jpg'}
          ]
        },
        classicData:{
          bannerImg:'/style/Classic_01.jpg',
          contentImg:[
            {imgUrl:'/style/Classic_02.jpg'},
            {imgUrl:'/style/Classic_03.jpg'},
            {imgUrl:'/style/Classic_04.jpg'}
          ]
        },
        woodData:{
          bannerImg:'/style/mu_01.jpg',
          contentImg:[
            {imgUrl:'/style/mu_02.jpg'},
            {imgUrl:'/style/mu_03.jpg'},
            {imgUrl:'/style/mu_04.jpg'}
          ]
        }
      }
    },
    created() {
      this.changeNUm(this.tabNum)
    },
    watch: {
      "$store.state.tabNum" (val,old) {
        if(val >= 0) {
          this.changeNUm(val)
        }
      }
    },
    mounted() {
      setTimeout(()=>{
        this.show = true
      },200)
    },
    methods: {
      changeNUm(index) {
        this.tabNum = index
        if(index == 0) {
          this.pageData = this.newData
        }else if(index == 1) {
          this.pageData = this.hotData
        }else if(index == 2) {
          this.pageData = this.classicData
        }else{
          this.pageData = this.woodData
        }
        setTimeout(()=>{
          // window.scrollTo(0, 0)
          let distance = document.documentElement.scrollTop || document.body.scrollTop; //获得当前高度
          let step = distance/50; //每步的距离
          (function jump(){
            if(distance > 0){
              distance -= step;
              window.scrollTo(0,distance);
              setTimeout(jump,10)
            }
          })();
        },0)
      }
    }
  }
</script>

<style scoped>
  .content{
    width: 100%;
    min-height: 1000px;
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
  .imgBox{
    width: 100%;
    min-height: 1000px;
  }
  .imgBox>img{
    width: 100%;
    display: block;
  }
  .openStore{
    width: 280px;
    height: 80px;
    line-height: 80px;
    color: #C39B63;
    border: 2px solid #C39B63;
    text-align: center;
    margin: 0 auto 50px;
    font-size: 32px;
    cursor: pointer;
  }
  .openStore:hover{
    color: #c3825a;
    border: 2px solid #c3825a;
  }
  .botTab{
    height: 150px;
    background: #F5F5F5;
    margin-top: 100px;
  }
  .botTab>div{
    float: left;
    width: 25%;
    height: 100%;
    box-sizing: border-box;
    border-left:1px solid #fff;
    border-right:1px solid #fff;
    cursor: pointer;
  }
  .botTab> .hot{
    background: #aa9289;
  }
  .botTab>div>img{
    width: 100%;
    display: block;
  }

  .viewBox{
    height: 3400px;
    position: relative;
  }
  /*转场动画*/
  .turn-on-enter {
    transform: translate3d(100%, 0, 0);
  }
  .turn-on-leave-to {
    transform: translate3d(-100%, 0, 0);
  }
  .turn-on-enter-active,
  .turn-on-leave-active {
    transition: transform 1s ease;
  }
</style>

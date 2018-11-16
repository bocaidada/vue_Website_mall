<template>
  <section class="content">
    <!--<div class="viewBox">-->
      <!--<transition name="turn-on">-->
      <!--</transition>-->
    <!--</div>-->
    <router-view/>
    <div class="openStore">进入商城</div>
    <div class="botTab">
      <div class="main">
        <div :class="{hot:tabNum == 0}" @click="changeNUm(0)">
          <img :src="[tabNum == 0 ? botTabImg.new2 : botTabImg.new1]" alt="">
        </div>
        <div :class="{hot:tabNum == 1}" @click="changeNUm(1)">
          <img :src="[tabNum == 1 ? botTabImg.hot2 : botTabImg.hot1]" alt="">
        </div>
        <div :class="{hot:tabNum == 2}" @click="changeNUm(2)">
          <img :src="[tabNum == 2 ? botTabImg.classics2 : botTabImg.classics1]" alt="">
        </div>
        <div :class="{hot:tabNum == 3}" @click="changeNUm(3)">
          <img :src="[tabNum == 3 ? botTabImg.wood2 : botTabImg.wood1]" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name:"product_style",
    data() {
      return {
        tabNum: 0,
        botTabImg:{
          new1:'../../../static/img/style/new1.png',
          new2:'../../../static/img/style/new2.png',
          hot1:'../../../static/img/style/hot1.png',
          hot2:'../../../static/img/style/hot2.png',
          classics1:'../../../static/img/style/classics1.png',
          classics2:'../../../static/img/style/classics2.png',
          wood1:'../../../static/img/style/wood1.png',
          wood2:'../../../static/img/style/wood2.png',
        }
      }
    },
    mounted() {

    },
    methods: {
      changeNUm(index) {
        this.tabNum = index
        if(index == 0) {
          this.$router.push('/product_style/new_style')
        }else if(index == 1) {
          this.$router.push('/product_style/hot_cake')
        }else if(index == 2) {
          this.$router.push('/product_style/classics')
        }else{
          this.$router.push('/product_style/whole_wood')
        }
      }
    }
  }
</script>

<style scoped>
  .content{
    width: 100%;
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
  .botTab>.main>div{
    float: left;
    width: 25%;
    height: 100%;
    box-sizing: border-box;
    border-left:1px solid #fff;
    border-right:1px solid #fff;
    cursor: pointer;
  }
  .botTab>.main>.hot{
    background: #aa9289;
  }
  .botTab>.main>div>img{
    width: 100%;
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

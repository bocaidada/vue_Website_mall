<template>
    <section class="content">
      <div class="banner">
        <img :src="bannerImgUrl" alt="">
      </div>
      <div class="productStyle">
        <div class="pro_title">
          <img :src="titleImgUrl" alt="">
        </div>
        <div class="pro_tab">
          <span v-for="(item,index) in styleData" :class="{hitColor:productStyleColor == index}" @click="styleChange(index)">{{item.name}}</span>
        </div>
        <div class="pro_box">
          <!--<swiper :options="swiperOption" style="height: 100%">-->
          <swiper :options="swiperOption" style="height: 100%;padding:0 277px">
            <swiper-slide v-for="(item,index) in styleImg" :key="index" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></swiper-slide>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
          </swiper>
        </div>
        <div class="store">
          <router-link to="">进入商城</router-link>
        </div>
      </div>
    </section>
</template>

<script>
  export default {
    data() {
      return {
        productStyleColor:'0',
        titleImgUrl:'',
        bannerImgUrl:'',
        styleData:[
          {name:'新款'},
          {name:'爆款'},
          {name:'经典'},
          {name:'整木'}
        ],
        bannerImg:[
          {name:'one',url:'../../../static/img/style/01_banner.jpg'},
          {name:'one',url:'../../../static/img/index/ban1.jpg'},
          {name:'one',url:'../../../static/img/style/01_banner.jpg'},
          {name:'one',url:'../../../static/img/index/ban1.jpg'}
        ],
        styleImg:[
          {name:'one',url:'../../../static/img/index/index_2.png'},
          {name:'one',url:'../../../static/img/index/index_2.png'},
          {name:'one',url:'../../../static/img/index/index_2.png'}
        ],
        titleImg:[
          {name:'one',url:'../../../static/img/style/02_xinkuan.png'},
          {name:'one',url:'../../../static/img/style/03_baokuan.png'},
          {name:'one',url:'../../../static/img/style/04_jingdian.png'},
          {name:'one',url:'../../../static/img/style/05_zhengmu.png'}
        ],
        swiperOption: {
          direction: 'vertical',
          // slidesPerView: 'auto',
          spaceBetween: 30,   //图片之间的间距
          loop: true,         //循环播放
          grabCursor: true,  //手势
          // pagination: {
          //   el: '.swiper-pagination',
          //   clickable: true
          // },
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
      };
    },
    mounted() {
      this.titleImgUrl = this.titleImg[0].url
      this.bannerImgUrl = this.bannerImg[0].url
    },
    methods: {
      styleChange(index) {
        this.productStyleColor = index
        this.titleImgUrl = this.titleImg[index].url
        this.bannerImgUrl = this.bannerImg[index].url
      }
    }
  }
</script>

<style scoped>
  .content{
    width: 100%;
  }
  .banner{
    width: 100%;
    /*height: 84vh;*/
  }
  .banner>img{
    width: 100%;
  }
  .pro_title{
    height: 100px;
  }
  .pro_title>img{
    height: 80%;
  }
  .productStyle{
    text-align: center;
    padding: 80px 0 80px;
    background:rgba(251,251,251,1);
  }
  .swiper-button-prev{
    left: 50px;
    background-image: url("../../../static/img/index/index_3.png") !important;
  }
  .swiper-button-next{
    right: 50px;
    background-image: url("../../../static/img/index/index_4.png") !important;
  }
  .pro_tab{
    height: 45px;
    line-height: 45px;
    color: #959595;
    font-size: 30px;
    margin: 20px 0 30px;
  }
  .pro_tab>span{
    padding: 0 100px;
    border-right: 2px solid rgba(160,160,160,.6);
    cursor: pointer;
  }
  .pro_tab>span:last-child{
    border-right: none;
  }
  .hitColor{
    color: #CFA972;
  }
  .pro_box{
    width: 1200px;
    height: 360px;
    margin: 0 auto;
  }
  .store{
    width: 180px;
    line-height: 50px;
    font-size: 24px;
    border: 2px solid #CFA972;
    margin: 60px auto 0;
    border-radius: 4px;
    cursor: pointer;
  }
  .store>a{
    color: #CFA972;
  }
  .store:hover a{
    color: #cf7f34;
  }
  .store:hover{
    border-color: #cf7f34;
  }
  /*.swiper-slide {*/
    /*width: 45%*/
  /*}*/
</style>

<template>
  <section class="content">
    <div class="banner">
      <swiper :options="swiperOption" style="height: 100%">
        <swiper-slide v-for="(item,index) in bannerImg" :key="index" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </swiper>
    </div>
    <div class="moduleBox" id="purchase">
      <div class="mod_top">
        <img src="../../../static/img/pinzhi/wenzi_icon_01.png" alt="">
      </div>
      <div class="mod_bot">
        <swiper :options="swiperOption1" style="height: 100%">
          <swiper-slide v-for="(item,index) in bannerImg" :key="index" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        </swiper>
      </div>
    </div>
    <div class="moduleBox" id="make">
      <div class="mod_top">
        <img src="../../../static/img/pinzhi/wenzi_icon_02.png" alt="">
      </div>
      <div class="mod_bot">
        <swiper :options="swiperOption2" style="height: 100%">
          <swiper-slide v-for="(item,index) in bannerImg" :key="index" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        </swiper>
      </div>
    </div>
    <div class="brand" id="case">
      <div class="pro_title">
        <img src="../../../static/img/pinzhi/wenzi_icon_03.png" alt="">
      </div>
      <div class="pro_tab">
        <span v-for="(item,index) in brandData" :class="{hitColor: brandColor == index}" @click="brandChange(index)">{{item.name}}</span>
      </div>
      <div class="brandBox">
        <div v-show="brandColor == 0" class="project">

        </div>
        <div v-show="brandColor == 1" class="shop">
          <swiper :options="swiperOption4" style="height: 100%">
            <swiper-slide v-for="(item,index) in bannerImg" :key="index" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
          </swiper>
        </div>
        <div v-show="brandColor == 2" class="export">

        </div>
      </div>
    </div>
    <div class="moduleBox" id="server">
      <div class="mod_top">
        <img src="../../../static/img/pinzhi/wenzi_icon_04.png" alt="">
      </div>
      <div class="mod_bot">
        <swiper :options="swiperOption3" style="height: 100%">
          <swiper-slide v-for="(item,index) in bannerImg" :key="index" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
        name: "quality",
        data() {
            return {
              bannerImg:[
                {name:'one',url:'../../../static/img/pinzhi/banner_01.png'},
                {name:'one',url:'../../../static/img/pinzhi/baner_02.png'},
                {name:'one',url:'../../../static/img/pinzhi/banner_03.png'},
                {name:'one',url:'../../../static/img/pinzhi/banner_04.png'},
                {name:'one',url:'../../../static/img/pinzhi/banner_05.png'},
              ],
              swiperOption1:{},
              swiperOption2:{},
              swiperOption3:{},
              swiperOption4:{},
              swiperOption: {
                spaceBetween: 30,   //图片之间的间距
                loop: true,         //循环播放
                grabCursor: true,  //手势
                pagination: {   //轮播点
                  el: '.swiper-pagination',
                  dynamicBullets: true
                },
                autoplay: {
                  delay: 5000,
                  disableOnInteraction: false
                },
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev'
                }
              },
              brandColor:'1',
              brandData:[
                {name:'工程案例'},
                {name:'门店案例'},
                {name:'外销案例'}
              ]
            }
        },
      created() {
        this.swiperOption1 = this.swiperOption
        this.swiperOption2 = this.swiperOption
        this.swiperOption3 = this.swiperOption
        this.swiperOption4 = this.swiperOption
      },
      methods: {
        brandChange(index) {
          this.brandColor = index
        }
      }
    }
</script>

<style scoped>
  .banner{
    width: 100%;
    height: 600px;
  }
  .moduleBox{
    width: 100%;
  }
  .moduleBox>.mod_top{
    padding: 80px 0 40px;
    position: relative;
  }
  .moduleBox>.mod_top>img{
    width: auto;
  }
  .moduleBox>.mod_bot{
    height: 600px;
  }
  .brand{
    text-align: center;
    padding: 60px 0 80px;
    background:rgba(251,251,251,1);
  }
  .pro_tab{
    height: 45px;
    line-height: 45px;
    color: #959595;
    font-size: 30px;
    margin: 50px 0 30px;
  }
  .pro_tab>span{
    padding: 0 100px;
    border-right: 2px solid rgba(160,160,160,.6);
    cursor: pointer;
    letter-spacing: 1px;
  }
  .pro_tab>span:last-child{
    border-right: none;
  }
  .hitColor{
    color: #CFA972;
  }
  .brandBox{
    width: 100%;
    height: 600px;
  }
  .brandBox>div{
    height: 100%;
  }
  @media screen and (max-width: 1600px) {
    .brandBox,.banner,.moduleBox>.mod_bot{
      height: 550px;
    }
  }
  @media screen and (max-width: 1300px) {
    .brandBox,.banner,.moduleBox>.mod_bot{
      height: 500px;
    }
  }
</style>

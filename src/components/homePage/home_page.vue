<template>
    <section class="content">
      <div class="banner">
        <swiper :options="swiperOption" style="height: 100%">
          <swiper-slide v-for="item in bannerImg" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></swiper-slide>
          <!--<div class="swiper-pagination" slot="pagination"></div>-->
          <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
          <!--<div class="swiper-button-next" slot="button-next"></div>-->
        </swiper>
      </div>
    </section>
</template>

<script>
    export default {
      name: "home_page",
      data() {
        return {
          bannerImg:[
            {name:'one',url:'../../../static/img/Ban.jpg'},
            {name:'two',url:'../../../static/img/Ban1.png'},
            {name:'three',url:'../../../static/img/Ban2.jpg'},
          ],
          swiperOption: {
            // direction: 'vertical',   //垂直轮播
            // slidesPerView: 1,
            spaceBetween: 30,   //图片之间的间距
            loop: true,         //循环播放
            grabCursor: true,  //手势
            autoplay: {
              delay: 5000,
              disableOnInteraction: false
            },
            // pagination: {   //轮播点
            //   el: '.swiper-pagination',
            //   clickable: true
            // },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          }
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
    height: 70vh;
  }
  .banner a{
    display: block;
    width: 100%;
    height: 100%;
  }
</style>

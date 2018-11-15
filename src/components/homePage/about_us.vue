<template>
    <section class="content">
        <div class="banner">
          <swiper :options="swiperOption" style="height: 100%">
            <swiper-slide v-for="(item,index) in bannerImg" :key="index" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <!--<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>-->
            <!--<div class="swiper-button-next swiper-button-white" slot="button-next"></div>-->
          </swiper>
        </div>
        <div class="info">
          <div class="info_top">
            <img src="../../../static/img/aboutUs/1.png" alt="">
          </div>
          <div class="info_bot">
            <div class="main">
              <div class="video_left">
                <video controls :src="video_url"></video>
              </div>
              <div class="info_right">
                <p>金凯，从1997年诞生起，见证着木门行业的崛起与发展至今已逾20年历史。一路走来，我们始终坚持把“制造工艺与艺术美学”完美的融合，为改善着全世界人们的家居生活环境作贡献。</p>
                <p>金凯，从1997年诞生起，见证着木门行业的崛起与发展至今已逾20年历史。一路走来，我们始终坚持把“制造工艺与艺术美学”完美的融合，为改善着全世界人们的家居生活环境作贡献。</p>
                <p>金凯秉承工匠精神，把传统工艺结合现代技术，为消费者呈现完美的产品</p>
                <p>金凯秉承工匠精神，把传统工艺结合现代技术，为消费者呈现完美的产品</p>
              </div>
            </div>
          </div>
        </div>
      <div class="course">
        <div class="info_top">
          <img src="../../../static/img/aboutUs/2.png" alt="">
        </div>
        <div class="course_bot">
          <swiper :options="swiperOption2" style="height: 100%">
            <swiper-slide v-for="(item,index) in historyImg" :key="index" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </div>
      <div class="dynamic_state">
        <div class="info_top">
          <img src="../../../static/img/aboutUs/3.png" alt="">
        </div>
        <div class="info_bot">
          <div class="main">
            <div class="info_left dynamic_state_left">
              <div>
                <div>
                  <img src="../../../static/img/aboutUs/tu_08.jpg" alt="">
                </div>
                <p>如何挑选最适合你的那块木材？</p>
                <span>黄花梨，檀香木，水曲柳，这些耳熟能详的上等木材，你都了解几何？那块最适合用来装饰自己等门面？</span>
                <router-link to="">查看详情</router-link>
              </div>
            </div>
            <div class="info_right">
              <ul>
                <router-link tag="li" to="" v-for="(item,index) in dynamicData" :key="index">
                  <span>{{item.id}}.</span>
                  <span>{{item.title}}</span>
                </router-link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="honor">
        <div class="honor_top">
          <img src="../../../static/img/aboutUs/4.png" alt="">
        </div>
        <div class="honor_bot">
          <div class="main">
            <swiper :options="swiperOption3" style="height: 100%">
              <swiper-slide v-for="(item,index) in honorImg" :key="index" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
        </div>
      </div>
      <div class="honor partner">
        <div class="honor_top">
          <img src="../../../static/img/aboutUs/5.png" alt="">
        </div>
        <div class="honor_bot">
          <div class="main">
            <img src="../../../static/img/aboutUs/hezuo_10.png" alt="">
          </div>
        </div>
      </div>
    </section>
</template>

<script>
    export default {
        name: "about_us",
      data() {
          return {
            video_url:'../../../static/img/1.mp4',
            bannerImg:[
              {name:'one',url:'../../../static/img/aboutUs/banner_01.png'},
              {name:'one',url:'../../../static/img/aboutUs/banner_04.jpg'}
            ],
            historyImg:[
              {name:'one',url:'../../../static/img/index/lishi_1.png'},
              {name:'one',url:'../../../static/img/index/lishi_2.png'},
              {name:'one',url:'../../../static/img/index/lishi_3.png'},
              {name:'one',url:'../../../static/img/index/lishi_4.png'},
            ],
            dynamicData:[
              {id:'1',title:"重大新闻重大新闻重大新闻重大新闻重大新闻重大新闻重大新闻重大新闻"},
              {id:'2',title:"重大新闻重大新闻重大新闻重大新闻"},
              {id:'3',title:"重大新闻重大新闻重大新闻重大新闻"},
              {id:'4',title:"重大新闻重大新闻重大新闻重大新闻"},
              {id:'5',title:"重大新闻重大新闻重大新闻重大新闻"},
              {id:'6',title:"重大新闻重大新闻重大新闻重大新闻"},
              {id:'7',title:"重大新闻重大新闻重大新闻重大新闻"},
              {id:'8',title:"重大新闻重大新闻重大新闻重大新闻"},
              {id:'9',title:"重大新闻重大新闻重大新闻重大新闻"},
              {id:'10',title:"重大新闻重大新闻重大新闻重大新闻"}
              ],
            honorImg:[
              {name:'one',url:'../../../static/img/aboutUs/honor1.png'},
              {name:'one',url:'../../../static/img/aboutUs/honor2.png'},
              {name:'one',url:'../../../static/img/aboutUs/honor3.jpg'},
              {name:'one',url:'../../../static/img/aboutUs/honor4.png'},
              {name:'one',url:'../../../static/img/aboutUs/honor5.png'},
              {name:'one',url:'../../../static/img/aboutUs/honor6.png'},
              {name:'one',url:'../../../static/img/aboutUs/honor7.png'},
              {name:'one',url:'../../../static/img/aboutUs/honor8.png'}
            ],
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
            swiperOption2: {
              slidesPerView: 3,
              grabCursor: true,  //手势
              freeMode: true,
              pagination: {   //轮播点
                el: '.swiper-pagination',
                dynamicBullets: true
              },
              autoplay: {
                delay: 5000,
                disableOnInteraction: false
              }
            },
            swiperOption3: {
              slidesPerView: 3,
              slidesPerColumn: 2,
              loop: true,
              spaceBetween: 30,
              autoplay: {
                delay: 5000,
                disableOnInteraction: false
              },
              pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true
                // clickable: true
              }
            }
          }
      }
    }
</script>

<style scoped>
  .banner{
    height: 600px;
  }
  .info{
    margin-bottom: 100px;
  }
  .info_top,.honor_top{
    padding: 80px 0 45px;
  }
  .course .info_top{
    padding-bottom: 0;
  }
  .info_bot{
    height: 408px;
  }
  .info_bot>.main{
    height: 100%;
    /*background: #d23c26;*/
  }
  .video_left{
    width: 60%;
    float: left;
    height: 100%;
  }
  .video_left>video{
    height: 100%;
    width: 100%;
    object-fit: fill;
  }
  .info .info_right{
    width: 40%;
    box-sizing: border-box;
    padding: 0 0 0 50px;
    text-align: left;
    color: #333;
    float: left;
    text-indent: 2em;
    line-height: 30px;
    letter-spacing: 2px;
    position: relative;
  }
  .info .info_right::after{
    display: block;
    content: '';
    width: 49px;
    height: 45px;
    background: #CFA972;
    position: absolute;
    bottom: -38px;
    right: 0;
    background: url("../../../static/img/aboutUs/icon_02.png") no-repeat center/cover;
  }
  .course{
    background: url("../../../static/img/aboutUs/banner_04.jpg") no-repeat center/cover;
  }
  .course_bot{
    width: 1200px;
    margin: 0 auto;
    height: 540px;
    padding: 72px 0;
    box-sizing: border-box;
  }
  .dynamic_state{
    margin-bottom: 90px;
  }
  .dynamic_state>.info_bot{
    height: 495px;
  }
  .dynamic_state>.info_bot>.main>div{
    border-radius: 8px;
    overflow: hidden;
  }
  .dynamic_state .info_left{
    width: 63%;
    height: 100%;
    float: left;
    background:rgba(238,238,238,1);
    padding: 20px 25px;
    box-sizing: border-box;
  }
  .dynamic_state .info_right{
    width: 35%;
    height: 100%;
    float: right;
    border: 1px solid #CFA972;
    padding: 20px 25px;
    box-sizing: border-box;
  }
  .info_right>ul{
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
    text-align: left;
    height: 100%;
  }
  .info_right>ul>li{
    line-height: 40px;
    letter-spacing: 1px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  .info_right>ul>li:hover{
    color: #CFA972;
  }
  .info_right>ul::-webkit-scrollbar{
    display: none;
  }
  .dynamic_state_left{
    text-align: left;
    position: relative;
  }
  .dynamic_state_left>div>div{
    height: 310px;
    border-radius: 8px;
    overflow: hidden;
  }
  .dynamic_state_left>div>div>img{
    width: 100%;
    height: 100%;
    display: block;
    transition: 1s;
  }
  .dynamic_state_left>div>div>img:hover{
    transform: scale(1.1);
  }
  .dynamic_state_left>div>p{
    line-height: 30px;
    margin: 20px 0;
    font-size: 24px;
    color: #333;
    border-left: 8px solid #CFA972;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .dynamic_state_left>div>span{
    display: block;
    font-size: 16px;
    color: #555;
    text-align: left;
  }
  .dynamic_state_left>div>a{
    display: block;
    line-height: 30px;
    text-align: right;
    color: #714B37;
    position: absolute;
    right: 35px;
    bottom: 15px;
  }
  .dynamic_state_left>div>a:hover{
    color: #CFA972;
  }
  .honor{
   background: #eee;
  }
  .honor_bot{
    height: 650px;
  }
  .honor_bot>.main{
    height: 100%;
  }

  .honor_bot .swiper-container {
    height: auto!important;
    margin-left: auto;
    margin-right: auto;
  }
  .honor_bot .swiper-slide {
    height: 278px;
  }
  .partner{
    background: #fff;
  }
  .partner .honor_bot>.main>img{
    width: 100%;
  }
</style>

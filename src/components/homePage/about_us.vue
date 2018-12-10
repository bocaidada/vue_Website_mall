<template>
    <section class="content">
        <div class="banner">
          <swiper :options="swiperOptions" style="height: 100%">
            <swiper-slide v-for="(item,index) in bannerImg" :key="index" :style="{background: 'url('+serverBase+item.url+') no-repeat center/cover'}"></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <!--<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>-->
            <!--<div class="swiper-button-next swiper-button-white" slot="button-next"></div>-->
          </swiper>
        </div>
        <div class="info">
          <div class="info_top">
            <img :src="serverBase+'/aboutUs/1.png'" alt="">
          </div>
          <div class="info_bot">
            <div class="main">
              <div class="video_left">
                <video controls :src="video_url"></video>
              </div>
              <div class="info_right">
                <p>浙江金凯门业有限责任公司，创建于2005年，是国内较早具备研发、设计、生产、服务、销售，原木门、实木复合门、免漆门等木门产品的知名品牌企业。拥有两大生产基地，总占地面积200多亩，公司引进德国、荷兰、台湾等国内外一流的生产设备100多台，形成年产65万套室内门的生产能力。</p>
                  <!--  <p>企业率先在同行业中通过了ISO9001国际质量管理体系认证、ISO14001环境管理体系，CMS测量管理认证，CTC中国建材认证，中国木门健康认证。</p>-->
                      <p>两大生产基地巩固了金凯在国内外遥遥领先的市场份额。万科、金地、世茂、华润、和昌、越秀、中航里城、银亿、东原、中天、南京名万，南平建设等国内大型地产公司先后与公司成为战略合作伙伴，产品远销五大洲四大洋，获得了欧美国家的高度认可。</p>
                    <p> “打造中国木门一流品牌”是金凯人不懈的追求。</p>
              </div>
            </div>
          </div>
        </div>
      <div class="course">
        <div class="info_top">
          <img :src="serverBase+'/aboutUs/2.png'" alt="">
        </div>
        <div class="course_bot">
          <swiper :options="swiperOption2" style="height: 100%">
            <swiper-slide v-for="(item,index) in historyImg" :key="index" :style="{background: 'url('+serverBase+item.url+') no-repeat center/cover'}"></swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </div>
      <div class="dynamic_state">
        <div class="info_top">
          <img :src="serverBase+'/aboutUs/3.png'" alt="">
        </div>
        <div class="info_bot">
          <div class="main">
            <div class="info_left dynamic_state_left">
              <div v-if="dynamicData.list ">
                <div>
                  <!--<img src="../../../static/img/aboutUs/tu_08.jpg" alt="">-->
                  <img :src="dynamicData.baseUrl+dynamicData.list[0].img" alt="">
                </div>
                <p>{{dynamicData.list[0].name}}</p>
                <span>{{dynamicData.list[0].summary}}</span>
                <router-link :to="{name:'news_detail',params: {id:dynamicData.list[0].id}}">查看详情</router-link>
              </div>
            </div>
            <div class="info_right">
              <ul v-if="dynamicData.list">
                <router-link tag="li" :to="{name:'news_detail',params: {id:item.id}}" v-for="(item,index) in dynamicData.list" :key="index">
                  <div v-if="index">
                    <span>{{index}}.</span>
                    <span>{{item.name}}</span>
                  </div>
                </router-link>
                <li v-if="dynamicData.list.length == 1" style="text-align: center">暂无最新行业资讯</li>
                <li style="text-align: center;color:#CFA972" v-if="moreFlag">查看更多</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="honor">
        <div class="honor_top">
          <img :src="serverBase+'/aboutUs/4.png'" alt="">
        </div>
        <div class="honor_bot">
          <div class="main">
            <swiper :options="swiperOption3" style="height: 100%">
              <swiper-slide v-for="(item,index) in honorImg" :key="index" :style="{background: 'url('+serverBase+item.url+') no-repeat center/cover'}"></swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
        </div>
      </div>
      <div class="honor partner">
        <div class="honor_top">
          <img :src="serverBase+'/aboutUs/5.png'" alt="">
        </div>
        <div class="honor_bot">
          <div class="main">
            <img :src="serverBase+'/aboutUs/hezuo_10.png'" alt="">
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
            serverBase:this.$store.state.qiNiuServer,
            moreFlag: false,
            video_url:'http://pifi5lc1c.bkt.clouddn.com/media/video/jkmy.mp4',
            bannerImg:[
              {name:'one',url:'/aboutUs/banner_01.png'}
            ],
            historyImg:[
              {name:'one',url:'/index/lishi_5.png'},
              {name:'one',url:'/index/lishi_6.png'},
              {name:'one',url:'/index/lishi_7.png'},
              {name:'one',url:'/index/lishi_8.png'},
            ],
            dynamicData:[],
            honorImg:[
              {name:'one',url:'/aboutUs/honor1.png'},
              {name:'one',url:'/aboutUs/honor2.png'},
              {name:'one',url:'/aboutUs/honor3.jpg'},
              {name:'one',url:'/aboutUs/honor4.png'},
              {name:'one',url:'/aboutUs/honor5.png'},
              {name:'one',url:'/aboutUs/honor6.png'},
              {name:'one',url:'/aboutUs/honor7.png'},
              {name:'one',url:'/aboutUs/honor8.png'}
            ],
            swiperOptions: {
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
      },
      created() {
        this.dataInit()
      },
      methods:{
         dataInit() {
           this.$http.get('newsAbout','').then((res)=>{
             console.log(res.data.data)
             if(res.data.data.list.length >10){
               this.moreFlag = true
             }
             this.dynamicData = res.data.data
           })
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
    height: 366px;
    width: 40%;
    box-sizing: border-box;
    padding: 0 0 0 35px;
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
    background: url("http://pifi5lc1c.bkt.clouddn.com/web/aboutUs/icon_02.png") no-repeat center/cover;
  }
  .course{
    background: url("http://pifi5lc1c.bkt.clouddn.com/web/aboutUs/banner_04.jpg") no-repeat center/cover;
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

<template>
  <section class="content">
    <div class="banner">
      <swiper :options="swiperOption" style="height: 100%">
        <swiper-slide v-for="(item,index) in bannerImg" :key="index" :style="{background: 'url('+serverBase+item.url+') no-repeat center/cover'}"></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </swiper>
    </div>
    <div class="moduleBox" id="purchase">
      <div class="mod_top">
        <img :src="serverBase+'/pinzhi/wenzi_icon_01.png'" alt="">
      </div>
      <div class="mod_bot">
        <img :src="serverBase+'/pinzhi/banner_02.png'" alt="">
      </div>
    </div>
    <div class="moduleBox" id="make">
      <div class="mod_top">
        <img :src="serverBase+'/pinzhi/wenzi_icon_02.png'" alt="">
      </div>
      <div class="mod_bot">
        <img :src="serverBase+'/pinzhi/banner_03.png'" alt="">
      </div>
    </div>
    <div class="brand" id="case">
      <div class="pro_title">
        <img :src="serverBase+'/pinzhi/wenzi_icon_03.png'" alt="">
      </div>
      <div class="main">
        <div class="pro_tab">
          <span v-for="(item,index) in brandData" :class="{hitColor: brandColor == item.id}" @click="brandChange(item.id)" :key="index">{{item.name}}</span>
        </div>
        <div class="brandBox">
          <router-link tag="div" :to="{name:'detail_case',params: {id:item.id}}" v-for="(item,index) in caseData" v-if="index < 3" :key="index">
            <div class="imgBox">
              <div class="box" :style="{background: 'url('+baseUrl+item.img+') no-repeat center/cover'}"></div>
            </div>
            <span class="name">
                <span>{{item.name}}</span>
              </span>
            <span class="info">{{item.summary}}</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="moduleBox" id="server" style="margin-bottom: 0">
      <div class="mod_top">
        <img :src="serverBase+'/pinzhi/wenzi_icon_04.png'" alt="">
      </div>
      <div class="mod_bot">
        <img :src="serverBase+'/pinzhi/banner_05.png'" alt="" style="display: block">
      </div>
    </div>
  </section>
</template>

<script>
    export default {
        name: "quality",
        data() {
            return {
              baseUrl:'',
              caseData:[],
              serverBase:this.$store.state.qiNiuServer,
              bannerImg:[
                {name:'one',url:'/pinzhi/banner_01.png'},
                {name:'one',url:'/pinzhi/banner_02.png'},
                {name:'one',url:'/pinzhi/banner_03.png'},
                {name:'one',url:'/pinzhi/banner_05.png'}
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
              brandColor: 1,
              brandData:[
                {id:1,name:'工程案例'},
                {id:2,name:'门店案例'},
                {id:3,name:'外销案例'}
              ]
            }
        },
      created() {

      },
      mounted() {
        this.caseList(this.brandColor,1)
      },
      methods: {
        brandChange(index) {
          this.brandColor = index
          this.caseList(index,1)
        },
        caseList(types,pages) {
          this.$http.get('caseList',{type:types,page:pages}).then((res)=>{
            // console.log(res.data.data)
            this.totalNum = res.data.data.counts
            this.baseUrl = res.data.data.baseUrl
            this.caseData = res.data.data.list
          })
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
  /*.moduleBox>.mod_bot{*/
    /*height: 600px;*/
  /*}*/
  .moduleBox>.mod_bot>img{
    width: 100%;
  }
  .brand{
    text-align: center;
    padding: 60px 0 80px;
    /*background:rgba(251,251,251,1);*/
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
    height: 450px;
    box-sizing: border-box;
    padding-top: 60px;
  }
  .brandBox>div{
    width: 28%;
    margin-bottom: 60px;
    text-align: left;
    padding: 0 0 20px;
    cursor: pointer;
    float: left;
    margin-right: 8%;
    box-shadow: 3px 3px 46px 3px rgba(131,121,115,0.15);
    transition: 1s;
    border-radius: 4px;
    overflow: hidden;
  }
  .brandBox>div:nth-child(3n){
    margin-right: 0;
  }
  .brandBox>div>.imgBox{
    height: 250px;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
  }
  .brandBox>div>.imgBox>.box{
    height: 100%;
    transition: 1s;
  }
  .brandBox>div:hover .box{
    transform: scale(1.1);
  }
  .brandBox>div>span{
    display: block;
    padding: 0 15px;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .brandBox>div>.name{
    line-height: 50px;
    font-size: 18px;
    margin-top: 10px;
  }
  .brandBox>div>.name>span{
    border-left: 4px solid #CFA972;
    padding-left: 10px;
  }
  .brandBox>div>.info{
    line-height: 20px;
    font-size: 14px;
    color: #999;
  }
  #server{
    margin-bottom: 80px;
  }
  @media screen and (max-width: 1600px) {
    .banner,.moduleBox>.mod_bot{
      height: 550px;
    }
  }
  @media screen and (max-width: 1300px) {
    .banner,.moduleBox>.mod_bot{
      height: 500px;
    }
  }
</style>

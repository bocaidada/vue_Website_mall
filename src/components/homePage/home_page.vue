<template>
    <section class="content">
      <div class="banner">
        <swiper v-if="indexDataInit.banner" :options="swiperOption" style="height: 100%">
          <swiper-slide v-for="(item,index) in indexDataInit.banner" :key="index" :style="{background: 'url('+indexDataInit.baseImgUrl+item.img+') no-repeat center/cover'}">
            <a style="display: block;width: 100%;height: 100%" :href="item.url" target="_blank"></a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <!--<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>-->
          <!--<div class="swiper-button-next swiper-button-white" slot="button-next"></div>-->
        </swiper>
      </div>
      <div class="productStyle">
        <div class="pro_title">
          <img :src="serverBase+'/index/index_1.png'" alt="">
        </div>
        <div class="pro_tab">
          <span v-for="(item,index) in indexDataInit.goods" :class="{hitColor:productStyleColor == index}" @click="change(index)">{{item.name}}</span>
        </div>
        <div class="pro_box product_box">
          <router-link tag="div" :title="item.name" :to="{name:'product_detail',params: {id:item.id}}" v-for="(item,index) in styleData" :key="index" :style="{background: 'url('+indexDataInit.baseImgUrl+item.img+') no-repeat center/cover'}"></router-link>
        </div>
      </div>
      <div class="join">
        <div class="join_top">
          <div class="main">
            <span style="opacity: .5">{{time}}</span>
            <img class="logo" :src="serverBase+'/logo.png'" alt="">
            <img class="hit" :src="serverBase+'/index/index_7.png'" alt="">
          </div>
        </div>
        <div class="join_bot">
          <div class="join_ban"></div>
          <div class="main">
            <div class="join_title">加盟我们</div>
            <div class="join_content">
              <div><img :src="serverBase+'/index/jiameng_1.png'" alt=""></div>
              <div><img :src="serverBase+'/index/jiameng_2.png'" alt=""></div>
              <div><img :src="serverBase+'/index/jiameng_3.png'" alt=""></div>
            </div>
            <div class="join_see">
              <!--<span>查看详情</span>-->
              <router-link to="/offline_store">查看详情</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="productStyle brand">
        <div class="pro_title">
          <img :src="serverBase+'/index/index_9.png'" alt="">
        </div>
        <div class="pro_tab">
          <span v-for="(item,index) in brandData" :class="{hitColor: brandColor == index}" @click="brandChange(index)">{{item.name}}</span>
        </div>
        <div class="pro_box brandBox">
           <div v-show="brandColor == 0" class="state">
              <div class="main">
                <div v-for="(item, index) in indexDataInit.news" :key="index" v-if="index < 3">
                  <div :title="item.name">
                    <img v-if="item.img" :src="indexDataInit.baseImgUrl+item.img" alt="">
                    <img v-else :src="$store.state.qiNiuServer+'/empty_place.png'" alt="">
                  </div>
                  <p>{{item.name}}</p>
                  <span>{{item.summary}}</span>
                  <router-link :to="{name:'news_detail',params: {id:item.id}}">查看详情</router-link>
                </div>
              </div>
           </div>
           <div v-show="brandColor == 1" class="history">
             <div class="main">
               <swiper :options="swiperOption2" style="height: 100%">
                 <swiper-slide v-for="(item,index) in historyImg" :key="index" :style="{background: 'url('+serverBase+item.url+') no-repeat center/cover'}"></swiper-slide>
                 <div class="swiper-pagination" slot="pagination"></div>
               </swiper>
             </div>
           </div>
           <div v-show="brandColor == 2" class="culture">
             <div class="main"></div>
           </div>
           <div v-show="brandColor == 3" class="partner">
             <div class="main">
               <img :src="serverBase+'/index/partner.png'" alt="">
             </div>
           </div>
        </div>
      </div>
      <div class="recruit">
        <div class="rec_top">
          <img :src="serverBase+'/index/zhaoxiannashi.png'" alt="">
        </div>
        <div class="rex_bot">
          <ul>
            <li>
              <img :src="serverBase+'/logo.png'" alt="">
            </li>
            <li class="txt">
              <div :style="'background: url('+serverBase+'/index/index_15.png) no-repeat center/cover'">
              </div>
              <img :src="serverBase+'/index/01_tuanduiwenhua.png'" alt="">
            </li>
            <li class="textInfo">
              <span>我们始终相信梦想到力量，<br>并为之奋斗。<br>如果你一样坚韧不屈，<br>一样曾经踌躇满志，<br>别再犹豫。</span>
            </li>
            <li class="txt">
              <div :style="'background: url('+serverBase+'/index/index_16.png) no-repeat center/cover'"></div>
              <img :src="serverBase+'/index/02_jiaruwomen.png'" alt="">
            </li>
            <li class="textInfo">
            <span>做门，<br>
            我们只用最好的木材<br>
            但，我们更需要最好的人才<br>
            来金凯<br>
            给你一个实现梦想的舞台<br>
            大门永远敞开</span>
            </li>
            <li>
              <div :style="'background: url('+serverBase+'/index/index_17.png) no-repeat center/cover'"></div>
              <img :src="serverBase+'/index/05_logo.png'" alt="">
            </li>
            <li>
              <div :style="'background: url('+serverBase+'/index/index_19.png ) no-repeat center/cover'"></div>
              <img :src="serverBase+'/index/05_logo.png'" alt="">
            </li>
            <li class="textInfo">
             <span>我们不止做门<br>
              更会给你一个温馨的家<br>
              一扇永远照射出阳光的门<br>
              这里<br>
              就是家园</span>
            </li>
            <li class="txt">
              <div :style="'background: url('+serverBase+'/index/index_20.png) no-repeat center/cover'"></div>
              <img :src="serverBase+'/index/03_xinchoufuli.png'" alt="">
            </li>
            <li class="textInfo">
              <span>做门，<br>
              我们只用最好的木材<br>
              但，我们更需要最好的人才<br>
              来金凯<br>
              给你一个实现梦想的舞台<br>
              大门永远敞开</span>
            </li>
            <li class="txt">
              <div :style="'background: url('+serverBase+'/index/index_21.png) no-repeat center/cover'"></div>
              <img :src="serverBase+'/index/04_jinkaimumen.png'" alt="">
            </li>
            <li>
              <img :src="serverBase+'/logo.png'" alt="">
            </li>
          </ul>
        </div>
      </div>
      <div class="aboutUs">
        <div class="about_top">
          <img :src="serverBase+'/index/index_5.png'" alt="">
        </div>
        <div class="about_bot">
          <div class="main">
              <div class="about_bot_box left">
                <div class="left_top">
                  <span>300</span><span> +</span>
                </div>
                <p>超过300家的实体门店</p>
              </div>
              <div class="ban">
                <img :src="serverBase+'/index/index_6.png'" alt="">
              </div>
              <div class="about_bot_box center">
                <div class="left_top">
                  <span>800</span><span> +</span>
                </div>
                <p>超过800多人的精英团队</p>
              </div>
              <div class="ban">
                <img :src="serverBase+'/index/index_6.png'" alt="">
              </div>
              <div class="about_bot_box right">
                <div class="left_top">
                  <span>500</span><span> +</span>
                </div>
                <p>超过500多的成功案例</p>
              </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
    export default {
      name: "home_page",
      data() {
        return {
          serverBase:this.$store.state.qiNiuServer,
          indexDataInit:{},
          time:new Date().getFullYear(),
          productStyleColor: 0,
          brandColor:'0',
          brand_state_data:[],
          bannerImg:[],
          styleImg:[],
          historyImg:[
            {name:'one',url:'/index/lishi_1.png'},
            {name:'one',url:'/index/lishi_2.png'},
            {name:'one',url:'/index/lishi_3.png'},
            {name:'one',url:'/index/lishi_4.png'},
          ],
          swiperOption: {
            spaceBetween: 30,   //图片之间的间距
            loop: true,         //循环播放
            autoplay: {
              delay: 5000,
              disableOnInteraction: false
            },
            pagination: {   //轮播点
              el: '.swiper-pagination',
              dynamicBullets: true
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          },
          swiperOption2: {
            slidesPerView: 3,
            freeMode: true,
            pagination: {   //轮播点
              el: '.swiper-pagination',
              dynamicBullets: true
            }
          },
          styleData:[],
          brandData:[
            {name:'资讯'},
            {name:'历史'},
            {name:'文化'},
            {name:'合作伙伴'}
          ]
        }
      },
      created() {
        this.dataInit()
      },
      mounted() {
        setTimeout(()=>{
          this.$store.commit('footerFlag',true)
        },1000)
      },
      methods: {
        change(index) {
          this.productStyleColor = index
          this.styleData = this.indexDataInit.goods[index].item
        },
        brandChange(index) {
          this.brandColor = index
        },
        dataInit() {
          this.$http.get('index','').then((res)=>{
            if(res.data.code == 200) {
              this.indexDataInit = res.data.data
              this.styleData = res.data.data.goods[0].item
            }
          })
        }
      }
    }
</script>
<style>
  .swiper-pagination-bullet-active{
    background: #CFA972 !important;
  }
  .swiper-button-prev{
    left: 40px;
    background-image: url("http://pifi5lc1c.bkt.clouddn.com/web/index/index_3.png") !important;
  }
  .swiper-button-next{
    right: 40px;
    background-image: url("http://pifi5lc1c.bkt.clouddn.com/web/index/index_4.png") !important;
  }
</style>
<style scoped>
  .content{
    width: 100%;
  }
  .banner{
    width: 100%;
    height: 84vh;
    background: #fff;
  }
  .banner a{
    display: block;
    width: 100%;
    height: 100%;
  }

  .productStyle{
     text-align: center;
     padding: 60px 0 80px;
    background: rgba(246,246,246,1);
  }
  .pro_tab{
    height: 45px;
    line-height: 45px;
    color: #959595;
    font-size: 30px;
    margin: 50px 0;
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
  .pro_box,.product_box{
    width: 1200px;
    height: 360px;
    margin: 0 auto;
    cursor: pointer;
  }
  .product_box{
    display: flex;
    justify-content: space-between;
  }
  .product_box>div{
    width: 360px;
    height: 100%;
    background: #fff;
  }
  .join_top{
    height: 150px;
    background: #fff;
    line-height: 150px;
    color: #DABA8C;
    font-size: 72px;
    position: relative;
  }
  .join_top span{
    float: left;
  }
  .join_top .logo{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .join_top .hit{
    float: right;
    height: 90%;
    margin-top: 7px;
  }
  .join_bot{
    height: 850px;
    position: relative;
    background: rgba(255,255,255,.1);
  }
  .join_bot .join_ban{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url("http://pifi5lc1c.bkt.clouddn.com/web/index/index_13.jpg") no-repeat center/cover;
    z-index: -1;
  }
  .join_title{
    color: #7E6B5A;
    font-size: 36px;
    line-height: 150px;
    margin-bottom: 30px;
  }
  .join_content{
    width: 100%;
    height: 540px;
    display: flex;
    justify-content: space-between;
  }
  .join_content>div{
    width: 30%;
    height: 100%;
    border-radius: 8px;
  }
  .join_content>div>img{
    width: 100%;
  }
  .join_see{
    height: 60px;
  }
  .join_see>a{
    display: block;
    width: 260px;
    height: 100%;
    border-radius: 30px;
    background:rgba(255,255,255,.8);
    line-height: 60px;
    text-align: center;
    font-size: 26px;
    color: #7E6B5A;
    cursor: pointer;
    margin: 0 auto;
  }
  .join_see>span:hover{
    color: #CFA972;
  }
  .brand{
    background: #fff;
  }
  .brandBox{
    width: 100%;
    height: 540px;
    position: relative;
    margin-top: 30px;
  }
  .brandBox>div{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    width: 1200px;
    height: 100%;
  }
  .brandBox>.culture{
    width: 100%;
    background: url("http://pifi5lc1c.bkt.clouddn.com/web/index/wenhua.jpg") no-repeat center/cover;
  }
  .brandBox>.partner{
    width: 100%;
    background: rgba(241,241,241,1);
  }
  .brandBox .main{
    position: relative;
  }
  .brandBox>.partner>.main{
    padding: 50px 0;
    box-sizing: border-box;
  }
  .brandBox>.state>.main::before,.brandBox>.culture>.main::before,.brandBox>.partner>.main::before{
    display: block;
    content: '';
    position: absolute;
    top: -40px;
    right: 15%;
    width: 0;
    height: 0;
    border-width: 25px;
    border-style: solid;
    border-color: transparent  transparent  #efefef transparent;/* 红 黄 蓝 绿 */
  }
  .brandBox>.partner>.main::before{
    right: 15%;
  }
  .brandBox>.state>.main::before{
    left: 12%;
  }
  .brandBox>.culture>.main::before{
    border-color: transparent  transparent  #130702 transparent;/* 红 黄 蓝 绿 */
    right: 40%;
  }
  .brandBox>.partner img{
    height: 100%;
  }
  .history{
    padding: 72px 0;
    box-sizing: border-box;
  }
  .brandBox>.state{
    width: 100%;
    height: 100%;
    z-index: 1;
    background:rgba(238,238,238,1);
    box-sizing: border-box;
  }
  .brandBox>.state>.main{
    padding: 60px 0 20px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .brandBox>.state>.main>div{
    width: 30%;
    height: 100%;
    position: relative;
  }
  .brandBox>.state>.main>div>div{
    height: 288px;
    border-radius: 8px;
    overflow: hidden;
  }
  .brandBox>.state>.main>div>div>img{
    width: 100%;
    display: block;
    transition: 1s;
  }
  .brandBox>.state>.main>div>div>img:hover{
    transform: scale(1.2);
  }
  .brandBox>.state>.main>div>p{
    width: 100%;
    line-height: 30px;
    margin: 20px 0;
    font-size: 24px;
    color: #333;
    border-left: 8px solid #CFA972;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-left: 15px;
    text-align: left;
  }
  .brandBox>.state>.main>div>span{
    display: block;
    font-size: 16px;
    color: #555;
    text-align: left;
  }
  .brandBox>.state>.main>div>a{
    display: block;
    line-height: 30px;
    text-align: right;
    color: #714B37;
    position: absolute;
    right: 0;
    bottom: 5px;
  }
  .brandBox>.state>.main>div>a:hover{
    color: #CFA972;
  }
  .recruit{
    width: 100%;
    height: auto;
    background: #fff;
  }
  .rec_top{
    padding: 30px 0;
  }
  .rec_top>img{
    width: auto;
    margin: 0 auto;
  }
  .rex_bot{
    width: 100%;
    /*height: 640px;*/
    padding-top: 60px;
  }
  .rex_bot>ul{
    width: 100%;
    /*height: 100%;*/
    overflow: hidden;
  }
  .rex_bot>ul>li{
    width: 16.66%;
    height: 32vh;
    float: left;
    overflow: hidden;
    background: #FDF6ED;
    position: relative;
  }
  .textInfo{
    box-sizing: border-box;
    padding: 40px 10px 0 30px;
    position: relative;
    line-height: 28px;
    text-align: left;
    font-size: 16px;
  }
  .rex_bot>ul>li>div{
    width: 100%;
    height: 100%;
    transition: 1s;
  }
  .rex_bot>ul>li:hover div{
    transform: scale(1.1);
  }
  .rex_bot>ul>.txt>img{
    width: 50%;
  }
  .rex_bot>ul>li>img{
    height: auto;
    /*width: 40%;*/
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-45%,-45%);
  }
  li:nth-child(2)::after,li:nth-child(4)::after{
    display: block;
    content: '';
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-width: 25px;
    border-style: solid;
    border-color: transparent #FDF6ED transparent transparent;/* 红 黄 蓝 绿 */
  }
  li:nth-child(9)::after,li:nth-child(11)::before{
    display: block;
    content: '';
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-width: 25px;
    border-style: solid;
    border-color: transparent  transparent transparent #FDF6ED;/* 红 黄 蓝 绿 */
    z-index: 1;
  }
  .aboutUs{
    background: #fff;
  }
  .about_top{
    height: 400px;
    position: relative;
  }
  .about_top>img{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: auto;
  }
  .about_bot{
    width: 100%;
    height: 400px;
  }
  .about_bot>.main>div{
    float: left;
    height: 100%;
  }
  .about_bot_box{
    width: 28%;
    background: #fff;
  }
  .about_bot .ban{
    width: 8%;
    position: relative;
  }
  .about_bot .ban>img{
    width: auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 25%;
  }
  .about_bot>.main>.about_bot_box>.left_top{
    width: 220px;
    height: 220px;
    border-radius: 50%;
    border: 2px solid #DABA8C;
    text-align: center;
    line-height: 220px;
    color: #DABA8C;
    font-size: 36px;
    margin: 0 auto;
  }
  .about_bot>.main>.about_bot_box>p{
    line-height: 120px;
    font-size: 18px;
    color: #666;
  }
  @media screen and (max-width: 1660px) {
  .banner{
    height: 72vh !important;
    }
    .rex_bot>ul>li{
      height: 30vh;
    }
  }
  @media screen and (max-width: 1460px) {
    .banner{
      height: 65vh !important;
    }
    .rex_bot>ul>li{
      height: 28vh;
    }
    .textInfo{
      line-height: 26px;
      font-size: 15px;
    }
  }
  @media screen and (max-width: 1260px) {
    .banner{
      height: 55vh !important;
    }
    .rex_bot>ul>li{
      height: 26vh;
    }
    .textInfo{
      line-height: 24px;
      font-size: 14px;
    }
  }
</style>

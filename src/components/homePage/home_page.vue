<template>
    <section class="content">
      <div class="banner">
        <swiper :options="swiperOption" style="height: 100%">
        <!--<swiper :options="swiperOption" style="height: auto">-->
          <swiper-slide v-for="(item,index) in bannerImg" :key="index" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <!--<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>-->
          <!--<div class="swiper-button-next swiper-button-white" slot="button-next"></div>-->
        </swiper>
      </div>
      <div class="productStyle">
        <div class="pro_title">
          <img src="../../../static/img/index/index_1.png" alt="">
        </div>
        <div class="pro_tab">
          <span v-for="(item,index) in styleData" :class="{hitColor:productStyleColor == index}" @click="change(index)">{{item.name}}</span>
        </div>
        <div class="pro_box">
          <!--<div class="pro_box_ban">-->
            <swiper :options="swiperOption1" style="height: 100%;padding:0 277px">
              <swiper-slide v-for="(item,index) in styleImg" :key="index" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></swiper-slide>
              <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
              <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            </swiper>
          <!--</div>-->
        </div>
      </div>
      <div class="join">
        <div class="join_top">
          <main class="main">
            <span style="opacity: .5">{{time}}</span>
            <img class="logo" src="../../../static/img/logo.png" alt="">
            <img class="hit" src="../../../static/img/index/index_7.png" alt="">
          </main>
        </div>
        <div class="join_bot">
          <div class="join_ban"></div>
          <main class="main">
            <div class="join_title">加盟我们</div>
            <div class="join_content">
              <div><img src="../../../static/img/index/jiameng_1.png" alt=""></div>
              <div><img src="../../../static/img/index/jiameng_2.png" alt=""></div>
              <div><img src="../../../static/img/index/jiameng_3.png" alt=""></div>
            </div>
            <div class="join_see">
              <span>查看详情</span>
            </div>
          </main>
        </div>
      </div>
      <div class="productStyle brand">
        <div class="pro_title">
          <img src="../../../static/img/index/index_9.png" alt="">
        </div>
        <div class="pro_tab">
          <span v-for="(item,index) in brandData" :class="{hitColor: brandColor == index}" @click="brandChange(index)">{{item.name}}</span>
        </div>
        <div class="pro_box brandBox">
           <div v-show="brandColor == 0" class="state">
              <main class="main">
                <div>
                  <div>
                    <img src="../../../static/img/index/dongtai_1.png" alt="">
                  </div>
                  <p>如何挑选最适合你的那块木材？</p>
                  <span>黄花梨，檀香木，水曲柳，这些耳熟能详的上等木材，你都了解几何？那块最适合用来装饰自己等门面？</span>
                  <router-link to="">查看详情</router-link>
                </div>
                <div>
                  <div>
                    <img src="../../../static/img/index/dongtai_2.png" alt="">
                  </div>
                  <p>家居木门，哪个步骤最费事？</p>
                  <span>查了攻略，跑了门店，挑好了木材，付了定金，但你知道自己但专属木门进展到哪步了么？</span>
                  <router-link to="">查看详情</router-link>
                </div>
                <div>
                  <div>
                    <img src="../../../static/img/index/dongtai_3.png" alt="">
                  </div>
                  <p>木门与桌面，哪个成本更高？</p>
                  <span>木式桌面质朴风雅，不尽清新又小资，更加环保健康，与木门比起来，想要定制木式桌面需要了解那些？</span>
                  <router-link to="">查看详情</router-link>
                </div>
              </main>
           </div>
           <div v-show="brandColor == 1" class="history">
             <main class="main">
               <swiper :options="swiperOption2" style="height: 100%">
                 <swiper-slide v-for="(item,index) in historyImg" :key="index" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></swiper-slide>
                 <div class="swiper-pagination" slot="pagination"></div>
               </swiper>
             </main>
           </div>
           <div v-show="brandColor == 2" class="culture">
             <main class="main"></main>
           </div>
           <div v-show="brandColor == 3" class="partner">
             <main class="main">
               <img src="../../../static/img/index/partner.png" alt="">
             </main>
           </div>
        </div>
      </div>
      <div class="recruit">
        <div class="rec_top">
          <img src="../../../static/img/index/zhaoxiannashi.png" alt="">
        </div>
        <div class="rex_bot">
          <ul>
            <li>
              <img src="../../../static/img/logo.png" alt="">
            </li>
            <li class="txt">
              <div style="background: url('../../../static/img/index/index_15.png') no-repeat center/cover">
              </div>
              <img src="../../../static/img/index/01_tuanduiwenhua.png" alt="">
            </li>
            <li>

            </li>
            <li class="txt">
              <div style="background: url('../../../static/img/index/index_16.png ') no-repeat center/cover"></div>
              <img src="../../../static/img/index/02_jiaruwomen.png" alt="">
            </li>
            <li>

            </li>
            <li>
              <div style="background: url('../../../static/img/index/index_17.png ') no-repeat center/cover"></div>
              <img src="../../../static/img/index/05_logo.png" alt="">
            </li>
            <li>
              <div style="background: url('../../../static/img/index/index_19.png ') no-repeat center/cover"></div>
              <img src="../../../static/img/index/05_logo.png" alt="">
            </li>
            <li>

            </li>
            <li class="txt">
              <div style="background: url('../../../static/img/index/index_20.png ') no-repeat center/cover"></div>
              <img src="../../../static/img/index/03_xinchoufuli.png" alt="">
            </li>
            <li>

            </li>
            <li class="txt">
              <div style="background: url('../../../static/img/index/index_21.png ') no-repeat center/cover"></div>
              <img src="../../../static/img/index/04_jinkaimumen.png" alt="">
            </li>
            <li>
              <img src="../../../static/img/logo.png" alt="">
            </li>
          </ul>
        </div>
      </div>
      <div class="aboutUs">
        <div class="about_top">
          <img src="../../../static/img/index/index_5.png" alt="">
        </div>
        <div class="about_bot">
          <main class="main">
              <div class="about_bot_box left">
                <div class="left_top">
                  <span>300</span><span> +</span>
                </div>
                <p>超过300家的实体门店</p>
              </div>
              <div class="ban">
                <img src="../../../static/img/index/index_6.png" alt="">
              </div>
              <div class="about_bot_box center">
                <div class="left_top">
                  <span>800</span><span> +</span>
                </div>
                <p>超过800多人的精英团队</p>
              </div>
              <div class="ban">
                <img src="../../../static/img/index/index_6.png" alt="">
              </div>
              <div class="about_bot_box right">
                <div class="left_top">
                  <span>500</span><span> +</span>
                </div>
                <p>超过500多的成功案例</p>
              </div>
          </main>
        </div>
      </div>
    </section>
</template>

<script>
    export default {
      name: "home_page",
      data() {
        return {
          time:new Date().getFullYear(),
          productStyleColor:'1',
          brandColor:'0',
          bannerImg:[
            {name:'one',url:'../../../static/img/index/ban1.jpg'},
            {name:'two',url:'../../../static/img/Ban1.png'},
            {name:'one',url:'../../../static/img/index/ban1.jpg'}
          ],
          styleImg:[
            {name:'one',url:'../../../static/img/index/index_2.png'},
            {name:'one',url:'../../../static/img/index/index_2.png'},
            {name:'one',url:'../../../static/img/index/index_2.png'}
          ],
          historyImg:[
            {name:'one',url:'../../../static/img/index/lishi_1.png'},
            {name:'one',url:'../../../static/img/index/lishi_2.png'},
            {name:'one',url:'../../../static/img/index/lishi_3.png'},
            {name:'one',url:'../../../static/img/index/lishi_4.png'},
          ],
          swiperOption: {
            spaceBetween: 30,   //图片之间的间距
            loop: true,         //循环播放
            grabCursor: true,  //手势
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
          swiperOption1: {
            direction: 'vertical',
            spaceBetween: 30,   //图片之间的间距
            loop: true,         //循环播放
            grabCursor: true,  //手势
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
            freeMode: true,
            pagination: {   //轮播点
              el: '.swiper-pagination',
              dynamicBullets: true
            }
          },
          styleData:[
            {name:'新款'},
            {name:'爆款'},
            {name:'整木'}
          ],
          brandData:[
            {name:'动态'},
            {name:'历史'},
            {name:'文化'},
            {name:'合作伙伴'}
          ]
        }
      },
      methods: {
        change(index) {
          this.productStyleColor = index
        },
        brandChange(index) {
          this.brandColor = index
        }
      }
    }
</script>
<style>
  .swiper-pagination-bullet-active{
    background: #CFA972;
  }
  .swiper-button-prev{
    left: 40px;
    background-image: url("../../../static/img/index/index_3.png") !important;
  }
  .swiper-button-next{
    right: 40px;
    background-image: url("../../../static/img/index/index_4.png") !important;
  }
</style>
<style scoped>
  .content{
    width: 100%;
  }
  .banner{
    width: 100%;
    height: 84vh;
    background: url("../../../static/img/index/ban1.jpg") no-repeat center/cover;
  }
  .banner a{
    display: block;
    width: 100%;
    height: 100%;
  }

  .productStyle{
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
  .pro_box{
    width: 1200px;
    height: 360px;
    margin: 0 auto;
  }
  .pro_box_ban{
    width: 625px;
    height: 100%;
    margin: 0 auto;
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
    background: url("../../../static/img/index/index_13.jpg") no-repeat center/cover;
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
  .join_see>span{
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
    background: url("../../../static/img/index/wenhua.jpg") no-repeat center/cover;
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
  .brandBox>.state>main{
    padding: 60px 0 20px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .brandBox>.state>main>div{
    width: 30%;
    height: 100%;
    position: relative;
  }
  .brandBox>.state>main>div>div{
    height: 288px;
    border-radius: 8px;
    overflow: hidden;
  }
  .brandBox>.state>main>div>div>img{
    width: 100%;
    display: block;
    transition: 1s;
  }
  .brandBox>.state>main>div>div>img:hover{
    transform: scale(1.2);
  }
  .brandBox>.state>main>div>p{
    line-height: 30px;
    margin: 20px 0;
    font-size: 24px;
    color: #333;
    border-left: 8px solid #CFA972;
  }
  .brandBox>.state>main>div>span{
    display: block;
    font-size: 16px;
    color: #555;
    text-align: left;
  }
  .brandBox>.state>main>div>a{
    display: block;
    line-height: 30px;
    text-align: right;
    color: #714B37;
    position: absolute;
    right: 0;
    bottom: 5px;
  }
  .brandBox>.state>main>div>a:hover{
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
  }
  @media screen and (max-width: 1260px) {
    .banner{
      height: 55vh !important;
    }
    .rex_bot>ul>li{
      height: 26vh;
    }
  }
</style>

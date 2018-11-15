<template>
    <div class="main">
      <div class="case_title">
        <router-link to="/quality">产品支持</router-link>
        <span> > </span>
        <router-link to="/project_case">案例</router-link>
        <span> > </span>
        <router-link to="/project_case" style="color: #CFA972">长沙城市花园</router-link>
      </div>
      <div class="case_content">
        <div class="box">
            <div class="box_ban">
              <swiper :options="swiperOption" style="height: 100%">
                <swiper-slide v-for="(item,index) in bannerImg" :key="index" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
            <div class="box_text">
              <p>随着国内人们日常生活水平的不断提高以及对生活品质的更高追求，实木门家居产品已越来越普遍的存在于人们的生活当中，对于一个如此贴近人们生活的家居用品，实木门家居的质量也受到了消费者前所未有的关注。目前，就有消费者投诉购买到以一般木材冒充高档木材的家具，如以黑芯木莲冒充柚木，或以橡胶木冒充橡木。</p>
              <p>注意区分实木门里的橡木和橡胶木</p>
               <p>别看橡胶木和橡木名字雷同，只差一个字，却代表两种不同的木材，质量和价格也相差千倍。某木门负责人表示：“消费者在选择实木复合门时，要考虑是不是贴皮的，或者是贴纸的。贴纸的话整个都是很平面的，没有质感，色彩、纹路立体感不强。而真正原木皮，它的纹路和立体感看起来很有层次，而且很自然。只要我们细心一点，仔细去看，用手去摸，都可以感觉得到。还有一点就是你看它是空心还是实心，一般来说我们敲敲它的声音，实心的话敲起来声音感觉有些闷，空心的话感觉有回响的声音，比较脆。还有的网友在概念里认为所有的实木门都是实木做的，其实不是这样的。真正的实木门我们叫原木门，是我们用整块木材来制作，现在大家也知道资源很缺乏，尤其是一些名贵木材。还有就是一些概念混淆，比如说橡木和橡胶木，在木材方面大家要明白什么是原木门，什么是实木门。”</p>
              <p>橡胶木就是生产橡胶的树木，属于亚热带树种，多分布于我国南部和东南亚广大地区。橡胶树成年以后每年都会流出汁液，这就是我们使用橡胶的原料。多年以后橡胶树不再产胶之后我们就把它的木材用来加工家具，这就是所谓的橡胶木。橡胶木也被广泛用于制作家具</p>
              <p>橡木广泛分布在北半球广大区域，木质优良，是做家具常见的材料，也是生产帖面化胶合板的理想用材，市场上橡木大致分为红橡与白橡二大类，花纹直纹和横纹的区别，直纹比较好看，价格也稍贵一些。高档的进口橡木的均价也是高的。</p>
                <p>先弄清材质再细签合同</p>
              <p> 2009年5月起实施的国家标准《木家具通用技术条件》中，将实木家具划分为全实木家具、实木家具和实木贴面家具。全实木家具就是所有零部件全是实木，也就是俗话说的“100%实木”。实木家具则是基材是实木，表面没有覆盖处理的家具，实木贴面家具则是在基材表面用实木单板或者薄木做贴面处理，内部基材大多为板材。</p>
              <p>业内人士介绍说，根据制作工艺与使用材料的不同，同一种木材的实木家具其价格也从几千元到上万元不等，有的价格甚至相差10倍。而除了全实木家具是环保的外，另两种实木家具在制作过程中或多或少都会用化学胶水进行粘合处理。柚木材色均一，油性光亮，各种水汽不易侵入，在复杂气候下不易变形，享有“万木之王”的美誉。因柚木稀有，价格较高，有不法商家以外观和密度与其相近的黑芯木莲来冒充。橡木制作的家具有厚重感，广泛应用于装潢家具制作中，但也有厂家以木材价格更低的橡胶木冒充。</p>
          </div>
        </div>
      </div>
      <div style="height: 40px;background: #efefef"></div>
    </div>
</template>

<script>
    export default {
      name: "detail_case",
      data() {
        return {
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
            }
          },
          bannerImg:[
            {name:'one',url:'../../../static/img/pinzhi/banner_01.png'},
            {name:'one',url:'../../../static/img/pinzhi/banner_02.png'},
            {name:'one',url:'../../../static/img/pinzhi/banner_03.png'},
            {name:'one',url:'../../../static/img/pinzhi/banner_04.png'},
            {name:'one',url:'../../../static/img/pinzhi/banner_05.png'},
          ]
        }
      },
      watch: {
        '$route' (to, from) {
          // 对路由变化作出响应...
          // console.log(to);
          // console.log(from);
        }
      },
      created() {
        console.log(this.$route.params.id);
      },
      methods: {}
    }
</script>

<style scoped>
  .main>.case_title{
    background: #efefef;
    line-height: 100px;
    height: 80px;
    text-align: left;
  }
  .main>.case_title>a{
    color: #333;
  }
  .main>.case_title>span{
    padding: 0 10px;
  }
  .case_content{
    padding: 20px 20px 40px;
    box-sizing: border-box;
    border-radius: 4px;
  }
  .case_content>.box{
    /*border:1px dashed #ccc;*/
    box-sizing: border-box;
    padding: 20px 25px;
  }
  .box_ban{
    height: 350px;
    margin-bottom: 30px;
    border-radius: 4px;
    overflow: hidden;
  }
  .box_text{
    text-align: left;
    width: 100%;
    padding-bottom: 60px;
  }
  .box_text>p{
    text-indent: 2em;
    line-height: 30px;
  }
</style>

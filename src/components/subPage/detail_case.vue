<template>
    <div class="main">
      <div class="case_title">
        <router-link to="/quality">产品支持</router-link>
        <span> > </span>
        <router-link to="/project_case">{{contentData.info.type}}</router-link>
        <span> > </span>
        <router-link to="/project_case" style="color: #CFA972">{{contentData.info.name}}</router-link>
      </div>
      <div class="case_content">
        <div class="box">
            <div class="box_ban">
              <swiper :options="swiperOption" style="height: 100%">
                <swiper-slide v-for="(item,index) in contentData.info.imgs" :key="index" :style="{background: 'url('+contentData.baseUrl+item+') no-repeat center/cover'}"></swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
            <div class="box_text">
              <p v-for="(item,index) in contentData.info.content.split('\n')" :key="index">{{item}}</p>
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
          contentData:{},
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
        this.content()
      },
      methods: {
        content() {
          this.$http.get('caseInfo',{id:this.$route.params.id}).then((res)=>{
            if(res.data.code == 200){
              console.log(res.data.data)
              this.contentData = res.data.data
            }
          })
        }
      }
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

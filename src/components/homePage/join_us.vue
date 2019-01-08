<template>
  <div class="content">
    <div class="banner">
      <swiper :options="swiperOption" style="height: 100%">
        <swiper-slide v-for="(item,index) in bannerImg" :key="index" :style="{background: 'url('+serverBase+item.url+') no-repeat center/cover'}"></swiper-slide>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </swiper>
      <div class="list">
        <span :class="{hitColor:changeNUm == '0'}" @click="changeCol('0')">薪酬福利</span>
        <span :class="{hitColor:changeNUm == '1'}" @click="changeCol('1')">团队福利</span>
        <span :class="{hitColor:changeNUm == '2'}" @click="changeCol('2')">人才招聘</span>
      </div>
    </div>
    <div v-if="changeNUm == '0'" class="payment_welfare">
      <div class="stimulate">
        <div class="main">
          <div class="stimulate_top">
            <img :src="serverBase+'/joinUs/fuli1_03.png'" alt="">
          </div>
          <div class="stimulate_bot">
            <div>
              <img :src="serverBase+'/joinUs/icon_01.png'" alt="">
              <span>具有竞争力的工资</span>
            </div>
            <div>
              <img :src="serverBase+'/joinUs/icon_02.png'" alt="">
              <span>丰厚的绩效奖励</span>
            </div>
            <div>
              <img :src="serverBase+'/joinUs/icon_03.png'" alt="">
              <span>一年两次调薪机会</span>
            </div>
            <div>
              <img :src="serverBase+'/joinUs/icon_04.png'" alt="">
              <span>优秀人才股权奖励</span>
            </div>
          </div>
        </div>
      </div>
      <div class="staff">
        <div class="staff_top">
          <img :src="serverBase+'/joinUs/fuli_08.png'" alt="">
        </div>
        <div class="staff_bot">
          <div class="main">
            <div class="staff_bot_left">
              <div :class="{divColor:staffImgNUm == 0}" @click="staffChange(0)">
                <p>办公环境</p>
                <span>开放办公区，舒适休闲区，让工作更有灵感。</span>
              </div>
              <div :class="{divColor:staffImgNUm == 1}" @click="staffChange(1)">
                <p>工作保障</p>
                <span>吃喝住行，全部搞定，万元置业基金无后顾之忧。</span>
              </div>
            </div>
            <div class="staff_bot_right">
              <img :src="serverBase+staffImg[staffImgNUm].url" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="changeNUm == '1'" class="team_welfare">
      <div class="main">
        <div class="team_welfare_top">
          <img :src="serverBase+'/joinUs/tuandui_01.png'" alt="">
        </div>
        <div class="team_welfare_bot">
          <img :src="serverBase+'/joinUs/tuandui_02.png'" alt="">
          <img :src="serverBase+'/joinUs/tuandui_03.png'" alt="">
          <img :src="serverBase+'/joinUs/tuandui_04.png'" alt="">
        </div>
        <div class="hitLogo"><img :src="serverBase+'/joinUs/tuandui_05.png'" alt=""></div>
      </div>
    </div>
    <div v-if="changeNUm == '2'" class="talents">
      <div class="main">
        <div class="talents_top">
          <div class="imgLogo">
            <img :src="serverBase+'/joinUs/zhaopin_01.png'" alt="">
          </div>
          <h2 class="talents_top_title">让工作更有意思</h2>
          <h5 class="talents_info">
              如果你是认真负责的小伙伴、善良纯洁的大儿童、爱生活爱工作的活跃分子、有理想有抱负的有志青年、才华横溢的机智骚年、专注机智的爱笑学霸。以下岗位，欢迎对号入座！
          </h5>
        </div>
        <div class="talents_bot">
          <ul class="talents_bot_title">
            <li>职业名称</li>
            <li>招聘人数</li>
            <li>学历要求</li>
            <li>工作经验</li>
            <li>工作地址</li>
            <li>薪资</li>
            <li>操作</li>
          </ul>
          <div class="station" v-for="(item,index) in stationData" :key="index">
            <ul class="station_top" @click="unfoldChange(index)">
              <li>{{item.name}}</li>
              <li>{{item.number}}</li>
              <li>{{item.education}}</li>
              <li>{{item.experience}}</li>
              <li :title="item.address">{{item.address}}</li>
              <li>{{item.salary}}</li>
              <li @click.stop="applyFor(item.id)">申请职位</li>
            </ul>
            <div class="station_bot" v-if="unfoldFlag[index].show">
              <div class="statement">
                <div class="left">工作职责：</div>
                <div class="right">
                  <p v-for="(item2,index2) in item.dutyWork.split('\n')" :key="index2">{{item2}}</p>
                </div>
              </div>
              <div class="status">
                <div class="left">任职资格：</div>
                <div class="right">
                  <p v-for="(item3,index3) in item.qualification.split('\n')" :key="index3">{{item3}}</p>
                </div>
              </div>
              <div class="treatment">
                <div class="left">福利待遇：</div>
                <div class="right">
                  <p v-for="(item4,index4) in item.fringeBenefits.split('\n')" :key="index4">{{item4}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="apply-fade">
       <div class="apply" v-if="applyBoxFlag">
      <div class="applyBox">
        <img :src="serverBase+'/joinUs/close.png'" @click="close()" alt="">
        <h2>申请职位</h2>
        <form style="width: 100%" @submit.prevent="submit" autocomplete="off">
          <div class="field">
            <input name="name"  onkeyup="value=value.replace(/[\d]/g,'') "onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[\d]/g,''))" maxlength="16" placeholder="请输入姓名" type="text" v-model="numberValidateForms.name">
          </div>
          <div class="field">
            <input name="mobile" maxlength="11" placeholder="请输入手机号" type="text" v-model="numberValidateForms.mobile">
          </div>
          <div class="field">
            <input name="submit" type="submit" value="提交">
          </div>
        </form>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "join_us",
        data() {
            return {
              serverBase:this.$store.state.qiNiuServer,
              applyBoxFlag:false,
              applyId:'',
              unfoldFlag:[],
              changeNUm: '0',
              staffImgNUm: 0,
              bannerImg:[
                {url:'/joinUs/banner_01.jpg'},
                {url:'/joinUs/banner_02.jpg'}
              ],
              staffImg:[
                {url:'/joinUs/environ2.png'},
                {url:'/joinUs/work.png'}
              ],
              swiperOption: {
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
              stationData:[],
              numberValidateForms: {
                id:'',
                name:'',
                mobile:''
              },
            }
        },
        mounted() {
           this.initData()
        },
        methods: {
          // 选项卡切换
          changeCol(index) {
            this.changeNUm = index
          },
          staffChange(index) {
            this.staffImgNUm = index
          },
          //控制列表展开
          unfoldChange(index) {
            this.unfoldFlag[index].show = !this.unfoldFlag[index].show
          },
          // 列表数据
          initData() {
            this.$http.get('list','').then((res) => {
              for (let i=0;i<res.data.data.length;i++) {
                this.unfoldFlag.push({show:false})
              }
              this.stationData = res.data.data
            })
          },
          //打开职位申请表单，数据清空
          applyFor(index){
            this.applyId = index;
            this.applyBoxFlag = true;
            this.numberValidateForms = {id:index,name:'',mobile:''}
          },
          //关闭职位申请表单
          close() {
            this.applyBoxFlag = false
          },
          //数据提交
          submit: function() {
            if(this.numberValidateForms.name){
              const reg = /^[A-Za-z\u4e00-\u9fa5]+$/
              if (reg.test(this.numberValidateForms.name)) {

              } else {
                return this.$message.error('用户名只可以输入字母和中文');
              }
            }else{
              return this.$message.error('姓名不能为空');
            }
            if (!this.numberValidateForms.mobile) {
              return this.$message.error('手机号不能为空');
            } else {
              const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
              if (reg.test(this.numberValidateForms.mobile)) {
                this.$http.post('apply',this.numberValidateForms).then((res) => {
                  if(res.data.code == 200) {
                    this.$message({
                      message: '提交申请成功！',
                      type: 'success'
                    })
                    this.applyBoxFlag = false
                  }else {
                    this.$message({
                      message: res.data.msg,
                      type: 'error'
                    })
                  }
                })
              } else {
                return this.$message.error('请输入正确的手机号');
              }
            }
          }
        }
    }
</script>

<style scoped>
 .content{
    position: relative;
  }
 .banner{
   height: 600px;
   position: relative;
   /*background: #ccc;*/
}
 .list{
    width: 450px;
    height: 80px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -60px;
    background: #fff;
    padding: 20px;
    line-height: 80px;
    z-index: 100;
  }
 .list>span{
   display:block;
   width: 33.33%;
   height: 100%;
   text-align: center;
   font-size: 22px;
   float: left;
   border-right: 1px solid #ccc;
   background: #efefef;
   box-sizing: border-box;
   cursor: pointer;
 }
 .list>.hitColor{
   color: #CEA972;
 }
 .list>span:last-child{
   border-right: none;
 }
 .payment_welfare,.team_welfare,.talents{
   width: 100%;
   height: auto;
   background: #fff;
 }
 .payment_welfare>.stimulate{
   padding: 90px 0 60px;
 }
  .staff_top,.stimulate_top{
    padding: 60px 0 80px;
  }
 .stimulate_top>img{
   width: auto;
 }
 .stimulate_bot{
   width: 100%;
   height: 250px;
   display: flex;
   justify-content: space-between;
 }
 .stimulate_bot>div{
   width: 16%;
   height: 100%;
   text-align: center;
 }
 .stimulate_bot>div>img{
   width: 100%;
   margin-bottom: 30px;
 }
 .stimulate_bot>div>span{
   line-height: 40px;
   letter-spacing: 1px;
 }
  .staff_bot{
    height: 600px;
    background: url("http://cdn.jinkaidoor.com/web/joinUs/banner_09.png") no-repeat center/cover;
  }
 .staff_bot>.main{
    height: 100%;
  }
  .staff_bot_left{
    width: 22%;
    height: 100%;
    float: left;
    background: #362E2B;
    color: #fff;
  }
 .staff_bot_left>div{
   height: 20%;
   box-sizing: border-box;
   padding: 15px 25px 0;
   cursor: pointer;
   text-align: left;
 }
 .staff_bot_left>div>p{
   line-height: 30px;
   font-size: 16px;
 }
 .staff_bot_left>div>span{
   line-height: 25px;
   font-size: 14px;
 }
 .staff_bot_left>.divColor{
   background: #CEA972;
 }
 .staff_bot_right{
    width: 78%;
    height: 100%;
    float: left;
  }
  .staff_bot_right>img{
    width: 100%;
    /*height: 100%;*/
  }
 .talents{
   padding: 100px 0 180px;
 }
 .talents_top{
   margin-bottom: 60px;
   color: #59493F;
 }
 .talents_top .imgLogo{
    padding: 20px 0 40px;
  }
  .talents_top_title{
    text-align: center !important;
    line-height: 60px;
  }
  .talents_info{
    box-sizing: border-box;
    padding: 0 160px;
    line-height: 30px;
  }
  .talents_bot_title{
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #59493F;
    margin-bottom: 30px;
  }
  .station{
    width: 100%;
    border: 1px solid #666;
    margin-bottom: 30px;
  }
  .station_top{
    width: 100%;
    height: 80px;
    line-height: 80px;
  }
 .talents_bot_title>li,.station_top>li{
   width: 14.2%;
   height: 100%;
   float: left;
   text-align: center;
   color: #fff;
   letter-spacing: 1px;

 }
 .station_top>li{
   color: #59493F;
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
 }
 .station_top>li:last-child{
   color: #CEA972;
   cursor: pointer;
 }
  .station_bot{
    width: 100%;
    overflow: hidden;
    height: auto;
    padding: 40px 50px 0;
    border-top: 1px dashed #333;
    box-sizing: border-box;
  }
 .station_bot>div{
   margin-bottom: 40px;
   overflow: hidden;
 }
 .station_bot>div>div{
   float: left;
   text-align: left;
 }
 .station_bot>div>.left{
   width: 10%;
 }
 .station_bot>div>.right{
   width: 90%;
 }
 .station_bot>div>.right>p{
   line-height: 30px;
 }
  .team_welfare_top{
    padding: 100px 0 60px;
  }
 .team_welfare_bot{
   display: flex;
   justify-content: space-between;
   overflow: hidden;
   margin-bottom: 90px;
 }
 .team_welfare_bot>img{
   width: 30%;
 }
  .hitLogo>img{
    display: block;
    width: 100%;
  }
  .apply{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(255,255,255,.1);
    z-index: 100;
  }
  .applyBox{
    width: 600px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 30%;
    background: #fff;
    color: #CEA972;
    box-shadow: 3px 3px 46px 3px rgba(131,121,115,0.15);
    box-sizing: border-box;
    padding: 20px 40px;
  }
  .applyBox>h2{
    line-height: 80px;
    border-bottom: 1px dashed #CEA972;
    margin-bottom: 30px;
    letter-spacing: 10px;
    text-align: center;
  }
 .field{
   width: 100%;
   height: 60px;
   line-height: 60px;
   border-radius: 18px;
   background: rgba(255,255,255,.1);
   margin-bottom: 18px;
   overflow: hidden;
   border: 1px solid #CEA972;
   box-sizing: border-box;
 }
 .field:last-child{
   margin-top: 45px;
 }
 input{
   width: 100%;
   height: 100%;
   padding: 0 30px;
   box-sizing: border-box;
   outline: none;
   border: none;
   background: none;
   font-size: 17px;
   color: rgba(195,155,99,1);
 }
 input::-webkit-input-placeholder{
   color: rgba(195,155,99,1);
 }
 input::-ms-input-placeholder{
   color: rgba(195,155,99,1);
 }
 input[name='submit']{
   background: rgba(195,155,99,1);
   color:rgba(230,230,230,1);
   cursor: pointer;
   font-weight: 400;
   letter-spacing: 5px;
   font-size: 21px;
 }
 input[name='submit']:hover{
   background: rgb(195, 150, 112);
 }
  .applyBox>img{
    position: absolute;
    right: 50px;
    top: 45px;
    cursor: pointer;
  }
 .apply-fade-enter-active,.apply-fade-leave-active{
   transition: all 1.5s;
   -moz-transition: all 1.5s;
   -webkit-transition: all 1.5s;
   opacity: 1;
 }
 .apply-fade-enter, .apply-fade-leave-to{
   transform: rotate3d(0,1,0,180deg);
   -ms-transform: rotate3d(0,1,0,180deg);
   -moz-transform: rotate3d(0,1,0,180deg);
   -webkit-transform: rotate3d(0,1,0,180deg);
   opacity: 0;
 }
</style>

<template>
  <div class="content">
    <div class="topBan"></div>
    <div class="botBox">
      <div class="main">
        <div class="upload">
          <div @click="openUpload()">上传原材料样板</div>
          <span>上传原料成为供应商</span>
        </div>
        <div style="padding: 120px 0">
          <img :src="serverBase+'/news/yuancailiao_1.png'" alt="">
        </div>
        <div class="cont_box">
          <img :src="serverBase+'/news/yuancailiao_2.png'" alt="">
          <p>丰林木业集团股份有限公司（以下简称“公司”或“本公司”）是香港丰林国际有限公司董事长刘一川先生创始的一家中外合资股份有限公司，是广西的一家国内A股上市企业，公司股票简称“丰林集团”，股票代码601996。公司是“国家高新技术企业、国家林业重点龙头企业和农业产业化国家重点龙头企业”，获得35项国家专利，是国内智能精造技术绿色环保企业。公司于2010年被中国经济观察报评为“2010年度中国最佳低碳企业评选”20强，在当时的中国人造板行业极为少见。近年来，公司屡获“中国林业产业突出贡献奖”、“中国最佳低碳企业”、“中国林业重点龙头企业”、“中国板材行业最具影响力（品牌）制造企业”、“中国国际林业产业博览会金奖”等多项殊荣，在行业和市场上树立了良好的品牌形象。2017年，公司产品获得中国林产工业协会的“精品人造板”与广西质量技术监督局的“广西名牌”荣誉称号，集团总经理王高峰先生被中国林产工业协会授予“中国林产工业终身成就奖”</p>
        </div>
        <div class="cont_box">
          <img :src="serverBase+'/news/yuancailiao_3.png'" alt="">
          <p>福建省永安林业(集团)股份有限公司(股票代码:000663)旗下品牌地板。永林蓝豹地板拥有中国驰名商标、中国名牌、出口双免验、CARB认证、世博会福建馆唯一指定木地板、第一批地板国家免检产品、第一批木地板十大品牌等荣誉。</p>
        </div>
        <div class="cont_box">
          <img :src="serverBase+'/news/yuancailiao_4.png'" alt="">
          <p>品牌班艺  连云港班艺木业是专业生产桉木、桦木、杨桦地板基材和 全杨、桐杨 的 LVL 平行合板的公司.产品主要有.家具材、门芯材 、间柱材、地板基材、包装材、建筑材,主要用于如 各种家具、床帮 、床板、木门窗、 横梁、龙骨、间柱、捆包材等. 按照材料的表面质量分为1.ABA 表面全白.面板整张.无修补，含水率12%。主要用于各种家具 办公桌的抽屉板，橱柜、衣柜的横梁、龙骨 等2.BCB 面板接长，允许小的修补，含水率12% 。</p>
        </div>
        <div class="cont_box">
          <img :src="serverBase+'/news/yuancailiao_5.png'" alt="">
          <p>杭州怡合新材料有限公司前身为杭州力马特种胶粘剂厂。成立于1997年，专业生产PVC覆膜胶，包括真空吸塑胶，水基线条包覆胶，免漆大板胶等。主要应用于免漆门，移门，橱柜制造企业，及汽车内饰、卫浴洁具等行业。年产量12000余吨，客户遍及全国95%以上省市及十余个海外国家。自97年与浙江金迪合作后，先后还与山东鑫迪、江山欧派、沈阳三峰、辽宁展志天华、柯乐芙、重庆美心等建立战略合作伙伴关系，深得客户的信任。公司是中国木门技术联盟副会长单位、中国模压饰面技术专委会会员、中国胶粘剂交易平台会员、浙江省移门协会会员单位。</p>
        </div>
        <div style="padding: 120px 0">
          <img :src="serverBase+'/news/yuancailiao_6.png'" alt="">
        </div>
        <div class="cont_box">
          <img :src="serverBase+'/news/yuancailiao_7.png'" alt="">
          <p>广东华润涂料有限公司始建于1991年，公司本部设立于中国涂料之都--顺德，是中国领先的专业生产建筑装饰装修涂料、高档木器涂料、水性涂料及高科技工业涂料系列产品的国际化、专业化集团企业。作为一个优秀的现代化企业，华润涂料与世界知名化工企业巴斯夫、拜耳、杜邦等建立了长期稳定的合作伙伴关系，确保了公司以最新的科技生产出最优质的产品。现已被美国威士伯Valspar收购</p>
        </div>
      </div>
    </div>
    <transition name="upload-fade">
       <div class="uploadData" v-if="uploadBoxFlag">
      <div class="uploadBox">
        <img :src="$store.state.qiNiuServer+'/joinUs/close.png'" @click="closeUpload()" alt="">
        <h2>样品上传</h2>
        <form @submit.prevent="submit" autocomplete="off" style="width: 100%">
          <textarea placeholder="填写样品参数例如：木板类型：松木;树木产地：杭州市北高峰........." name="uploadDateForm.info" v-model="uploadDateForm.content" maxlength="255" id="" cols="30" rows="10"></textarea>
          <el-upload
            :action="$store.state.sendHost+'/upload/material'"
            list-type="picture-card"
            :limit=limit
            :headers="{hT:$store.state.hT,hToken:token,hDeviceType:'3'}"
            :on-preview="handlePictureCardPreview"
            :before-upload="handleUpload"
            :on-success="handleSuccess"
            :on-exceed="handleLimits">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div class="fieldBot">
            <input name="name" onkeyup="value=value.replace(/[\d]/g,'') "onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[\d]/g,''))" maxlength="16" placeholder="请输入姓名" type="text" v-model="uploadDateForm.name">
            <input name="mobile" placeholder="请输入手机号" type="text" maxlength="11" v-model="uploadDateForm.mobile">
            <input name="submit" type="submit" value="上传">
          </div>
        </form>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "purchase",
        data() {
            return {
              token:localStorage.getItem('token'),
              serverBase:this.$store.state.qiNiuServer,
              limit: 10,
              uploadBoxFlag: false,
              dialogImageUrl: '',
              dialogVisible: false,
              uploadDateForm:{
                name:'',
                content:'',
                imgs:'',
                mobile:''
              }
            }
        },
        methods: {
          openUpload() {
            this.uploadBoxFlag = true
            this.uploadDateForm = {name:'',content:'',imgs:'',mobile:''}
          },
          closeUpload() {
            this.uploadBoxFlag = false
          },
          handleUpload(file, fileList) {
            // console.log(file, fileList);
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
              this.$message.error('上传头像图片大小不能超过 5MB!');
            }
            return isLt5M;
          },
          handleSuccess(res) {
            console.log(res);
            if (res.code == 200){
              console.log(res.data.img)
              this.uploadDateForm.imgs += ',' + res.data.img
            }else{
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          },
          handleLimits(file, fileList) {
            if(fileList.length) {
              this.$message({
                message: '最多只能上传十张图片',
                type: 'warning'
              });
            }
          },
          handlePictureCardPreview(file) {
            // console.log(file)
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          },
          submit: function() {
            if(this.uploadDateForm.imgs != ''){
              this.uploadDateForm.imgs = this.uploadDateForm.imgs.substring(1);
            }
            if(this.uploadDateForm.name && this.uploadDateForm.content && this.uploadDateForm.mobile) {
               const regs = /^[A-Za-z\u4e00-\u9fa5]+$/
               if (regs.test(this.uploadDateForm.name)) {

               } else {
                 return this.$message.error('用户名只可以输入字母和中文');
               }
              const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
              if (reg.test(this.uploadDateForm.mobile)) {
                this.$http.post('sample',this.uploadDateForm).then((res)=>{
                  if(res.data.code == 200){
                    this.$message({
                      message: '上传成功！！！',
                      type: 'success'
                    })
                    this.closeUpload()
                  }else{
                    this.$message({
                      message: res.data.msg,
                      type: 'error'
                    })
                  }
                },(res)=>{

                })
              } else {
                return this.$message.error('请输入正确的手机号');
              }
            }else {
              return this.$message.error('请完整填写相关信息');
            }
          }
        }
    }
</script>
<style>
  .v-modal{
    background: none !important;
    z-index: -1;
  }
</style>
<style scoped>
  .topBan{
    width: 100%;
    height: 600px;
    background: url("http://cdn.jinkaidoor.com/web/pinzhi/yuan_banner_01.jpg") no-repeat center/cover;
  }
  .botBox{
    width: 100%;
    height: auto;
  }
  .upload{
    padding: 60px 0 0;
  }
  .upload>div{
    width: 340px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 36px;
    color: #C39B63;
    border-radius: 5px;
    border: 2px solid #C39B63;
    cursor: pointer;
    margin: 0 auto;
  }
  .upload>div:hover{
    color: #c3733f;
    border: 2px solid #c3733f;
  }
  .upload>span{
    display: block;
    line-height: 60px;
    font-size: 18px;
    color: #959595;
    text-align: center;
  }
  .botBox>.main>img{
    width: 100%;
    display: block;
    margin: 80px 0;
  }

  .uploadData{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.2);
    z-index: 100;
  }
  .uploadBox{
    width: 1032px;
    /*height: 500px;*/
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 18%;
    background: #fff;
    color: #CEA972;
    box-shadow: 3px 3px 46px 3px rgba(131,121,115,0.15);
    box-sizing: border-box;
    padding: 20px 50px;
    text-align: left;
  }
  .uploadBox>img{
    position: absolute;
    right: 50px;
    top: 26px;
    cursor: pointer;
  }
  .uploadBox>h2{
    line-height: 50px;
    margin-bottom: 20px;
    text-align: center;
  }
  .cont_box{
    width: 100%;
    position: relative;
    margin-bottom: 120px;
  }
  .cont_box>img{
    width: 100%;
  }
  .cont_box>p{
    width: 100%;
    text-align: left;
    box-sizing: border-box;
    position: absolute;
    /*bottom: 25px;*/
    left: 0;
    top: 140px;
    line-height: 35px;
    padding: 15px 35px;
    font-size: 24px;
  }
  .fieldBot{
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  .fieldBot>input,textarea{
    height: 100%;
    border: none;
    outline: none;
    box-sizing: border-box;
    border-radius: 5px;
    color: #333;
  }
  .fieldBot>input::-webkit-input-placeholder{
    color: #b5b5b5;
    font-size: 14px;
  }
  .fieldBot>input::-ms-input-placeholder{
    color: #b5b5b5;
    font-size: 14px;
  }
  .fieldBot>input[name='name'],.fieldBot>input[name='mobile']{
    width: 38%;
    padding: 0 20px;
    border: 1px solid #DABA8C;
  }
  .fieldBot>input[name='submit']{
    width: 20%;
    background: #DABA8C;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    letter-spacing: 2px;
  }
  .fieldBot>input[name='submit']:hover{
    background: #da9e7a;
  }
  textarea{
    width: 100%;
    height: 220px;
    resize: none;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #DABA8C;
  }
  .el-upload--picture-card{
    width: 100px;
    height: 100px;
  }

  .upload-fade-enter-active,.upload-fade-leave-active{
    transition: all 1.5s;
    -moz-transition: all 1.5s;
    -webkit-transition: all 1.5s;
    opacity: 1;
  }
  .upload-fade-enter, .upload-fade-leave-to{
    transform: rotate3d(0,1,0,180deg);
    -ms-transform: rotate3d(0,1,0,180deg);
    -moz-transform: rotate3d(0,1,0,180deg);
    -webkit-transform: rotate3d(0,1,0,180deg);
    opacity: 0;
  }
</style>

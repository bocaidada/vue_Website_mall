<template>
  <div class="content">
    <div class="main">
      <div class="detail">
           <div class="detail_left">
             <div class="detail_left_top">
                <pic-zoom :url="topImgUrl" :scale="4"></pic-zoom>
               <!--<img :src="topImgUrl" alt="">-->
              </div>
              <div class="detail_left_bot">
                <div v-for="(item,index) in initDates.imgs" @click="topImgShow(item)" :key="index" :style="{background: 'url('+baseUrl+item+') no-repeat center/cover'}" v-if="index<4"></div>
              </div>
           </div>
           <div class="detail_right" v-if="initDates">
              <h1>{{initDates.model}}</h1>
             <div class="price">
                <p class="oldPrice"><span>价格：</span><del>￥{{price}}</del></p>
                <p class="newPrice"><span>销售价：</span><span class="num">￥{{shopPrices}}</span></p>
             </div>
             <div class="area">
               <span>配送地区：</span>
               <area-cascader type='code' v-model="selected" :level='1' :data="pcaa"></area-cascader>
               <span v-if="areaFlag" style="color: #ff0000;padding-left: 20px;">* 请选择配送区域 *</span>
             </div>
             <!--<area-select type='text' :level='2' v-model="selected" :data="pcaa"></area-select>-->
             <p class="freight" style="text-align: left;height: 40px">所需运费：<span style="color: #ff0000">￥{{carriage}}</span></p>
             <div class="doorColor" v-for="(item,index) in initDates.attrs" :key="index" v-if="initDates.attrs">
               <span>{{item.name}}：</span>
               <div class="colBox" v-if="item.isShowImg">
                 <div class="imgBox" :class="{imgBoxColor:colorNum == item1.id}" v-for="(item1,index1) in item.values" :style="{background: 'url('+baseUrl+item1.img+') no-repeat center/cover'}" :key="index1" @click="selectDoorColor(item1)">
                   <img :src="baseUrl+item1.img" :title="item1.value">
                 </div>
               </div>
               <el-radio-group v-model="radio1" size="mini" v-else>
                 <el-radio-button  @click.native.prevent="changeBorder(item2)" v-for="(item2,index2) in item.values" :key="index2" :label="item2.value"></el-radio-button>
               </el-radio-group>
             </div>

             <div class="doorOPen" v-if="doorSizeFlag">
               <span>门洞尺寸：</span>
               <input type="text" onkeyup="this.value=this.value.replace(/\D/g,'')" placeholder="宽度" v-model="doorOpen.w"><span>cm*</span>
               <input type="text" onkeyup="this.value=this.value.replace(/\D/g,'')" placeholder="高度" v-model="doorOpen.h"><span>cm*</span>
               <input type="text" onkeyup="this.value=this.value.replace(/\D/g,'')" placeholder="厚度" v-model="doorOpen.p"><span>cm</span>
               <span v-if="sizeFlag" style="color: #ff0000;padding-left: 20px">* 请输入完整门洞尺寸 *</span>
             </div>
             <p class="freight">发货时间：付款后7天内发货</p>
             <p class="freight">产品声明：该产品为定制产品，下单后不支持退款</p>
             <p class="freight freightNum">
               <span>数量：</span>
               <el-input-number v-model="doorData.number" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
               <span>件</span>
             </p>
             <div class="buyBox">
               <div @click="submitData()">直接订购</div>
               </div>
             </div>
           </div>
      <div class="correlation">
        <div class="correlation_top">
          <span :class="{topHit:changeFlag}" @click="change(true)">商品详情</span>
          <span :class="{topHit:!changeFlag}" @click="change(false)">品牌服务</span>
        </div>
        <div class="goods_detail" v-if="changeFlag">
          <template v-if="initDates.params">
            <div class="goods_detail_info" v-if="initDates.params.length">
              <span v-for="item in initDates.params[0].params">{{item.k}}：{{item.v}}</span>
            </div>
          </template>
          <div class="goods_detail_box" v-html="content"></div>
        </div>
        <div class="brand_server" v-else>
          <div class="brand_server_box">
            <div class="brand_server_name">包装展示</div>
            <img :src="$store.state.qiNiuServer+'/store/pinpai_01.jpg'" alt="">
          </div>
          <div class="brand_server_box">
            <div class="brand_server_name">服务保障</div>
            <img :src="$store.state.qiNiuServer+'/store/pinpai_02.jpg'" alt="">
          </div>
          <div class="brand_server_box">
            <div class="brand_server_name">品牌保障</div>
            <img :src="$store.state.qiNiuServer+'/store/pinpai_03.jpg'" alt="">
          </div>
        </div>
    </div>

      <transition name="shopLogin-fade">
       <div class="shopLogin" v-if="formFlag">
          <div class="box">
            <h2>客户信息</h2>
            <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm">
              <el-form-item
                prop="customerName">
                <el-input type="text" maxlength="16" v-model="ruleForm.customerName" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item
                prop="customerMobile">
                <el-input maxlength="11" v-model.number="ruleForm.customerMobile" placeholder="请输入联系方式"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import { pca, pcaa } from 'area-data'; // v5 or higher
  import PicZoom  from 'vue-piczoom'
    export default {
      name: "product_detail",
      components: { PicZoom  },
      data() {
          let checkPhone = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('手机号不能为空'));
            } else {
              const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
              if (reg.test(value)) {
                callback();
              } else {
                return callback(new Error('请输入正确的手机号'));
              }
            }
          }
        let checkName = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('用户名不能为空'));
          } else {
            const reg = /^[A-Za-z\u4e00-\u9fa5]+$/
            if (reg.test(value)) {
              callback();
            } else {
              return callback(new Error('用户名只可以输入字母和中文'));
            }
          }
        }
          return {
            price:'',
            shopPrices:'',
            pathId:'',
            radio1:'',
            colorNum: 0,
            borderNum: 0,
            formFlag:false,
            doorSizeFlag:true,
            carriage:'0.00',
            content:'',
            initDates:{},
            baseUrl:'',
            changeFlag:true,
            ruleForm: {
              customerName:'',
              customerMobile:''
            },
            doorOpen:{
              w:'',
              h:'',
              p:''
            },
            doorData:{
              itemId:'',
              skuId:'',
              orderType: 2,
              size:'',
              number: '1',
              isBuy: 1,
              customerName:'',
              customerMobile:''
            },
            sizeFlag:false,
            areaFlag:false,
            selected: [],
            pca: pca,
            pcaa: pcaa,
            topImgUrl: '',
            bannerImg: [],
            areaData: {
              templateId:'',
              addressCodeStr:'',
              number:''
            },
            rules: {
              customerMobile: [
                {validator: checkPhone, trigger: 'blur'}
              ],
              customerName: [
                {validator: checkName, trigger: 'blur'}
              ]
            }
          }
      },
      created() {
        this.dataInit()
      },
      mounted() {

      },
      watch: {
        selected(val,old) {
          // console.log(old,val)
          if(val.length == 3) {
            this.areaData.addressCodeStr = this.selected[0] + ',' + this.selected[1] + ',' + this.selected[2]
            this.areaData.templateId = this.initDates.freight_template_id
            this.areaData.number = this.doorData.number
            if(this.areaData.templateId == 0) {
              this.carriage = this.initDates.globalFreight
            }else{
              this.$http.get('goodsFreight',this.areaData).then((res)=>{
                if(res.data.code == 200){
                  this.carriage = res.data.data.price
                }else{
                  if(res.data.error_code == 2304) {
                    this.$message.error('该地区不支持配送')
                  }
                }
              })
            }
            // console.log(this.areaData)
          }
        }
      },
      methods: {
        dataInit() {
          this.$http.get('goodsInfo',{id:this.$route.params.id}).then((res)=>{
            this.baseUrl = res.data.data.baseImgUrl
            this.initDates = res.data.data.info
            this.content = Base64.decode(res.data.data.info.content)
            this.topImgUrl = this.baseUrl+this.initDates.imgs[0]
            console.log(this.initDates)
            this.price = this.initDates.price
            this.shopPrices = this.initDates.shopPrice
          })
        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.doorData.customerName = this.ruleForm.customerName
              this.doorData.customerMobile = this.ruleForm.customerMobile
              this.$http.post('carAdd',this.doorData).then((res)=>{
                // console.log(res.data)
                if(res.data.code != 200){
                  if(res.data.error_code == 1001){
                    this.$store.commit('outUserToken')
                    this.$store.commit('loginState',true)
                  }
                  this.$message({
                    message: res.data.msg,
                    type: 'error'
                  })
                  this.formFlag = false
                }else{
                  this.formFlag = false
                  this.$store.commit('fromSource',3)
                  this.$router.push('/manage_pay_detail')
                }
              })
              } else {
               console.log('error submit!!');
               return false;
             }
            });
          },
        resetForm(formName) {
          this.formFlag = false
          this.$refs[formName].resetFields();
        },
        change(flag) {
          this.changeFlag = flag
        },
        topImgShow(params) {
          this.topImgUrl = this.baseUrl + params
        },
        //门板数量
        handleChange(value) {
          console.log(value);
          this.doorData.number = value
        },
        changeBorder(val) {
          // console.log(val)
          this.borderNum = val.id
          this.radio1 = val.value
          if(this.initDates.attrs.length>1) {
            if(this.colorNum) {
              this.pathId = this.colorNum+','+ this.borderNum
            }
          }else{
            this.pathId = val.id
          }
          for(let i=0; i<this.initDates.sku.length;i++) {
            if(this.initDates.sku[i].idPath == this.pathId) {
              this.doorData.skuId = this.initDates.sku[i].id
              this.price = this.initDates.sku[i].price
              this.shopPrices = this.initDates.sku[i].shopPrice
              break
            }
          }
        },
        //门板颜色
        selectDoorColor(params) {
          this.topImgUrl = this.baseUrl+params.img
          this.colorNum = params.id
          if(this.initDates.attrs.length>1) {
            if(this.borderNum) {
              this.pathId = this.colorNum+','+ this.borderNum
            }
          }else{
            this.pathId = params.id
          }
          for(let i=0; i<this.initDates.sku.length;i++) {
            if(this.initDates.sku[i].idPath == this.pathId) {
              this.doorData.skuId = this.initDates.sku[i].id
              this.price = this.initDates.sku[i].price
              this.shopPrices = this.initDates.sku[i].shopPrice
              break
            }
          }

        },
        //提交数据
        submitData() {
          console.log(this.doorData)
          this.doorData.itemId = this.initDates.id
          if(this.initDates.attrs){
            if(this.doorData.skuId == '') {
              this.$message.error('请完整选择商品属性')
              return
            }
          }
          for(let key in this.doorOpen) {
            console.log()
            if(this.doorOpen[key] == ''){
              this.sizeFlag = true
              return
            }else{
              this.doorData.size += this.doorOpen[key] + 'cm x '
              this.sizeFlag = false
            }
          }
          this.doorData.size = this.doorData.size.substr(0,this.doorData.size.length-3)
          this.formFlag = true
        }
      }
    }
</script>
<style>
  .magnifier-box img{
    width: auto !important;
    height: 100%;
  }
</style>
<style scoped>
  .el-input{
    height: 30px;
  }
  .el-input-number__decrease, .el-input-number__increase{
    background: none;
  }
  .area-cascader-wrap{
    width: 50%;
    float: left;
  }
  .content{
     padding: 20px 0;
   }
  .main{
    background: #fff;
    padding: 35px;
    box-sizing: border-box;
    text-align: left;
    position: relative;
  }
  .detail{
    height: 650px;
  }
  .detail_left{
    width: 40%;
    height: 100%;
    float: left;
  }
  .detail_left_top{
    height: 60%;
    padding: 20px 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
    border: 1px solid #ccc;
  }
  .detail_left_top img{
    height: 100%;
  }
  .detail_left_top .magnifier-box img{
    width: auto;
    height: 100%;
  }
  .detail_left_bot{
    height: 19%;
    padding: 20px 0 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }
  .detail_left_bot>div{
    width: 23%;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .detail_right{
    width: 54%;
    float: right;
    height: 100%;
    box-sizing: border-box;
    padding-right: 20px;
    font-size: 14px;
    color: #999;
  }
  h1{
    text-align: left;
    line-height: 40px;
    margin-bottom: 20px;
    color: #333;
  }
  .detail_right .price{
    width: 100%;
    height: 120px;
    background: #f2f2f2;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 0 10px;
  }
  .detail_right .price .oldPrice{
    line-height: 50px;

  }
  .detail_right .price .newPrice{
    font-size: 14px;
    line-height: 70px;
    color: #999;
  }
  .detail_right .price .newPrice>.num{
    font-size: 24px;
    color: #ff0000;
  }
  .area{
    width: 100%;
    height: 35px;
    box-sizing: border-box;
    margin-top: 15px;
  }
  .area>span{
    float: left;
    line-height: 35px;
  }
  .freight{
    box-sizing: border-box;
    line-height: 40px;
  }
  .doorColor{
    width: 100%;
    height: 38px;
    margin-bottom: 10px;
  }
  .doorColor>span{
    width: 70px;
    float: left;
  }
  .doorColor>.colBox{
    float: left;
    width: 88%;
    height: 100%;
    line-height: 38px;
  }
  .doorColor>.colBox>.imgBox{
    width: 38px;
    height: 100%;
    float: left;
    margin-right: 15px;
    background: tan;
    cursor: pointer;
    border-radius: 3px;
    overflow: hidden;
    border: 1px solid #ccc;
    color: #774f4f;
    text-align: center ;
    position: relative;
  }
  .doorColor>.colBox>.imgBoxColor::after {
    display: block;
    content: '';
    width: 0px;
    height: 0px;
    border-color: transparent red red transparent ;
    border-width: 6px;
    border-style: solid;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .doorColor>.colBox>.imgBox>img{
    width: 100%;
    height: 100%;
    opacity: 0;
    background: rgba(0,0,0,0);
  }
  .freightNum{
    height: 30px;
    line-height: 33px;
    margin:10px 0;
  }
  .freightNum>span{
    padding-right: 22px;
  }
  .buyBox{
    width: 85%;
    height: 120px;
    display: flex;
    flex-wrap:wrap;
  }
  .buyBox>div{
    width: 120px;
    height: 38px;
    background: #ffa507;
    border-radius: 10px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 38px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    margin-right: 20px;
    margin-top:40px;
    letter-spacing: 1px;
  }
  .buyBox>div:hover{
    color: #efefef;
  }
  .buyBox>.side{
    background: #ff0000;
  }
  .doorOPen{
    height: 40px;
    line-height: 40px;
  }
  .doorOPen>input{
    width: 60px;
    margin-right: 5px;
    outline: none;
    border: 1px solid #ccc;
    padding-left: 5px;
    box-sizing: border-box;
    color: #999;
    border-radius: 3px;
  }
  input::placeholder{
    color: #ccc;
    font-size: 12px ;
  }
  .correlation{
    margin-top: 30px;
    width: 100%;
    font-size: 18px;
  }
  .correlation_top{
    height: 40px;
    line-height: 40px;
    color: #333;
    border-bottom: 1px solid rgba(220,220,220,1);
  }
  .correlation_top>span{
    display: block;
    float: left;
    width: 140px;
    height: 100%;
    text-align: center;
    cursor: pointer;
    letter-spacing: 1px;
  }
  .correlation .topHit{
    color: #fff;
    background: #434343;
  }
  .goods_detail_info{
    padding: 30px 0;
    color: #959595;
    border-bottom: 1px solid rgba(220,220,220,1);
    margin-bottom: 40px;
  }
  .goods_detail_info::after{
    display: block;
    content: '';
    overflow: hidden;
    clear: both;
  }
  .goods_detail_info>span{
    min-width: 282px;
    float: left;
    line-height: 40px;
    /*margin-right: 100px;*/
  }
  .goods_detail_box{
    width: 100%;
    text-align: center;
  }
  .goods_detail_box>p>img{
    width: 100%;
    margin: 0 auto;
    display: block;
  }
  .goods_detail_box p{
    width: 100%;
    /*height: 40px;*/
    line-height: 40px;
  }
  .brand_server_box{
    margin-top: 90px;
    width: 100%;
  }
  .brand_server_box>img{
    display: block;
    width: 100%;
  }
  .brand_server_name{
    line-height: 50px;
    font-size: 26px;
    color: #434343;
    text-align: center;
    position: relative;
    margin-bottom: 40px;
  }
  .brand_server_name::after{
    display: block;
    content: '';
    width: 60px;
    height: 3px;
    background:rgba(195,155,99,1);
    margin: 0 auto;
  }
  .shopLogin{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.1);
    z-index: 10;
  }
  .shopLogin>.box{
    width: 500px;
    height: 300px;
    background: #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 30%;
    box-sizing: border-box;
    padding: 20px 30px;
    border-radius: 5px;
  }
  .shopLogin>.box>h2{
    line-height: 60px;
    text-align: center;
    margin-bottom: 20px;
  }
  .shopLogin-fade-enter-active,.shopLogin-fade-leave-active{
    transition: all 1.5s;
    opacity: 1;
  }
  .shopLogin-fade-enter, .shopLoginy-fade-leave-to{
    transform: rotate3d(0,1,0,180deg);
    opacity: 0;
  }
</style>

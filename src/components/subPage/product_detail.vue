<template>
  <div class="content">
    <main class="main">
        <div class="detail">
           <div class="detail_left">
                <div class="detail_left_top">
                <pic-zoom :url="topImgUrl"></pic-zoom>
              </div>
              <div class="detail_left_bot">
                <div v-for="(item,index) in bannerImg" @click="topImgShow(index)" :key="index" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></div>
              </div>
           </div>
           <div class="detail_right">
              <h1>{{goodDetail.title}}</h1>
             <div class="price">
                <p class="oldPrice"><span>价格：</span><del>￥{{goodDetail.oldPrice}}</del></p>
                <p class="newPrice"><span>销售价：</span><span class="num">￥{{goodDetail.newPrice}}</span></p>
             </div>
             <div class="area">
               <span>配送地区：</span>
               <area-cascader type='text' v-model="selected" :level='1' :data="pcaa"></area-cascader>
               <span v-if="areaFlag" style="color: #ff0000;padding-left: 20px;">* 请选择配送区域 *</span>
             </div>
             <!--<area-select type='text' :level='2' v-model="selected" :data="pcaa"></area-select>-->
             <p class="freight">所需运费：<span style="color: #ff0000">￥{{goodDetail.carriage}}</span></p>
             <div class="doorColor">
               <span>颜色：</span>
               <div class="colBox">
                 <div class="imgBox" v-for="(item,index) in bannerImg" :key="index" :style="{background: 'url('+item.url+') no-repeat center/cover'}" @click="selectDoorColor(item.name)"></div>
                 <span v-if="colorFlag" style="color: #ff0000;padding-left: 20px">* 请选择门板颜色 *</span>
               </div>
             </div>
             <div class="doorOPen">
               <span>门洞尺寸：</span>
               <input type="text" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" placeholder="宽度" v-model="doorOpen.w"><span>m*</span>
               <input type="text" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" placeholder="高度" v-model="doorOpen.h"><span>m*</span>
               <input type="text" onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')" placeholder="厚度" v-model="doorOpen.p"><span>m</span>
               <span v-if="sizeFlag" style="color: #ff0000;padding-left: 20px">* 请输入完整门洞尺寸 *</span>
             </div>
             <p class="freight">发货时间：付款后7天内发货</p>
             <p class="freight">产品声明：该产品为定制产品，下单后不支持退款</p>
             <p class="freight freightNum">
               <span>数量：</span>
               <el-input-number v-model="goodDetail.num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
               <span>件</span>
               <span>库存 {{goodDetail.num}} 件</span>
             </p>
             <div class="buyBox">
               <div @click="submitData('addCar')">加入购物车</div>
               <div @click="submitData('buy')">直接购买</div>
               <div @click="submitData('shop')">门店定制</div>
               <div @click="submitData('jinDong')" class="side">京东购买</div>
               <div @click="submitData('tianMao')" class="side">天猫购买</div>
             </div>
           </div>
        </div>
    </main>
  </div>
</template>

<script>
  import { pca, pcaa } from 'area-data'; // v5 or higher
  import PicZoom  from 'vue-piczoom'
    export default {
      name: "product_detail",
      components: { PicZoom  },
      data() {
          return {
            doorOpen:{
              w:'',
              h:'',
              p:''
            },
            doorData:{
              title:'',
              price:'',
              area:'',
              carriage:'',
              doorColor:'',
              doorSize:'',
              doorNumber:'1'
            },
            sizeFlag:false,
            colorFlag:false,
            areaFlag:false,
            selected: [],
            pca: pca,
            pcaa: pcaa,
            topImgUrl: '',
            bannerImg: [
              {name:'red',url:'../../../static/img/4.jpg'},
              {name:'yow',url:'../../../static/img/5.jpg'},
              {name:'003',url:'../../../static/img/7.jpg'},
              {name:'004',url:'../../../static/img/8.jpg'},
            ],
            goodDetail: {
              title:'MKT-003',
              oldPrice:'3320',
              newPrice:'1600',
              num:1,
              carriage:'0.00'
            }
          }
      },
      created() {
        this.topUrl()
      },
      mounted() {

      },
      watch: {
        selected(val,old) {
          console.log(old,val)
          if(val.length == 3) {
            this.doorData.area = this.selected[0] + '/' + this.selected[1] + '/' + this.selected[2]
            this.areaFlag = false
          }
        },
        doorOpen:function () {
          console.log(this.doorOpen)
        }
      },
      methods: {
        topUrl() {
          this.topImgUrl = this.bannerImg[0].url
        },
        topImgShow(params) {
          this.topImgUrl = this.bannerImg[params].url
        },
        //门板数量
        handleChange(value) {
          console.log(value);
          this.doorData.doorNumber = value
        },
        //门板颜色
        selectDoorColor(params) {
          this.doorData.doorColor = params;
          this.colorFlag = false
        },
        //提交数据
        submitData(params) {
          this.doorData.title = this.goodDetail.title
          this.doorData.price = this.goodDetail.newPrice
          this.doorData.carriage = this.goodDetail.carriage
          if(this.doorData.doorColor == '') {
            this.colorFlag = true
            return
          }
          if(this.doorData.area == '') {
            this.areaFlag = true
            return
          }
          let size = ''
          for(let key in this.doorOpen) {
            if(this.doorOpen[key] == ''){
              this.sizeFlag = true
              return
            }else{
              size += '*'+this.doorOpen[key]
              this.sizeFlag = false
            }
          }
          this.doorData.doorSize = size.substring(1)
          console.log(this.doorData)
        }
      }
    }
</script>
<style>
  .el-input{
    height: 30px;
  }
  /*.el-input-number{*/
    /*height: 30px;*/
    /*line-height: 30px;*/
    /*width: 120px;*/
    /*vertical-align: middle;*/
    /*outline: none;*/
  /*}*/
  .el-input-number__decrease, .el-input-number__increase{
    background: none;
  }
  .area-cascader-wrap{
    width: 50%;
    float: left;
  }
</style>
<style scoped>
  .content{
     padding: 20px 0;
   }
  .main{
    background: #fff;
    padding: 20px 35px;
    box-sizing: border-box;
    text-align: left;
  }
  .detail{
    height: 650px;
  }
  .detail_left{
    width: 30%;
    height: 100%;
    float: left;
  }
  .detail_left_top{
    height: 70%;
    padding: 20px 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
    border: 1px solid #ccc;
  }
  .detail_left_bot{
    height: 25%;
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
    width: 64%;
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
    height: 80px;
    margin-bottom: 10px;
  }
  .doorColor>span{
    width: 70px;
    float: left;
  }
  .doorColor>.colBox{
    float: left;
    width: 70%;
    height: 100%;
    line-height: 80px;
  }
  .doorColor>.colBox>.imgBox{
    width: 58px;
    height: 100%;
    float: left;
    margin-right: 15px;
    background: tan;
    cursor: pointer;
    border-radius: 3px;
    overflow: hidden;
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
    width: 65%;
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
    margin-top: 10px;
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
</style>

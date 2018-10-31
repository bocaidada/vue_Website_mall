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
             </div>
             <!--<area-select type='text' :level='2' v-model="selected" :data="pcaa"></area-select>-->
             <p class="freight">所需运费：<span style="color: #ff0000">￥200</span></p>
             <div class="doorColor">
               <span>颜色：</span>
               <div class="colBox">
                 <div class="imgBox" v-for="(item,index) in bannerImg" @click="" :key="index" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></div>
               </div>
             </div>
             <p class="freight">发货时间：付款后7天内发货</p>
             <p class="freight">产品声明：该产品为定制产品，下单后不支持退款</p>
             <p class="freight freightNum">
               <span>数量：</span>
               <el-input-number v-model="goodDetail.num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
               <span>件</span>
             </p>
             <div class="buyBox">
               <div @click="buyClick('addCar')">加入购物车</div>
               <div @click="buyClick('buy')">直接购买</div>
               <div @click="buyClick('shop')">门店定制</div>
               <div @click="buyClick('jinDong')" class="side">京东购买</div>
               <div @click="buyClick('tianMao')" class="side">天猫购买</div>
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
            selected: [],
            pca: pca,
            pcaa: pcaa,
            topImgUrl: '',
            bannerImg: [
              {name:'001',url:'../../../static/img/4.jpg'},
              {name:'002',url:'../../../static/img/5.jpg'},
              {name:'003',url:'../../../static/img/7.jpg'},
              {name:'004',url:'../../../static/img/8.jpg'},
            ],
            goodDetail: {
              title:'MKT-003',
              oldPrice:'3320',
              newPrice:'1600',
              num:1
            }
          }
      },
      created() {
        this.topUrl()
      },
      mounted() {

      },
      watch: {
        selected(old,val) {
          console.log(old,val)
        }
      },
      methods: {
        topUrl() {
          this.topImgUrl = this.bannerImg[0].url
        },
        topImgShow(params) {
          this.topImgUrl = this.bannerImg[params].url
        },
        handleChange(value) {
          console.log(value);
        },
        buyClick(params) {
          alert(params)
        }
      }
    }
</script>
<style>
  .el-input{
    height: 30px;
  }
  .el-input__inner,.el-input-number{
    height: 30px;
    line-height: 30px;
    width: 120px;
    vertical-align: middle;
    outline: none;
  }
  .el-input-number__decrease, .el-input-number__increase{
    background: none;
  }
</style>
<style scoped>
  .content{
    width: 100%;
    background: #efefef;
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
    margin:10px 0 30px;
  }
  .freightNum>span{
    padding-right: 22px;
  }
  .buyBox{
    width: 65%;
    height: 140px;
    display: flex;
    flex-wrap:wrap;
  }
  .buyBox>div{
    width: 120px;
    height: 40px;
    background: #ffa507;
    border-radius: 10px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    margin-right: 20px;
    margin-top: 18px;
    letter-spacing: 1px;
  }
  .buyBox>div:hover{
    color: #efefef;
  }
  .buyBox>.side{
    background: #ff0000;
  }
</style>

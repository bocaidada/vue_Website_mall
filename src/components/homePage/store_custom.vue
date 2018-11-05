<template>
    <section class="content">
        <main class="main">
            <div class="left">
                <div class="search">
                    <div class="input-box">
                      <area-cascader type='text' v-model="selected" :data="pcaa"></area-cascader>
                        <!--<area-select type='text' v-model="selected" :level='0' :data="pcaa" ></area-select>-->
                        <el-input placeholder="请输入当前位置（写字楼、小区、街道或者学校）" v-model="input" class="input-with-select">
                        </el-input>
                      <el-button slot="append" style="border-radius: 0" icon="el-icon-search"></el-button>
                    </div>
                    <button class="search_btn">附近门店</button>
                </div>
                <ul class="list">
                    <li @click="addressPosition(item)" v-for="(item,index) in  shopData" :key="index">
                        <p>{{item.title}}</p>
                        <p>{{item.distance}}</p>
                        <p>{{item.address}}</p>
                    </li>
                </ul>
            </div>
            <div class="right">
              <aMap :message="parentMsg"/>
            </div>
        </main>
    </section>
</template>

<script>
    import { pca, pcaa } from 'area-data'; // v5 or higher
    import aMap from '../subPage/aMap'
    export default {
        name: "store_custom",
        components:{aMap},
        data() {
            return {
              parentMsg:[121.406051,31.179695],
              // parentMsg:{
              //   center:[121.406051,31.179695],
              //   label:{
              //     content:'钦汇园',
              //     offset:[10,12]
              //   }
              // },
              selected: [],
              pca: pca,
              pcaa: pcaa,
              input: '',
              select: '',
              shopData:[
                {
                  title:'杭州市西湖区小二门店',
                  distance:'<500m',
                  address:'杭州西湖区三坝雅苑',
                  abscissa:'171',
                  ordinate:'20'
                },{
                  title:'杭州市西湖区小二门店',
                  distance:'<500m',
                  address:'杭州西湖区三坝雅苑',
                  abscissa:'271',
                  ordinate:'40'
                },{
                  title:'杭州市西湖区小二门店',
                  distance:'<500m',
                  address:'杭州西湖区三坝雅苑',
                  abscissa:'571',
                  ordinate:'70'
                },{
                  title:'杭州市西湖区小二门店',
                  distance:'<500m',
                  address:'杭州西湖区三坝雅苑',
                  abscissa:'471',
                  ordinate:'60'
                },{
                  title:'杭州市西湖区小二门店',
                  distance:'<500m',
                  address:'杭州西湖区三坝雅苑',
                  abscissa:'771',
                  ordinate:'88'
                }
              ],
              // zoom:16,
              // center:[121.406051,31.179695],
              // label:{
              //     content:'钦汇园',
              //     offset:[10,12]
              // }
            }
        },
        created(){

        },
        methods: {
          addressPosition(params) {
              console.log(params)
            this.parentMsg = [params.abscissa, params.ordinate]
          }
        }


    }
</script>

<style scoped>
    .content{
        width: 100%;
        overflow: hidden;
    }
    .main{
      width: 88%;
      float: right;
      /*width: 1400px;*/
      background: #fff;
      overflow: hidden;
      height: 90vh;
      position: relative;
    }
    @media screen and (max-width: 1600px) {
      .main{
        width: 100% !important;
      }
    }
    /*.left,.right{*/
        /*height: 100%;*/
        /*float: left;*/
    /*}*/
    /*.left{*/
      /**/
    /*}*/
    .left{
      width:420px;
      position: absolute;
      left: 0;
      top: 0;
      border-right:3px solid #585858;
      box-sizing: border-box;
      background: #fff;
      z-index: 10;
    }
    .right{
      width:100%;
      height: 90vh;
      padding-left: 420px;
      box-sizing: border-box;
    }
    /*.el-select .el-input {*/
        /*width: 130px;*/
    /*}*/
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    .search{
      /*height: 20%;*/
      box-sizing: border-box;padding:50px 20px 20px;border-bottom: 1px dashed #E7E7E7;
    }
    .search_btn{
      width: 100%;
      height: 40px;
      background: #07B08F;
      font-size: 12px;
      text-align: center;
      line-height: 40px;
      color: #ffffff;
      border:0;
      outline: 0;
      border-radius: 10px;
      cursor: pointer;
    }
    .list{
      padding: 20px 20px 30px;
      box-sizing: border-box;
      overflow: hidden;
      overflow-y: scroll;
      height: 72vh;
    }
    .list li{
      cursor: pointer;
      width:100%;
      height: auto;
      border:1px solid #CECECE;
      border-radius: 10px;
      margin-bottom: 20px;
      padding:20px;
      text-align: left;
      box-sizing: border-box;
    }
    .list li p{
      font-size: 12px;
      color: #666;
      line-height: 25px;
      margin-top:15px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .list li p:first-child{
      font-size: 16px;
      font-weight: 600;
      color: #333;
      line-height: 30px;
      margin:0;
    }
    .list::-webkit-scrollbar {/*滚动条整体样式*/
      width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .list::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      background: #eee;
    }
    .list::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 10px;
      background: #ffffff;
    }
    .amap-box{
      height: 100%;
    }
    .input-box{
      border:1px solid #ccc;
      height: 40px;
      margin-bottom:20px;
      text-align: left;
      display: flex;
    }
</style>
<style>
    .search .area-select{
        border:none;
        border-radius: 0;

        height: 40px;
      width: 180px;
      /*line-height: 40px;*/
    }
    .search .area-cascader-wrap{
        width: 140px;
        float: left;
      border-right: 1px solid #ccc;
    }
    .search .area-select.large{
        width: 100%;
    }
    .input-with-select{
        width: 70%;
        float: left;
        border:none;

    }
    .search .el-input__inner{
        border: none;
    }
    .search .area-select{
      width: 80px;
    }
</style>

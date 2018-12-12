<template>
    <section class="content">
        <!--<div class="main">-->
            <div class="left">
                <div class="search">
                    <div class="input-box">
                      <area-cascader type='text' v-model="selected" :data="pcaa"></area-cascader>
                        <!--<area-select type='text' v-model="selected" :level='0' :data="pcaa" ></area-select>-->
                        <el-input placeholder="请输入当前位置（写字楼、小区、街道或者学校）" v-model="inputDetail" class="input-with-select">
                        </el-input>
                      <el-button slot="append" style="border-radius: 0" @click="search()" icon="el-icon-search"></el-button>
                    </div>
                    <button class="search_btn">附近门店</button>
                </div>
                <ul class="list">
                    <li @click="addressPosition(item)" v-for="(item,index) in  shopData" :key="index">
                        <p>{{item.name}}</p>
                        <p>{{item.distance}}</p>
                        <p>{{item.address}}</p>
                    </li>
                </ul>
            </div>
            <div class="right">
              <!--<aMap :message="parentMsg"/>-->
              <div id="l-map" style="width: 100%;height: 100%"></div>
            </div>
        <!--</div>-->
    </section>
</template>

<script>
    import { pca, pcaa } from 'area-data'; // v5 or higher
    // import aMap from '../subPage/aMap'
    export default {
        name: "store_custom",
        // components:{aMap},
        data() {
            return {
              map:{},
              selected: [],
              pca: pca,
              pcaa: pcaa,
              inputDetail: '',
              select: '',
              shopData:[],
            }
        },
        created(){

        },
        watch:{
          "selected" (val,old) {
            // console.log(val)
            if(val.length == 2) {
              this.select = val[0] + val[1]
              // console.log(this.select)
            }
          }
        },
        mounted() {
          this.init()
        },
        methods: {
          addressPosition(params) {
            // console.log(params)
            let point = new BMap.Point(params.lon,params.lat);
            this.map.centerAndZoom(point,12);
            this.map.addOverlay(new BMap.Marker(point));
          },
          init() {
            let _this = this;
            this.map = new BMap.Map("l-map");
            // this.map = map;
            this.map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
            this.map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
            let point = new BMap.Point(120.21937542,30.25924446);
            this.map.centerAndZoom(point,12);
            this.$message({
              message: '地址信息定位中，请稍等',
              type: 'warning'
            })
            let geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
              if(this.getStatus() == BMAP_STATUS_SUCCESS){
                var mk = new BMap.Marker(r.point);
                _this.map.addOverlay(mk);
                _this.map.panTo(r.point);
                // alert('您的位置：'+r.point.lng+','+r.point.lat);
                _this.$http.get('shopNearby',{lat:r.point.lat,lon:r.point.lng,page:1}).then((res)=>{
                  console.log(res.data)
                  _this.shopData = res.data.data.list
                  if(_this.shopData.length){
                    _this.$message({
                      message: '以查询到最近门店',
                      type: 'success'
                    })
                  }else{
                    _this.$message({
                      message: '该区域附近没有门店',
                      type: 'error'
                    })
                  }
                })
              }
              else {
                alert('failed'+this.getStatus());
              }
            },{enableHighAccuracy: true})
          },
          search() {
            if(this.select == ''){
              this.$message.error('请选择搜索区域')
            }else {
              let address = this.select + this.inputDetail
              let _this = this
              // 创建地址解析器实例
              let myGeo = new BMap.Geocoder();
              // 将地址解析结果显示在地图上,并调整地图视野
              myGeo.getPoint(address, function(point){
                // console.log(point.lat)
                // console.log(point.lng)
                if (point) {
                  _this.map.centerAndZoom(point, 12);
                  _this.map.addOverlay(new BMap.Marker(point));
                  _this.$http.get('shopNearby',{lat:point.lat,lon:point.lng,page:1}).then((res)=>{
                    console.log(res.data)
                    _this.shopData = res.data.data.list
                    if(_this.shopData.length){
                      _this.$message({
                        message: '以查询到最近门店',
                        type: 'success'
                      })
                    }else{
                      _this.$message({
                        message: '该区域附近没有门店',
                        type: 'error'
                      })
                    }
                  })
                }else{
                  alert("您选择地址没有解析到结果!");
                }
              }, _this.selected[0]);
            }
          }
        }
    }
</script>

<style scoped>
    .content{
      width: 100%;
      overflow: hidden;
      position: relative;
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
      height: 90vh;
      overflow: hidden;
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
      background: #CFA972;
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

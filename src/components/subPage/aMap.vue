<template>
  <div class="content">
    <el-amap class="amapBox" :vid="'amap-vue'" :zoom="zoom" :center="message">
      <el-amap-marker vid="marker"
                      :position="message"
                      :label="label">
      </el-amap-marker>
    <!--<el-amap-marker v-for="marker in markers" :position="marker.position">-->
    <!--</el-amap-marker>-->
    </el-amap>
  </div>
</template>

<script>
    import Vue from 'vue'
    import VueAMap from 'vue-amap';   //高德地图
    Vue.use(VueAMap);
    VueAMap.initAMapApiLoader({
      key: 'your amap key',
      plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
      // 默认高德 sdk 版本为 1.4.4
      v: '1.4.4'
    });
    export default {
        name: "aMap",
        props: {
          message:Array
        },
        data() {
          return {
            zoom:16,
            // center:this.message,
            label:{
              content:'钦汇园',
              offset:[10,12]
            }
          }
        },
      created() {
        // this.init()
       },
      watch: {
          message:function (val,old) {
            console.log(val,old)
          }
      },
      methods: {
          init() {
            this.markers = [
              {
                position: [121.5273285, 31.21515044]
              }, {
                position: [121.5273286, 31.21515045]
              }
            ];
            // 模拟实时更新位置
            // 开启一个1s的轮训，每个人的经纬度都自增0.00001
            const step = 0.00001;
            setInterval(() => {
              this.markers.forEach((marker) => {
                marker.position = [marker.position[0] + step, marker.position[1] + step];
              });
            }, 1000);
          }
      }
    }
</script>

<style scoped>
  .content{
    width: 100%;
    height: 100%;
  }
  .amapBox{
    width: 100%;
    height: 100%;
  }
</style>

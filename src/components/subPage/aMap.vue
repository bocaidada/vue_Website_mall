<template>
  <div class="content">
    <div id="l-map" style="height:900px"></div>
  </div>
</template>

<script>
    export default {
        name: "aMap",
        props: {
          message:Array
        },
        data() {
          return {

          }
        },
      created() {
       },

      mounted() {

        this.init()
      },
      watch: {
          message:function (val,old) {
            console.log(val,old)
          }
      },
      methods: {
        init() {
          let _this = this;
          let map = new BMap.Map("l-map");
          map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
          map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
          let point = new BMap.Point(120.21937542,30.25924446);
          map.centerAndZoom(point,12);


          let geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
              var mk = new BMap.Marker(r.point);
              map.addOverlay(mk);
              map.panTo(r.point);
              alert('您的位置：'+r.point.lng+','+r.point.lat);
              _this.$http.get('shopNearby',{lat:r.point.lat,lon:r.point.lng,page:1}).then((res)=>{
                console.log(res.data)
              })
            }
            else {
              alert('failed'+this.getStatus());
            }
          },{enableHighAccuracy: true})
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

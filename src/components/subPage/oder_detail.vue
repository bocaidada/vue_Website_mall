<template>
    <div class="content">
      <div class="main">
        <div class="order_detail">
          <div class="detail_top">
            <span>订单详情</span>
          </div>
          <div>
            <span>订单号：</span>
            <span style="margin-right: 40px">{{listData.no}}</span>
            <span>订单状态：</span>
            <span>{{listData.status}}</span>
          </div>
          <p>
            <span>收货地址：</span>
            <span>{{listData.address}}</span>
          </p>
          <table cellpadding="0" cellspacing="0" v-if="orderNum == 1">
          <tr>
            <th>客户姓名</th>
            <th>联系电话</th>
            <th>产品型号</th>
            <th>产品颜色</th>
            <th>产品尺寸</th>
            <th>产品价格(元)</th>
            <th>订购数量</th>
          </tr>
          <tr>
            <td>{{listData.customerName}}</td>
            <td>{{listData.customerMobile}}</td>
            <td>{{listData.model}}</td>
            <td>{{listData.attr}}</td>
            <td>{{listData.size}}</td>
            <td>{{listData.price}}</td>
            <td>{{listData.num}}</td>
          </tr>
        </table>
          <table cellpadding="0" cellspacing="0" v-else>
            <tr>
              <th>产品型号</th>
              <th>产品颜色</th>
              <th>产品价格(元)</th>
              <th>订购数量</th>
            </tr>
            <tr>
              <td>{{listData.model}}</td>
              <td>{{listData.attr}}</td>
              <td>{{listData.price}}</td>
              <td>{{listData.num}}</td>
            </tr>
          </table>
        </div>
        <div class="detail_top">
          <span>订单进度</span>
        </div>
        <div class="schedule">
          <div class="schedule_top">
            <div>
              <img :src="[hitNum >= 1 ? serverBase+stateImg.yellow1 : serverBase+stateImg.gray1]" alt="">
              <img :src="[hitNum >= 2 ? serverBase+stateImg.yellow2 : serverBase+stateImg.gray2]" alt="">
              <img :src="[hitNum >= 3 ? serverBase+stateImg.yellow3 : serverBase+stateImg.gray3]" alt="">
              <img :src="[hitNum >= 4 ? serverBase+stateImg.yellow4 : serverBase+stateImg.gray4]" alt="">
            </div>
          </div>
          <div cla ss="schedule_bot">
            <!--<div class="schedule_bot_state">-->
              <!--<img :src="serverBase+'/news/yiqianshou_01.png'" alt="">-->
              <!--<span>已签收</span>-->
            <!--</div>-->
            <div class="schedule_bot_flow">
              <table border="0">
                <tr v-for="(item,index) in tableData" :key="index">
                  <td v-if="index == 0" style="width: 210px">{{item.dt}}</td>
                  <td v-else>{{item.date == tableData[index-1].dt ? '' : item.dt}}</td>
                  <td v-if="index == 0" class="hit" style="width: 50px;position: relative">
                    <div class="circle"></div>
                    <div style="position:absolute;width: 25px;height: 50%;border-right: 1px dashed #dfdfdf;bottom: 0;left: 0"></div>
                  </td>
                  <td v-else class="hit" style="width: 50px;position: relative">
                    <div class="circle" v-if="item.dt != tableData[index-1].dt"></div>
                    <div style="width: 25px;height: 100%;border-right: 1px dashed #dfdfdf"></div>
                  </td>
                  <!--<td v-if="index == 0">{{item.week}}</td>-->
                  <!--<td v-else>{{item.week == tableData[index-1].week ? '' : item.week}}</td>-->
                  <!--<td>{{item.time}}</td>-->
                  <td style="text-align: left;padding-left: 20px">{{item.name}} ( {{item.content}} )</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "oder_detail",
        data() {
            return {
              orderType:'userOrderInfo',
              orderNum: this.$store.state.orderType,
              serverBase:this.$store.state.qiNiuServer,
              hitNum: 2,
              listData:{},
              stateImg:{
                gray1:'/news/gray_1.png',
                gray2:'/news/gray_2.png',
                gray3:'/news/gray_3.png',
                gray4:'/news/gray_4.png',
                yellow1:'/news/yellow_1.png',
                yellow2:'/news/yellow_2.png',
                yellow3:'/news/yellow_3.png',
                yellow4:'/news/yellow_4.png',
              },
              tableData:[
                {date: '2018-11-29',week:'周四',time:'14:01:55',info:'已接单（您的订单商家已经开始处理）'},
                {date: '2018-11-29',week:'周四',time:'14:01:55',info:'已接单（您的订单商家已经开始处理）'},
                {date: '2018-11-29',week:'周四',time:'14:01:55',info:'已接单（您的订单商家已经开始处理）'},
                {date: '2018-11-23',week:'周一',time:'14:01:55',info:'测量（厂家会安排人员尽快与您取得联系并安排工作人员上门测量）'},
                {date: '2018-11-23',week:'周一',time:'14:01:55',info:'已接单（您的订单商家已经开始处理）'},
                {date: '2018-11-23',week:'周一',time:'14:01:55',info:'已接单（您的订单商家已经开始处理）'},
                {date: '2018-11-21',week:'周六',time:'14:01:55',info:'已接单（您的订单商家已经开始处理）'},
                {date: '2018-11-21',week:'周六',time:'14:01:55',info:'已接单（您的订单商家已经开始处理）'}
              ]
            }
        },
        created() {
          this.dataInit()
        },
        watch: {
          "$store.state.orderType" (val,old) {
            this.orderNum = val
          }
        },
        methods: {
          dataInit() {
            if(this.orderNum == 1) {
              this.orderType = 'shopOrderInfo'
            }else{
              this.orderType = 'userOrderInfo'
            }
            this.$http.get(this.orderType,{id:this.$route.params.id}).then((res)=>{
              if(res.data.code == 200) {
                this.listData = res.data.data
                this.hitNum = this.listData.schedule.step
                this.tableData = this.listData.schedule.list
              }
            })
          }
        }
    }
</script>

<style scoped>
  .content{
    width: 100%;
    padding: 40px 0 80px;
    background: #efefef;
    font-size: 18px;
    text-align: left;
  }
  .main{
    background: #fff;
    box-sizing: border-box;
    padding: 20px 40px;
  }
  .order_detail{
    width: 100%;
  }
  .detail_top{
    padding: 10px 0;
    border-bottom: 1px solid #efefef;
    margin-bottom: 40px;
  }
  .detail_top>span{
    border-left: 6px solid #C39B63;
    color: #C39B63;
    padding-left: 10px;
  }
  .order_detail>p{
    line-height: 60px;
    font-size: 16px;
    color: #999;
    margin-bottom: 30px;
  }
  table{
    width: 100%;
    color: #333;
    font-size: 16px;
    border: 2px solid #eee;
    margin-bottom: 100px;
  }
  th,td{
    text-align: center;
  }
  th{
    height: 50px;
    background: #EEEEEE;
  }
  td{
    height: 70px;
  }
  .schedule_top{
    width: 100%;
    height: 100px;
    margin-bottom: 80px;
    position: relative;
  }
  .schedule_top>div{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    z-index: 10;
  }
  .schedule_top>div>img{
    height: 100%;
  }
  .schedule_top::after{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    content: '';
    width: 95%;
    border-bottom: 1px dashed #dfdfdf;
    bottom: 4px;
  }
  .schedule_bot_state{
    color: #C39B63;
    box-sizing: border-box;
    padding-left: 10px;
    margin-bottom: 30px;
  }
  .schedule_bot_state>img{
    vertical-align: middle;
    margin-right: 10px;
  }
  .schedule_bot_flow{
    width: 100%;
  }
  .schedule_bot_flow>table{
    border: none;
  }
  .schedule_bot_flow>table td{
    /*text-align: left;*/
    height: 60px;
  }
  .schedule_bot_flow .hit{
    width: 50px;position: relative
  }
  .schedule_bot_flow .hit .circle{
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #C39B63;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1;
  }
</style>

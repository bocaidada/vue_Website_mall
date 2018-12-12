<template>
  <div class="content">
    <div class="main">
      <div class="imgBox">
        <p>支付成功！您的订单正以火箭的速度奔向您！！</p>
        <img :src="$store.state.qiNiuServer+'/pay_success.png'" alt="">
      </div>
      <div class="butBox">
        <div>
          <router-link to="/store_manage" v-if="orderNum == 1">订单列表</router-link>
          <router-link to="/my_order" v-else>订单列表</router-link>
        </div>
        <div>
          <router-link to="/">返回首页</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "pay_success",
        data() {
          return {
            orderNum: 2,
          }
        },
        mounted() {
          if(this.$route.params.id == 1) {
            this.orderNum = 2
          }else{
            this.orderNum = 1
          }
        },
        methods: {}
    }
</script>

<style scoped>
  .content{
    width: 100%;
    height: 88vh;
  }
  .main{
    height: 100%;
    position: relative;
  }
  .imgBox{
    height: 60px;
    line-height: 60px;
    display: inline-block;
    margin: 200px auto 100px;
  }
  .imgBox>p{
    float: left;
    font-size: 24px;
    color: #cfa972;
    margin-right: 40px;
  }
  .imgBox>img{
    float: left;
    height: 100%;
  }
  .butBox{
    width: 450px;
    height: 50px;
    margin: 0 auto;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
  }
  .butBox>div{
    width: 150px;
    height: 100%;
    text-align: center;
    font-size: 18px;
    border-radius: 5px;
    border: 2px solid #cfa972;
    cursor: pointer;
  }
  .butBox>div>a{
    color: #cfa972;
    letter-spacing: 1px;
  }
</style>

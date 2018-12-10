<template>
  <div class="content">
    <div class="main">
      <div class="main_top" v-if="orderNum == 1">
        <router-link to="/store_manage">订单列表</router-link>
        <span> > </span>
        <router-link :to="'/store_manage/oder_detail/'+$route.params.id">订单详情</router-link>
        <span> > </span>
        <router-link to="" style="color: #CFA972">申请售后</router-link>
      </div>
      <div class="main_top" v-else>
        <router-link to="/my_order">订单列表</router-link>
        <span> > </span>
        <router-link :to="'/my_order/oder_detail/'+$route.params.id">订单详情</router-link>
        <span> > </span>
        <router-link to="" style="color: #CFA972">申请售后</router-link>
      </div>
      <div class="main_box">
        <div class="main_title">
          <div>
            <span>订单号：</span>
            <span>{{dataList.orderNo}}</span>
          </div>
          <button v-if="solveFlag" @click="solve()">确认解决</button>
        </div>
        <div class="explain">
            {{dataList.explain}}
        </div>
        <div class="main_title">
          <div>
            <span>更近进度</span>
          </div>
          <span v-if="solveFlag">处理中</span>
          <span v-else>已处理</span>
        </div>
        <div class="record" v-if="dataList">
          <div class="service" v-for="(item,index) in dataList.list" :key="index">
            <div class="service_top">
              <span v-if="item.fr == 1">我</span>
              <span v-if="item.fr == 2">金凯客服</span>
              <span>{{item.createTime}}</span>
            </div>
            <p>{{item.msg}}</p>
          </div>
        </div>
        <div v-if="solveFlag">
          <textarea name="" id="" v-model="createData.msg" cols="30" rows="10" maxlength="255" placeholder="请输入您要反馈的问题..."></textarea>
          <div style="height: 45px">
            <button @click="chatCreate()">提交</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "after_sale_dispose",
        data() {
            return {
              orderNum: this.$store.state.orderType,
              solveFlag: true,
              dataList:{},
              createData:{
                id: this.$route.params.id,
                msg:''
              }
            }
        },
        created() {
          this.dataInit()
        },
        watch :{
          "$store.state.orderType" (val,old) {
            this.orderNum = val
          }
        },
        methods: {
          dataInit() {
            this.$http.get('serviceChatList',{id:this.$route.params.id}).then((res)=>{
              if(res.data.code == 200) {
                console.log(res.data)
                this.dataList = res.data.data
                if(res.data.data.status == 2) {
                  this.solveFlag = false
                }
              }
            })
          },
          solve() {
            this.$http.post('orderServiceChatFinish',{id:this.$route.params.id}).then((res)=>{
              if(res.data.code == 200) {
                this.solveFlag = false
                // console.log(res.data)
              }
            })
          },
          chatCreate() {
            if(this.createData.msg == ''){
              this.$message.error('反馈信息不能为空')
              return
            }
            this.$http.post('orderServiceChatCreate',this.createData).then((res)=>{
              if(res.data.code == 200){
                this.createData.msg = ''
                if(this.orderNum == 1){
                  this.$router.push('/store_manage')
                }else{
                  this.$router.push('/my_order')
                }
              }
            })
          }
        }
    }
</script>

<style scoped>
  .content{
    width: 100%;
    background: #efefef;
    padding: 40px 0;
  }
  .content>.main{
    background: #fff;
  }
  .content>.main>.main_top{
    line-height: 60px;
    background: #efefef;
    text-align: left;
  }
  .content>.main>.main_top>a{
    color: #434343;
  }
  .main_box{
    padding: 35px 40px;
    text-align: left;
    color: #434343;
  }
  .main_title{
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    margin-bottom: 20px;
    color: #cf935e;
  }
  .main_title>div{
    float: left;
    text-align: left;
  }
  .main_title>span{
    float: right;
  }
  button{
    float: right;
    color: #fff;
    border: none;
    outline: none;
    width: 140px;
    height: 40px;
    border-radius: 5px;
    background: #cfa972;
    letter-spacing: 2px;
    cursor: pointer;
    font-size: 18px;
  }
  .main_title>button:hover{
    background: #cf935e;
  }
  .explain{
    width: 100%;
    height: 200px;
    /*border: 1px solid #cfa972;*/
    border-radius: 5px;
    box-sizing: border-box;
    padding: 20px;
    line-height: 30px;
    margin-bottom: 40px;
  }
  .record{
    width: 100%;
    /*height: 400px;*/
    /*border: 1px solid #cfa972;*/
    border-radius: 5px;
    box-sizing: border-box;
    padding: 20px;
    line-height: 30px;
    margin-bottom: 40px;
  }
  .service{
    padding: 20px 0;
    border-bottom: 1px dashed #efefef;
    margin-bottom: 20px;
  }
  .service>.service_top{
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    color: #cfa972;
  }
  .service>p{
    line-height: 30px;
  }
  textarea{
    outline: none;
    border: 1px solid #cfa972;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    height: 340px;
    padding: 20px;
    resize: none;
    font-size: 18px;
    color: #333;
    margin-bottom: 25px;
  }
</style>

<template>
  <div style="position: relative">
    <router-view/>
    <transition name="shopLogin-fade">
      <div class="shopLogin" v-if="formFlag">
        <div class="box">
          <h2>经销商登陆</h2>
          <el-form style="width: 100%" :model="ruleForm" :rules="rules" status-icon ref="ruleForm">
            <el-form-item
              prop="username">
              <el-input type="text" maxlength="11" v-model="ruleForm.username" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item
              prop="password">
              <el-input type="password" maxlength="20" v-model.number="ruleForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </transition>
    <section v-if="pageFlag" class="content">
      <div class="banner">
        <div class="topBox">
          <div class="topBox_left">
            <div class="topBox_left_logo">
              <img :src="serverBase+'/server/xian_index_01.png'" alt="">
            </div>
            <div class="topBox_left_info">
              <p>
                <span>{{shopName}}</span>
                <a href="javascript:;" onclick="window.open('http://p.qiao.baidu.com/cps/chat?siteId=12829790&userId=26860524','门店客服','width=1000,height=600,menubar=no,toolbar=no, status=no,scrollbars=yes,top=100');">
                  <img :src="serverBase+'/server/xian_index_02.png'" alt="">
                  <span>门店沟通</span>
                </a>
              </p>
              <span>{{shopAddress}}</span>
            </div>

          </div>
          <div class="topBox_right">
            <p :class="{hit:indentNum == 0}" @click="topChange(0)">商城定制</p>
            <p :class="{hit:indentNum == 1}" @click="topChange(1)">订单管理</p>
          </div>
        </div>
      </div>
      <div class="banners" style="height: 450px" v-if="bannerFlag">
        <swiper :options="swiperOption" style="height: 100%">
          <a :href="item.url" target="_blank" v-for="(item,index) in bannerData.list" style="display: block;width: 100%;height: 100%">
            <swiper-slide  :key="index" :style="{background: 'url('+bannerData.baseImgUrl+item.img+') no-repeat center/cover'}"></swiper-slide>
          </a>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>

      <div class="main">
        <div v-if="indentFlag">
          <div class="case_content">
            <div class="case_content_title">
              <span @click="changeCole(num)" :class="{col:colorChange == num}">全部</span>
              <span @click="changeCole(item.id)" :class="{col:colorChange == item.id}" v-for="item in classify">{{item.name}}</span>
            </div>
            <div class="case_content_box" style="position: relative">
              <div v-if="caseData.length == 0" style="position: absolute;left: 50%;transform: translateX(-50%);top: 30%;">
                <img :src="serverBase+'/kongbai_02.png'" alt="" style="width: 300px;display: block;">
                <p style="line-height: 80px;font-size: 20px;color: #cfa972;">暂时没有数据</p>
              </div>
              <ul>
                <router-link tag="li" :to="{name:'shop_product_detail',params: {id:item.id}}" v-for="(item,index) in caseData" :key="index">
                  <div class="imgBox">
                    <div class="box" :style="{background: 'url('+baseUrl+item.img+') no-repeat center/cover'}"></div>
                  </div>
                  <span class="name">
                  <span class="tit">{{item.model}}</span>
                  <span class="price">￥{{item.shopPrice}}</span>
                </span>
                  <span class="info">简介：{{item.summary}}</span>
                </router-link>
              </ul>
            </div>
            <div v-if="totalNum > 9" class="pageNum">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="9"
                layout="prev, pager, next, jumper"
                :total="totalNum">
              </el-pagination>
            </div>
          </div>
        </div>
        <div v-if="!indentFlag" style="padding: 80px 0 40px;min-height: 500px">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-class-name="tableheaderClassName"
            @selection-change="handleSelectionChange1">
            <el-table-column
              align="center"
              prop="no"
              label="订单号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              prop="customerName"
              label="姓名"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              prop="customerMobile"
              label="联系方式"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              prop="createTime"
              label="下单时间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              prop="itemModel"
              label="产品型号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              prop="itemAttr"
              label="属性"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="itemSize"
              align="center"
              label="尺寸(cm)"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="itemNum"
              align="center"
              label="数量"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              prop="status"
              label="订单状态"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              prop="logisticsStatus"
              label="物流状态"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              align="center"
              prop="logisticsStatus"
              label="售后">
              <template  slot-scope="scope">
                <span v-if="scope.row.serviceStatus == -1">--</span>
                <el-button
                  v-if="scope.row.serviceStatus == 0"
                  type="text"
                  size="mini"
                  @click="afterSale(scope.row,1)">申请售后</el-button>
                <el-button
                  v-if="scope.row.serviceStatus == 1"
                  type="text"
                  size="mini"
                  @click="afterSale(scope.row,2)">售后处理中</el-button>
                <span v-if="scope.row.serviceStatus == 2">已结单</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template  slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleSees(scope.row,1)" v-if="scope.row.btnStatus == 1">发货</el-button>
                <el-button
                  size="mini"
                  type="text"
                  @click="handleSees(scope.row,2)" v-if="scope.row.btnStatus == 2">收货</el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="handleSees(scope.row,3)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="totalNum1 > 20" class="pageNum">
            <el-pagination
              background
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page.sync="currentPage1"
              :page-size="20"
              layout="prev, pager, next, jumper"
              :total="totalNum1">
            </el-pagination>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "store_manage",
    data() {
      let checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          // console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      }
      return {
        serverBase:this.$store.state.qiNiuServer,
        bannerData:{},
        shopName:'杭州西湖分店',
        shopAddress:'浙江省杭州市330106000君尚国际',
        formFlag: false,
        indentNum: 0,
        indentFlag: true,
        bannerFlag: false,
        num: 0,
        type: 0,
        baseUrl:'',
        classify:[],
        pageFlag: this.$store.state.storeFlag,
        colorChange: 0,
        currentPage: 1,
        currentPage1:1,
        totalNum: 10,
        totalNum1: 10,
        goodsList:{
          catalogId: 0,
          page: 1
        },
        ruleForm: {
          username: '',
          password:'',
          type: 2
        },
        caseData:[],
        tableData:[],
        rules: {
          username: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        },
        swiperOption: {
          spaceBetween: 30,   //图片之间的间距
          loop: true,         //循环播放
          grabCursor: true,  //手势
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          pagination: {   //轮播点
            el: '.swiper-pagination',
            dynamicBullets: true
          }
        }
      }
    },
    created() {
      this.shop_info()
      setTimeout(()=>{
        this.shop_ban()
      },0)
      setTimeout(()=>{
        this.dataInit()
      },1)
      setTimeout(()=>{
        this.contentList(this.type,1)
      },2)
    },
    mounted() {

    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        // console.log(to);
        // console.log(from);
        if(from.path == '/store_manage') {
          this.pageFlag = false
        }
        if(to.path == '/store_manage') {
          this.pageFlag = true
          this.$store.commit('orderType',1)
        }
      }
    },
    methods: {
      // 产品分类
      dataInit() {
        this.$http.get('goodsTags','').then((res)=>{
          console.log(res.data)
          if(res.data.code == 200){
            this.classify = res.data.data
          }
        })
      },
      // 商品分类
      contentList(types,pages) {
        this.$http.get('goodsList_by_tag',{tagId:types,page:pages}).then((res)=>{
          // console.log(res.data)
          if(res.data.code == 200) {
            this.totalNum = res.data.data.counts
            this.baseUrl = res.data.data.baseUrl
            this.caseData = res.data.data.list
          }
        })
      },
      //门店订单列表
      shop_order_list(pages) {
        this.$http.get('shopOrderList',{page:pages}).then((res)=>{
          // console.log(res.data)
          if(res.data.code == 200) {
            this.tableData = res.data.data.list
            this.totalNum1 = res.data.data.counts
          }
        })
      },
      //门店信息
      shop_info() {
        this.$http.get('shopInfo','').then((res)=>{
          // console.log(res.data)
          if(res.data.code == 200){
            this.shopName = res.data.data.name
            this.shopAddress = res.data.data.address
          }else{
            this.$message({
              message:res.data.msg,
              type:'error'
            })
            if(res.data.error_code == 1006 || res.data.error_code == 1001){
              this.formFlag = true
            }
          }
        })
      },
      //门店活动banner
      shop_ban() {
        this.$http.get('shopBanner','').then((res)=>{
          // console.log(res.data)
          if(res.data.code == 200){
            if(res.data.data.list.length){
              this.bannerFlag = true
            }
            this.bannerData = res.data.data
          }
        })
      },
      changeCole(index) {
        this.type = index
        this.colorChange = index
        this.contentList(index,1)
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.contentList(this.type,val)
        // console.log(`当前页: ${val}`);
      },
      topChange(params) {
        this.indentNum = params
        if(params == 0) {
          this.indentFlag = true
          if(this.bannerData.list.length){
            this.bannerFlag = true
          }
        }else{
          this.indentFlag = false
          this.shop_order_list(1)
          this.bannerFlag = false
        }
      },
      //设置表头颜色
      tableheaderClassName({ row, rowIndex }) {
        return "table-head-th";
      },
      // 获取多选参数,计算价格
      handleSelectionChange1(val) {
        // this.multipleSelection = val;
      },
      handleSizeChange1(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange1(val) {
        this.shop_order_list(val)
        // console.log(`当前页: ${val}`);
      },
      handleSees(row,index) {
        console.log(row)
        if(index == 1) {
          this.$confirm('此操作将支付剩余70%余款, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.post('shopOrderPay',{id:row.id}).then((res)=>{
              if(res.data.code == 200){
                // console.log(res.data)
                this.$message({
                  type: 'success',
                  message: '下单成功!'
                });
                const div = document.createElement('div');
                div.innerHTML = Base64.decode(res.data.data.html);
                document.body.appendChild(div);
                document.forms.alipaysubmit.submit();
              }else{
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消支付'
            });
          });
        }else if(index == 2){
          this.$http.post('shopOrderStatus',{id:row.id}).then((res)=>{
            // console.log(res.data)
            if(res.data.code == 200) {
              this.shop_order_list(1)
            }
          })
        }else{
          this.$router.push("/store_manage/oder_detail/"+row.id)
        }
      },
      afterSale(row,index) {
        if(index == 1) {
          this.$router.push("/store_manage/after_sale/"+row.id)
        }else if(index == 2){
          this.$router.push("/store_manage/after_sale_dispose/"+row.id)
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('login',this.ruleForm).then((res)=>{
              // console.log(res.data)
              if(res.data.code == 200){
                this.$message({
                  message: '登陆成功！！！',
                  type: 'success'
                })
                this.$refs[formName].resetFields();
                this.$store.commit('userToken',res.data.data.token)
                this.formFlag = false
                this.shop_info()
                setTimeout(()=>{
                  this.shop_ban()
                },0)
                setTimeout(()=>{
                  this.dataInit()
                },1)
                setTimeout(()=>{
                  this.contentList(this.type,1)
                },2)
              }else{
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>
<style>
  .table-head-th{
    background-color: #cfa972 !important;
    color: #fff;
  }
</style>
<style scoped>
  .content,.banner{
    width: 100%;
    background: rgb(241,241,241);
  }
  .banner{
    height: 260px;
    background: #fff;
  }
  .topBox{
    width: 1200px;margin: 0 auto;
    padding: 66px 0;
    box-sizing: border-box;
    height: 100%;
    font-size: 22px;
  }
  .topBox>.topBox_left{
    height: 100%;
    float: left;
    box-sizing: border-box;
    padding-top: 14px;
  }
  .topBox_left>.topBox_left_logo{
    height: 100%;
    float: left;
    margin-right: 20px;
  }
  .topBox_left>.topBox_left_info{
    text-align: left;
    float: left;
  }
  .topBox_left>.topBox_left_info>span{
    display: block;
    line-height: 40px;
    font-size: 14px;
    color: #999;
  }
  .topBox_left>.topBox_left_info>p{
    line-height: 50px;
  }
  .topBox_left>.topBox_left_info>p>a{
    margin-left: 10px;
    color: #CFA972;
    font-size: 16px;
  }
  .topBox_left>.topBox_left_info>p>a>img{
    vertical-align: middle;
    margin-right: 5px;
  }
  .topBox>.topBox_right{
    width: 200px;
    height: 100%;
    float: right;
    text-align: right;
  }
  .topBox>.topBox_right>p{
    line-height: 60px;
    cursor: pointer;
  }
  .topBox>.topBox_right>.hit{
    color: #CFA972;
  }
  .banners>img{
    display: block;
    margin-bottom: 30px;
  }
  .case_content{
    padding: 20px 30px;
  }
  .case_content>.case_content_title{
    line-height: 20px;
    text-align: left;
    color: #999;
    margin-bottom: 30px;
  }
  .case_content>.case_content_title>span{
    text-align: center;
    display: inline-block;
    width: 60px;
    cursor: pointer;
    border-left: 2px solid #dfdfdf;
  }
  .case_content>.case_content_title>span:first-child{
    border-left: none;
    text-align: left;
    width: 45px;
  }
  .col{
    color: #333;
  }
  .case_content_box{
    padding: 80px 50px 40px;
    background: #fff;
  }
  .case_content_box>ul{
    width: 100%;
    /*height: auto;*/
    height: 1310px;
    overflow: hidden;
  }
  .case_content_box>ul>li{
    width: 28%;
    margin-bottom: 60px;
    text-align: left;
    padding: 0 0 20px;
    cursor: pointer;
    float: left;
    margin-right: 8%;
    box-shadow: 3px 3px 46px 3px rgba(131,121,115,0.15);
    transition: 1s;
    border-radius: 4px;
    overflow: hidden;
  }
  .case_content_box>ul>li:nth-child(3n){
    margin-right: 0;
  }
  .case_content_box>ul>li>.imgBox{
    height: 280px;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
  }
  .case_content_box>ul>li>.imgBox>.box{
    height: 100%;
    transition: 1s;
  }
  .case_content_box>ul>li:hover .box{
    transform: scale(1.1);
  }
  .case_content_box>ul>li>span{
    display: block;
    padding: 0 15px;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .case_content_box>ul>li>.name{
    line-height: 50px;
    font-size: 18px;
    margin-top: 10px;
  }
  .case_content_box>ul>li>.name>.tit{
    border-left: 4px solid #CFA972;
    padding-left: 10px;
  }
  .case_content_box>ul>li>.name>.price{
    float: right;
    color: #CFA972;
  }
  .case_content_box>ul>li>.info{
    line-height: 20px;
    font-size: 14px;
    color: #999;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .pageNum{
    padding-right: 40px;
    box-sizing: border-box;
    text-align: right;
    margin-bottom: 30px;
  }
  .pageNum[data-v-dd524514]{
    background: #fff;
    padding-bottom: 50px;
  }
  .shopLogin{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(255,255,255,1);
    z-index: 10;
  }
  .shopLogin>.box{
    width: 440px;
    height: 300px;
    background: #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 30%;
    box-sizing: border-box;
    padding: 20px 50px;
    border-radius: 5px;
    color: #C39B63;
    box-shadow: -1px 3px 6px 6px rgba(0,0,0,.1)
  }
  .shopLogin>.box>h2{
    line-height: 60px;
    text-align: center;
    margin-bottom: 20px;
    border-bottom: 1px dashed #C39B63;
    /*color: #C39B63;*/
  }
  .pageNum{
    padding-right: 40px;
    box-sizing: border-box;
    text-align: right;
    margin-bottom: 30px;
  }
  .pageNum[data-v-00ed3104]{
    background: #fff;
    padding: 20px 10px 30px 0;
  }
  .el-button--primary{
    width: 100%;
    border: none;
    outline: none;
    background: #C39B63;
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

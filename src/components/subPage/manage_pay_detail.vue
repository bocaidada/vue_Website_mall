<template>
    <section class="content">
      <transition name="upload-fade">
        <div class="uploadData" v-if="leaveWordFlag">
          <div class="uploadBox">
            <img :src="$store.state.qiNiuServer+'/joinUs/close.png'" @click="addLeaveWord()" alt="">
            <h2>添加备注</h2>
            <textarea placeholder="请填写备注信息..." name="" v-model="remark" maxlength="255" id="" cols="30" rows="10"></textarea>
            <button @click="subLeaveWord()">提交</button>
          </div>
        </div>
      </transition>
      <div class="main">
        <div class="pay_main">
          <span>收货地址</span>
        </div>
        <div class="ship_site">
          <span style="color: #cfa972;line-height: 40px">{{address}}</span>
          <span v-if="address.length == 0">暂无收货地址</span>
        </div>
        <div class="pay_main">
          <span>订单详情</span>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          show-summary
          :summary-method="getSummaries"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-class-name="tableheaderClassName"
          @selection-change="handleSelectionChange">
          <el-table-column
            align="center"
            prop="name"
            label="产品名称">
          </el-table-column>
          <el-table-column
            align="center"
            prop="model"
            label="产品型号">
          </el-table-column>
          <el-table-column
            align="center"
            prop="attr"
            label="属性"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="num"
            align="center"
            label="数量"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="price"
            align="center"
            label="单价(元)"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="freight"
            align="center"
            label="运费(元)"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            label="留言">
            <template  slot-scope="scope">
              <el-button class="operate" type="text" @click="addLeaveWord()" size="small">添加备注</el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="totalPrice"
            label="总价(元)"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="earnestPrice"
            label="首付款(元)"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="main_bot">
          <h2>支付方式</h2>
          <div class="payBox">
            <div class="zhiFu" :class="{selectHit:selectFlag}" @click="change()"></div>
          </div>
          <div class="go_pay" @click="go_submit()">前往支付</div>
        </div>
      </div>
    </section>
</template>

<script>
    export default {
      name: "manage_pay_detail",
      data () {
        return {
          remark:'',
          messageArr:[],
          leaveWordFlag: false,
          selectsFlag: true,
          msg: '',
          checked: true,
          selectFlag: false,
          radio: 0,
          protocolFlag: false,
          address:[],
          fromSources: this.$store.state.fromSource,
          tableData: [],
          multipleSelection: [],
          payData:{
            addressId: '',
            fromSource: this.$store.state.fromSource,
            payType:'',
            remark:''
          }
        };
      },
      created() {
        let source = sessionStorage.getItem('fromSource')
        if(source) {
          this.fromSources = source
          this.payData.fromSource = source
        }else{
          this.fromSources = this.$store.state.fromSource
          this.payData.fromSource = this.$store.state.fromSource
        }
      },
      mounted() {
        this.addList()
        this.messageArr[0] = ''
      },
      watch:{
        selected(val,old) {
          // console.log()
          console.log(old,val)
          if(val.length == 3) {
            this.areaFlag = false;
            this.ruleForm.province = this.selected[0]
            this.ruleForm.city = this.selected[1]
            this.ruleForm.country = this.selected[2]
          }
        }
      },
      methods: {
        // 获取多选参数,计算价格
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        //设置表头颜色
        tableheaderClassName({ row, rowIndex }) {
          return "table-head-th";
        },
        change() {
          this.selectFlag = !this.selectFlag
          if(this.selectFlag) {
            this.payData.payType = 1
          }else{
            this.payData.payType = ''
          }
        },
        changes() {
          this.defaultFlag = !this.defaultFlag
          if(this.defaultFlag) {
            this.ruleForm.select = 1
          }else{
            this.ruleForm.select = 0
          }
        },
        addList() {
          this.payData.addressId = 0
          this.$http.get('shopInfo','').then((res)=>{
            // console.log(res.data)
            if(res.data.code == 200) {
              this.address = res.data.data.address
            }
          })
          this.payLists(0)
        },
        payLists(params) {
          this.$http.get('payList',{fromSource:this.fromSources,addressId:params}).then((res)=>{
           if(res.data.code == 200) {
             this.tableData = res.data.data.list
           }
          })
        },
        radioChange(val){
          this.payData.addressId = val.id
          this.payLists(val.id)
        },
        addLeaveWord () {
          this.leaveWordFlag = !this.leaveWordFlag
        },
        subLeaveWord() {
          if(this.remark == '') {
            this.$message.error('请填写相关留言')
          }else{
            this.messageArr[0] = this.remark
            this.$message({
              message: '备注添加成功',
              type: 'success'
            })
            this.leaveWordFlag = false
          }
        },
        // 下单
        go_submit() {
          // console.log(this.payData)
          if(!this.selectFlag){
            return this.$message.error('请选择支付方式')
          }
          this.payData.remark = JSON.stringify(this.messageArr)
          // console.log(this.payData)
          // return
          this.$http.post('payCart',this.payData).then((res)=>{
            if(res.data.code == 200) {
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
        },
        getSummaries(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
            if(index === 0) {
              sums[index] = '合计'
            }
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[8] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[8] = '￥'+sums[8];
            }
          });
          return sums;
        }
      }
    }
</script>
<style>
  .ship_site>.el-radio, .ship_site>.is-checked{
    line-height: 30px;
    display: block;
  }
  .el-radio+.el-radio{
    margin-left: 0 !important;
  }
  .table-head-th{
    background-color: #C39B63 !important;
    color: #fff;
  }
  .el-table{
    margin: 20px 0 40px;
  }
  .el-table__row{
    height: 90px;
    line-height: 90px;
    background: none;
  }
</style>
<style scoped>
  .content{
    padding: 20px 0;
    position: relative;
  }
  .main{
    background: #fff;
    box-sizing: border-box;
    padding: 30px;
    color: #333;
  }
  .pay_main{
    height: 45px;
    line-height: 45px;
    border-bottom: 1px dashed #ccc;
    font-size: 16px;
  }
  .pay_main>span:last-child{
    float: right;
    color: #C39B63;
    cursor: pointer;
  }
  .pay_main>span:first-child{
    float: left;
    color: #C39B63;
  }
  .ship_site{
    text-align: left;
    padding: 15px 0;
  }
  .main_bot{
    width: 100%;
    border: 1px solid #dfdfdf;
    margin-bottom: 40px;
    padding: 40px 30px;
    box-sizing: border-box;
    text-align: left;
  }
  h2{
    text-align: left;
    line-height: 30px;
    margin-bottom: 30px;
  }
  .payBox{
    height: 80px;
    width: 100%;
  }
  .payBox>.zhiFu{
    width: 250px;
    height: 100%;
    /*background: url("http://pifi5lc1c.bkt.clouddn.com/web/zhifubao.png") no-repeat center/cover;*/
    background: url("http://cdn.jinkaidoor.com/web/zhifubao.png") no-repeat center/cover;
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;
    float: left;
    margin-right: 30px;
    position: relative;
  }
  .payBox>.selectHit::after {
    display: block;
    content: '';
    width: 0px;
    height: 0px;
    border-color: transparent red red transparent ;
    border-width: 10px;
    border-style: solid;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .go_pay{
    width: 140px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    border-radius: 5px;
    background: red;
    color: #fff;
    left: 1px;
    margin: 20px 0;
    cursor: pointer;
  }
  .go_pay:hover{
    background: #ff5117;
  }

  .uploadData{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.2);
    z-index: 100;
  }
  .uploadBox{
    width: 900px;
    /*height: 500px;*/
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 25%;
    background: #fff;
    color: #CEA972;
    box-shadow: 3px 3px 46px 3px rgba(131,121,115,0.15);
    box-sizing: border-box;
    padding: 20px 50px;
    text-align: center;
  }
  .uploadBox>img{
    position: absolute;
    right: 50px;
    top: 26px;
    cursor: pointer;
  }
  .uploadBox>h2{
    line-height: 50px;
    margin-bottom: 20px;
    text-align: center;
  }
  .uploadBox>button{
    border: none;
    outline: none;
    width: 240px;
    height: 45px;
    background: #cfa972;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    letter-spacing: 5px;
    margin: 0 auto;
  }
  .uploadBox>button:hover{
    background: #cf8958;
  }
  textarea{
    width: 100%;
    height: 320px;
    resize: none;
    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid #DABA8C;
    outline: none;
  }
  .upload-fade-enter-active,.upload-fade-leave-active{
    transition: all 1.5s;
    opacity: 1;
  }
  .upload-fade-enter, .upload-fade-leave-to{
    transform: rotate3d(0,1,0,180deg);
    opacity: 0;
  }
</style>

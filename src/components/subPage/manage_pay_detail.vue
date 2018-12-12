<template>
    <section class="content">
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
            payType:''
          }
        };
      },
      created() {
        this.addList()
      },
      mounted() {

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
        // 下单
        go_submit() {
          // console.log(this.payData)
          if(!this.selectFlag){
            return this.$message.error('请选择支付方式')
          }
          if(this.payData.addressId === ''){
            return this.$message.error('请添加收货地址')
          }
          this.$http.post('payCart',this.payData).then((res)=>{
            if(res.data.code == 200) {
              const div = document.createElement('div');
              div.innerHTML = Base64.decode(res.data.data.html);
              document.body.appendChild(div);
              document.forms.alipaysubmit.submit();
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
              sums[7] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
              sums[7] = '￥'+sums[7];
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
    background: url("http://pifi5lc1c.bkt.clouddn.com/web/zhifubao.png") no-repeat center/cover;
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
</style>

<template>
    <section class="content">
      <transition name="upload-fade">
        <div class="addBox" v-if="addAddressFlag">
          <div>
            <img :src="$store.state.qiNiuServer+'/joinUs/close.png'" @click="add_address()" alt="">
            <h1>新增收货地址</h1>
            <div class="areas">
              <span class="tit">配送地区：</span>
              <area-select type='code' :level='2' v-model="selected" :data="pcaa"></area-select>
            </div>
            <el-form style="width: 100%;margin: 20px 5px" :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="100px">
              <el-form-item
                label="具体地址："
                prop="detail">
                <el-input type="text" v-model="ruleForm.detail" maxlength="255" autocomplete="off" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息"></el-input>
              </el-form-item>
              <el-form-item
                label="货主姓名："
                prop="name">
                <el-input type="text" maxlength="16" v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item
                label="手机号码："
                prop="mobile">
                <el-input v-model.number="ruleForm.mobile" maxlength="11" placeholder="请输入手机号码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox  @change="changes()">设置为默认收货地址</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </transition>
      <transition name="upload-fade">
        <div class="uploadData" v-if="leaveWordFlag">
          <div class="uploadBox">
            <img :src="$store.state.qiNiuServer+'/joinUs/close.png'" @click="closeLeaveWord()" alt="">
            <h2>添加备注</h2>
            <textarea placeholder="请填写备注信息..." name="" v-model="messageArr[messageNum]" maxlength="255" id="" cols="30" rows="10"></textarea>
            <button @click="subLeaveWord()">提交</button>
          </div>
        </div>
      </transition>
      <div class="main">
        <div class="pay_main">
          <span>选择收货地址</span>
          <span @click="add_address()">添加收货地址</span>
        </div>
        <div class="ship_site">
          <el-radio @change="radioChange(item)" v-for="(item,index) in address" :key="index" v-model="radio" :label="index">{{item.provinceStr}}{{item.cityStr}}{{item.countryStr}} {{item.detail}} {{item.name}} {{item.mobile}}</el-radio>
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
              <el-button class="operate" type="text" @click="addLeaveWord(scope.$index)" size="small">添加备注</el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="totalPrice"
            label="总价(元)"
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
    import { pca, pcaa } from 'area-data'; // v5 or higher
    export default {
      name: "pay_detail",
      data () {
        let checkPhone = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('手机号不能为空'));
          } else {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            if (reg.test(value)) {
              callback();
            } else {
              return callback(new Error('请输入正确的手机号'));
            }
          }
        }
        let checkName = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('用户名不能为空'));
          } else {
            const reg = /^[A-Za-z\u4e00-\u9fa5]+$/
            if (reg.test(value)) {
              callback();
            } else {
              return callback(new Error('用户名只可以输入字母和中文'));
            }
          }
        }
        return {
          messageNum: 0,
          messageArr:[],
          leaveWordFlag: false,
          addAddressFlag: false,
          defaultFlag: false,
          selected: [],
          pca: pca,
          pcaa: pcaa,
          ruleForm: {
            name: '',
            mobile: '',
            province:'',
            city:'',
            country:'',
            detail:'',
            select: 0
          },
          rules: {
            mobile: [
              {validator: checkPhone, trigger: 'blur'}
            ],
            name: [
              {validator: checkName, trigger: 'blur'}
            ],
            detail: [
              {required: true, message: '具体地址不能为空', trigger: 'blur'}
            ]
          },
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
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if(this.selected.length != 3) {
              this.$message.error('请选择配配送区域')
            }
            if (valid) {
              // console.log(this.ruleForm)
              // console.log('add')
              this.$http.post('addressAdd',this.ruleForm).then((res)=>{
                // console.log(res.data)
                if(res.data.code == 200) {
                  //数据清空
                  this.$message.success('地址保存成功')
                  this.addList()
                  this.selected = []
                  this.addAddressFlag = false
                  this.$refs[formName].resetFields();
                }else{
                  this.$message({
                    type: 'error',
                    message: res.data.msg
                  })
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        add_address() {
          this.addAddressFlag = !this.addAddressFlag
        },
        addLeaveWord (index) {
          this.messageNum = index
          this.leaveWordFlag = true
        },
        closeLeaveWord() {
          this.leaveWordFlag = false
        },
        subLeaveWord() {
          if(this.messageArr[this.messageNum] == '') {
            this.$message.error('请填写相关留言')
          }else{
            this.$message({
              message: '备注添加成功',
              type: 'success'
            })
            this.leaveWordFlag = false
          }
        },
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
          this.$http.get('addressList','').then((res)=>{
            // console.log(res.data)
            if(res.data.code == 200) {
              this.address = res.data.data
              if(this.address.length){
                this.payData.addressId = this.address[0].id
                this.payLists(this.address[0].id)
              }else{
                this.payLists('')
              }
            }
          })
        },
        payLists(params) {
          this.$http.get('payList',{fromSource:this.fromSources,addressId:params}).then((res)=>{
            // console.log(res.data)
            if(res.data.code == 200) {
              this.messageArr = []
              this.tableData = res.data.data.list
              for(let i=0;i<this.tableData.length;i++){
                this.messageArr.push('')
              }
            }
          })
        },
        radioChange(val){
          this.payData.addressId = val.id
          this.payLists(val.id)
        },
        // 下单
        go_submit() {
          if(!this.selectFlag){
            return this.$message.error('请选择支付方式')
          }
          if(this.payData.addressId === ''){
            return this.$message.error('请添加收货地址')
          }
          this.payData.remark = JSON.stringify(this.messageArr)
          // console.log(this.payData)
          // return
          this.$http.post('payCart',this.payData).then((res)=>{
            // console.log(res.data)
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
    /*height: 350px;*/
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
  .addBox{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.3);
    z-index: 10;
  }
  .addBox>div{
    width: 686px;
    height: 540px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 10%;
    background: #fff;
    box-sizing: border-box;
    padding: 15px 45px 20px 20px;
    text-align: left;
    border-radius: 5px;
  }
  .addBox>div>img{
    position: absolute;
    width: auto;
    right: 35px;
    top: 30px;
    cursor: pointer;
  }
  .addBox>div>h1{
    line-height: 60px;
    font-size: 28px;
    color: #434343;
    text-align: center;
    margin-bottom: 50px;
  }
  .areas{
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    margin-top: 15px;
    padding-left: 16px;
  }
  .areas>.tit{
    float: left;
    line-height: 35px;
    font-size: 13px;
    margin-right: 5px;
  }
  .areas>.tit::before{
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
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

  .el-icon-info{
    color: #C39B63;
    margin-right: 20px;
    font-size: 20px;
    vertical-align: middle;
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

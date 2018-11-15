<template>
  <section class="content">
    <div class="main">
      <p class="main_title">收货地址</p>
      <h5>新增收货地址</h5>
      <div class="areas">
        <span class="tit">配送地区：</span>
        <area-select type='text' :level='2' v-model="selected" :data="pcaa"></area-select>
        <span class="hit" v-if="areaFlag" style="color: #ff0000;padding-left: 20px;">* 请选择配送区域 *</span>
      </div>
      <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="100px">
        <el-form-item
          label="具体地址："
          prop="address">
          <el-input type="text" v-model="ruleForm.address" autocomplete="off" placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元等信息"></el-input>
        </el-form-item>
        <el-form-item
          label="货主姓名："
          prop="name">
          <el-input type="text" v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号码："
          prop="phone">
          <el-input v-model.number="ruleForm.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="ruleForm.checked">设置为默认收货地址</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <!--<el-button @click="resetForm('ruleForm2')">重置</el-button>-->
        </el-form-item>
      </el-form>
      <p class="main_title"><i class="el-icon-info"></i><span>已保存了16条地址，还能保存4条</span></p>

      <el-table
        ref="multipleTable"
        border
        :data="userAddressData.addressData"
        tooltip-effect="dark"
        style="width: 95%;margin: 0 auto 100px"
        :header-cell-class-name="tableheaderClassName">
        <el-table-column
          align="center"
          prop="name"
          label="收货人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="area"
          label="所在地区">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="详细地址">
        </el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="电话/手机"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template  slot-scope="scope">
            <el-button class="operate" type="text" @click="handleUpdate(scope.row)" size="small">编辑</el-button>
            <el-button class="operate" @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="设为默认">
          <template  slot-scope="scope">
            <!--<el-radio v-if="scope.row.checked" @click="setDefaultAddress(scope.row)" style="color: #79C1FF" class="radio" v-model="radio" :label="scope.$index">默认地址</el-radio>-->
            <!--<el-radio v-else class="radio" @click="setDefaultAddress(scope.row)" v-model="radio" :label="scope.$index">设为默认</el-radio>-->
            <el-button v-if="scope.row.checked" type="text" @click="setDefaultAddress(scope.row)" size="small" style="color: #07B08F">默认地址</el-button>
            <el-button v-else type="text" @click="setDefaultAddress(scope.row)" size="small">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
    import { pca, pcaa } from 'area-data'; // v5 or higher
    export default {
        name: "receiver_address",
        data() {
          var checkPhone = (rule, value, callback) => {
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
              radio:'',
              areaFlag:false,
              selected: [],
              pca: pca,
              pcaa: pcaa,
              ruleForm: {
                name: '',
                address: '',
                phone: '',
                area:'',
                checked:false
              },
              userAddressData:{
                totalNum: '12',
                residueNum:'8',
                addressData:[
                  {
                    name: '林志成',
                    address: '浙江省杭州市西湖区三坝雅苑2单元',
                    phone: '15906676509',
                    area:'浙江省/杭州市/西湖区',
                    checked:true
                  },{
                    name: '林志成',
                    address: '浙江省杭州市西湖区三坝雅苑2单元',
                    phone: '15906676509',
                    area:'浙江省/杭州市/西湖区',
                    checked:false
                  }
                ]
              },
              rules: {
                phone: [
                  {validator: checkPhone, trigger: 'blur'}
                ],
                name: [
                  {required: true, message: '姓名不能为空', trigger: 'blur'}
                ],
                address: [
                  {required: true, message: '具体地址不能为空', trigger: 'blur'}
                ]
              }
            }
        },
        watch: {
          selected(val,old) {
            console.log(old,val)
            if(val.length == 3) {
              this.areaFlag = false;
              this.ruleForm.area = this.selected[0] + '/' + this.selected[1] + '/' + this.selected[2]
            }
          }
        },
        methods: {
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if(this.selected.length != 3) {
                this.areaFlag = true;
              }
              if (valid) {
                // if(this.ruleForm.area == '') {
                //   this.areaFlag = true;
                //   return
                // }
                alert('submit!');
                console.log(this.ruleForm)
                //数据清空
                // this.selected = []
                // this.$refs[formName].resetFields();
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          //删除某一条数据
          handleDelete(row) {
            console.log(row);
            this.$confirm('此操作将删除该地址信息, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          //编辑某一条数据
          handleUpdate(row) {
            console.log(row);
            this.ruleForm = row;
            this.selected = ["河北省", "秦皇岛市", "北戴河区"]
          },
          //设置默认地址
          setDefaultAddress(row) {
            console.log(row);
            row.checked = !row.checked
          },
          //设置表头颜色
          tableheaderClassName({ row, rowIndex }) {
            return "table-head-th";
          },
          //数量与价钱的监听
          openDetails(row) {
            console.log(row)
          },
        }
    }
</script>
<style>
  .table-head-th{
    background-color: #07B08F !important;
    color: #fff;
  }
  .area-select-wrap{
    text-align: left;
    float: left;
  }
  form{
    /*width: 614px;*/
    width: 70%;
    margin: 20px 5px;
  }
  .area-select{
    height: 37px;
  }
  .area-select .area-select-icon{
    border-top-color: #07B08F;
  }
  .el-form-item__content{
    text-align: left;
  }
  .el-checkbox,.area-select,.el-input__inner::placeholder,.operate,.deAddress{
    color: #07B08F;
  }

  .el-button--primary{
    width: 90px;
    text-align: center;
    letter-spacing: 1px;
    border-color: #07B08F;
  }
  .el-checkbox__inner,.area-select,.el-input__inner{
    border: 1px solid #07B08F;
  }
  .el-button--primary,.el-button--primary:hover{
    background-color: #06b08f;
  }
  .el-table__row{
   height: 80px;
  }
  .radio .el-radio__inner{
    display: none;
  }
</style>
<style scoped>
  .content{
    padding: 20px 0;
  }
  .main{
    background: #fff;
    box-sizing: border-box;
    padding: 30px 10px;
    color: #333;
  }
  .main_title{
    width: 100%;
    height: 30px;
    line-height: 32px;
    background: #dfdfdf;
    text-align: left;
    padding-left: 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  h5{
    text-align: left;
    padding-left: 20px;
    color: #ffbe87;
    font-size: 16px;
    letter-spacing: 1px;
    line-height: 50px;
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
  .areas>.hit{
    float: left;
    line-height: 35px;
  }
  .el-icon-info{
    color: #07B08F;
    margin-right: 20px;
    font-size: 20px;
    vertical-align: middle;
  }
</style>

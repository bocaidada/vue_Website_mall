<template>
  <section class="content">
    <div class="main">
      <p class="main_title">收货地址</p>
      <h5>新增收货地址</h5>
      <div class="areas">
        <span class="tit">配送地区：</span>
        <area-select type='code' :level='2' v-model="selected" :data="pcaa"></area-select>
        <span class="hit" v-if="areaFlag" style="color: #ff0000;padding-left: 20px;">* 请选择配送区域 *</span>
      </div>
      <el-form style="width: 70%;margin: 20px 5px" :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="100px">
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
          <el-input v-model.number="ruleForm.mobile"  maxlength="11" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox  @change="change()">设置为默认收货地址</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
      <p class="main_title"><i class="el-icon-info"></i><span>已保存了 <span style="color: red">{{addLists.length}}</span> 条地址，还能保存 <span style="color: red">{{20-addLists.length}}</span> 条</span></p>

      <el-table
        ref="multipleTable"
        border
        :data="addLists"
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
          label="所在地区">
          <template  slot-scope="scope">
            <span>{{scope.row.provinceStr}} {{scope.row.cityStr}} {{scope.row.countryStr}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="detail"
          label="详细地址">
        </el-table-column>
        <el-table-column
          align="center"
          prop="mobile"
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
            <el-button v-if="scope.row.isSelect == 1" type="text" @click="setDefaultAddress(scope.row)" size="small" style="color: #C39B63">默认地址</el-button>
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
              submitType:true,
              residueNum:'',
              defaultFlag:true,
              radio:'',
              areaFlag:false,
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
              addLists:[],
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
              }
            }
        },
        created() {
          this.address_list()
        },
        watch: {
          selected(val,old) {
            // console.log(old,val)
            if(val.length == 3) {
              this.areaFlag = false;
              this.ruleForm.province = this.selected[0]
              this.ruleForm.city = this.selected[1]
              this.ruleForm.country = this.selected[2]
            }
          }
        },
        methods: {
          address_list() {
            this.$http.get('addressList','').then((res)=>{
              console.log(res.data)
              this.addLists = res.data.data
            })
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if(this.selected.length != 3) {
                this.areaFlag = true;
              }
              console.log(valid)
              if (valid) {
                // console.log(this.ruleForm)
                if(this.submitType) {
                  console.log('add')
                  this.$http.post('addressAdd',this.ruleForm).then((res)=>{
                    // console.log(res.data)
                    if(res.data.code == 200) {
                      //数据清空
                      this.$message.success('地址保存成功')
                      this.address_list()
                      this.selected = []
                      this.$refs[formName].resetFields();
                    }else{
                      this.$message({
                        type: 'error',
                        message: res.data.msg
                      })
                    }
                  })
                }else{
                  this.$http.post('addressUpdate',this.ruleForm).then((res)=>{
                    // console.log(res.data)
                    if(res.data.code == 200) {
                      //数据清空
                      this.$message.success('地址修改成功')
                      this.address_list()
                      this.submitType = true
                      this.selected = []
                      this.$refs[formName].resetFields();
                    }
                  })
                }
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
              this.$http.post('addressDelete',{id:row.id}).then((res)=>{
                // console.log(res.data)
                if(res.data.code == 200) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  this.address_list()
                }
              })
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
            this.submitType = false;
            this.ruleForm = row;
            this.selected = [row.provinceStr, row.cityStr, row.countryStr]
          },
          //设置默认地址
          setDefaultAddress(row) {
            // console.log(row);
            this.$http.post('addressSelect',{id:row.id}).then((res)=>{
              console.log(res.data)
              if(res.data.code == 200) {
                this.$message.success('默认地址设置成功')
                this.address_list()
              }
            })
          },
          //设置表头颜色
          tableheaderClassName({ row, rowIndex }) {
            return "table-head-th";
          },
          //数量与价钱的监听
          openDetails(row) {
            console.log(row)
          },
          change() {
            if(this.defaultFlag) {
              this.ruleForm.select = 1
            }else{
              this.ruleForm.select = 0
            }
            this.defaultFlag = !this.defaultFlag
          }
        }
    }
</script>
<style>
  .table-head-th{
    background-color: #C39B63 !important;
    color: #fff;
  }
  .area-select-wrap{
    text-align: left;
    float: left;
  }
  .area-select{
    height: 37px;
  }
  .area-select .area-select-icon{
    border-top-color: #C39B63;
  }
  .el-form-item__content{
    text-align: left;
  }
  .el-checkbox,.area-select,.el-input__inner::placeholder,.operate,.deAddress{
    color: #C39B63;
  }

  .el-button--primary{
    width: 90px;
    text-align: center;
    letter-spacing: 1px;
    border-color: #C39B63;
  }
  .el-checkbox__inner,.area-select,.el-input__inner{
    border: 1px solid #C39B63;
  }
  .el-button--primary,.el-button--primary:hover{
    background-color: #C39B63;
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
    color: #C39B63;
    margin-right: 20px;
    font-size: 20px;
    vertical-align: middle;
  }
</style>

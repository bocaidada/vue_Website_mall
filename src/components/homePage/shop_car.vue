<template>
  <div style="width: 100%;background: #efefef">
    <div class="main">
      <div class="title">我的购物车</div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @row-click="openDetails"
        :header-cell-class-name="tableheaderClassName"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
          align="center"
          prop="price"
          label="单价(元)"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="number"
          align="center"
          label="数量"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <i @click="numberSelectDown(scope.$index, scope.row)" class="el-icon-remove-outline

"></i>
            <span> {{scope.row.num}} </span>
            <i @click="numberSelectAdd(scope.$index, scope.row)" class="el-icon-circle-plus-outline
"></i>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template  slot-scope="scope">
            <i @click="handleDelete(scope.$index, scope.row)" class="el-icon-delete"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="account">
        <div class="account_left">
          <div @click="toggleSelection()">
            <img :src="[selectFlag?$store.state.qiNiuServer+'/un_select.png':$store.state.qiNiuServer+'/select.png']" alt="">
            <span>全选</span>
          </div>
          <div class="totalPrice">
            <span>合计:</span>
            <span class="total">￥{{totalNum}}</span>
          </div>
        </div>
        <div class="account_right" @click="order()">去结算</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "shop_car",
        data() {
          return {
            selectFlag:true,
            orderId:'',
            totalNum:0,
            num1: 1,
            tableData: [],
            multipleSelection: []
          }
        },
        created() {
          this.carListData()
          this.$store.commit('orderType',2)
        },
        watch: {
          totalNum(val, old) {
            // console.log(val, old)
          },
          multipleSelection: function () {

          }
        },
        methods: {
          carListData() {
            this.$http.get('carList','').then((res)=>{
              // console.log(res.data)
              if(res.data.code != 200){
                if(res.data.error_code == 1001){
                  this.$store.commit('outUserToken')
                  this.$store.commit('loginState',true)
                }
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }else{
                this.tableData = res.data.data.list
              }
            })
          },
          //全选与取消全选
          toggleSelection() {
            if(this.tableData.length){
              this.selectFlag = !this.selectFlag
            }
            this.$refs.multipleTable.toggleAllSelection();
          },
          // 获取多选参数,计算价格
          handleSelectionChange(val) {
            // console.log(val)
            if(val.length == 0){
              this.selectFlag = true
            }
            if(val.length == this.tableData.length){
              this.selectFlag = false
            }

            this.orderId = ''
            this.multipleSelection = val;
            let num = 0;
            for(let i=0;i<val.length;i++) {
              this.orderId += ','+ val[i].id
              num += parseInt(val[i].price) * val[i].num
            }
            this.orderId = this.orderId.substring(1)
            this.totalNum = num
          },
          //删除某一条数据
          handleDelete(index, row) {
            console.log(index, row);
            this.$confirm('此操作将删除该条数据信息, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$http.post('carDelete',{cartItemId:row.id}).then((res)=>{
                if(res.data.code == 200){
                  this.carListData()
                }else{
                  this.$message({
                    message: res.data.msg,
                    type: 'error'
                  })
                }
              })
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
          // 添加数量
          numberSelectAdd(index, row) {
            // console.log(index, row);
            row.num = parseInt(row.num) + 1;
            this.$http.post('carEdit',{cartItemId:row.id,number:row.num}).then((res)=>{
              // console.log(res)
            })
          },
          //减少数量
          numberSelectDown(index, row) {
            // console.log(index, row)
            if(row.num >= '2'){
              row.num = parseInt(row.num) - 1
              this.$http.post('carEdit',{cartItemId:row.id,number:row.num}).then((res)=>{
                // console.log(res)
              })
            }
          },
          //设置表头颜色
          tableheaderClassName({ row, rowIndex }) {
            return "table-head-th";
          },
          //数量与价钱的监听
          openDetails(row) {
            this.$refs.multipleTable.toggleRowSelection(row);
            this.$refs.multipleTable.toggleRowSelection(row);
          },
          // 购物车下单
          order() {
            if(this.totalNum > 0) {
              this.$http.post('carOrder',{cartItemIds:this.orderId}).then((res)=>{
                // console.log(res.data)
                if(res.data.code == 200){
                  this.$store.commit('fromSource',1)
                  sessionStorage.setItem("fromSource",JSON.stringify(this.$store.state.fromSource))
                  this.$router.push('/pay_detail')
                }else{
                  this.$message({
                    message: res.data.msg,
                    type: 'error'
                  })
                }
              })
            }else{
              this.$message({
                message: '请选择商品',
                type: 'warning'
              })
            }
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
  .main{
    padding:0 20px 40px;
    box-sizing: border-box;
  }
  .title{
    text-align: left;
    line-height: 70px;
    font-size: 18px;
    letter-spacing: 1px;
  }
  i{
    cursor: pointer;
    font-size: 20px;
  }
  .account{
    margin: 150px 0;
    width: 100%;
    height: 80px;
    line-height: 80px;
  }
  .account_left{
    width: 85%;
    float: left;
    height: 100%;
    background: #d7d7d7;
    text-align: left;
    color: #fff;
    box-sizing: border-box;
    padding-left: 10px;
  }
  .account_right{
    width: 15%;
    float: right;
    height: 100%;
    text-align: center;
    background: #ff0000;
    font-size: 20px;
    letter-spacing: 2px;
    cursor: pointer;
    color: #fff;
  }
  .account_right:hover{
    background: #ff1a3a;
  }
  .account_left>.box{
    float: left;
    display: block;
    width: 13px;
    height: 13px;
    border: 2px solid #efefef;
    border-radius: 2px;
    margin: 30px 10px 0;
    cursor: pointer;
    text-align: center;
  }
  .account_left>div{
    display: inline-block;
    cursor: pointer;
  }
  .account_left>div>img{
    background: #fff;
    vertical-align: middle;
    margin-right: 5px;
  }
  .account_left>.totalPrice{
    width: 200px;
    height: 100%;
    float: right;
    text-align: center;
  }
  .account_left>.totalPrice>.total{
    font-size: 24px;
    color: #ff0000;
  }
</style>

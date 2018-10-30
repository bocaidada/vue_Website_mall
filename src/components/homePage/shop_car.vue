<template>
  <div style="width: 100%;background: #efefef">
    <main class="main">
      <div class="title">我的购物车</div>
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
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
          prop="size"
          label="尺寸"
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
            <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
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
          <span class="box" @click="toggleSelection()"></span>
          <span>全选</span>
          <div class="totalPrice">
            <span>合计:</span>
            <span class="total">￥{{totalNum}}</span>
          </div>
        </div>
        <div class="account_right">
          去结算
        </div>
      </div>
    </main>
  </div>
</template>

<script>
    export default {
        name: "shop_car",
        data() {
          return {
            totalNum:'0',
            num1: 1,
            tableData3: [{
              name: '烤漆木门',
              model:'MKT-003',
              size:'2.0m*1.5m*0.25m',
              price:'￥1600',
              number:'1'
            },{
              name: '烤漆木门',
              model:'MKT-003',
              size:'2.0m*1.5m*0.25m',
              price:'￥1600',
              number:'1'
            },{
              name: '烤漆木门',
              model:'MKT-003',
              size:'2.0m*1.5m*0.25m',
              price:'￥1600',
              number:'1'
            }],
            multipleSelection: []
          }
        },

        methods: {
          toggleSelection() {
            this.$refs.multipleTable.toggleAllSelection();
          },
          handleSelectionChange(val) {
            let num = 0
            for(let i=0;i<val.length;i++) {
              num += parseInt(val[i].price.substring(1))
            }
            this.totalNum = num
          },
          handleDelete(index, row) {
            alert(index, row);
          },
          handleChange(value) {
            console.log(value);
          }
        }
    }
</script>

<style scoped>
  .el-table th, .el-table tr {
    background-color: #07B08F !important;
  }
  .main{
    padding:0 40px 40px;
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
  }
  .account_right{
    width: 15%;
    float: right;
    height: 100%;
    text-align: center;
    background: #ff0000;
    color: #fff;
    font-size: 20px;
    letter-spacing: 2px;
    cursor: pointer;
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

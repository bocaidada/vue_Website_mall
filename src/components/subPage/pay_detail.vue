<template>
    <section class="content">
      <main class="main">
        <div class="pay_main">
          <span>确认收货地址</span>
          <span>
            <router-link to="/receiver_address">添加收货地址</router-link>
          </span>
        </div>
        <div class="ship_site">
          <el-radio v-for="(item,index) in address" :key="index" v-model="radio" :label="index">{{item.site}}</el-radio>
        </div>
        <div class="pay_main">
          <span>订单详情</span>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width: 100%"
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
            prop="size"
            label="产品规格"
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
          </el-table-column>
          <el-table-column
            align="center"
            prop="total"
            label="总价(元)"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="main_bot">
          <h2>支付方式</h2>
        </div>
      </main>
    </section>
</template>

<script>
    export default {
      name: "pay_detail",
      data () {
        return {
          radio: '',
          address:[
            {site:'浙江省 杭州市 西湖区 西湖街道办事处  林志成 收 15906676509',num:'1'},
            {site:'山西省 太原市 迎泽区 西湖街道办事处  和徐闻 收 15906676509',num:'2'},
            {site:'陕西省 西安市 未央区 西湖街道办事处  林志成 收 15906676509',num:'3'}
          ],
          tableData3: [{
            id:'001',
            name: '烤漆木门',
            model:'MKT-003',
            size:'2.0m*1.5m*0.25m',
            price:'1600',
            number:'1',
            total:'1600'
          },{
            id:'001',
            name: '烤漆木门',
            model:'MKT-003',
            size:'2.0m*1.5m*0.25m',
            price:'1600',
            number:'2',
            total:'3200'
          }],
          multipleSelection: []
        };
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
      }
    }
</script>
<style>
  .ship_site>.el-radio, .ship_site>.is-checked{
    line-height: 30px;
    display: block;
  }
  .el-radio+.el-radio{
    margin-left: 0;
  }
  .table-head-th{
    background-color: #07B08F !important;
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
  }
  .pay_main>span:first-child{
    float: left;
  }
  .pay_main>span:last-child>a{
    color: #5393FF;
  }
  .ship_site{
    text-align: left;
    padding: 15px 0;
  }
  .main_bot{
    width: 100%;
    height: 350px;
    border: 1px solid #dfdfdf;
    margin-bottom: 40px;
    padding: 20px 30px;
    box-sizing: border-box;
  }
  h2{
    text-align: left;
    line-height: 50px;
    margin-bottom: 30px;
  }
</style>

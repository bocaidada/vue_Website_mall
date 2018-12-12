<template>
  <div>
    <router-view/>
    <div class="content" v-if="orderFlag">
      <div class="main">
        <div class="box_top">
          <span :class="{hit:spanNum == index}" @click="change(index)" v-for="(item,index) in topList" :key="index">{{item}}</span>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-class-name="tableheaderClassName"
          @selection-change="handleSelectionChange">
          <el-table-column
            align="center"
            prop="no"
            label="订单号">
          </el-table-column>
          <el-table-column
            align="center"
            prop="itemName"
            label="产品名称">
          </el-table-column>
          <el-table-column
            align="center"
            prop="itemModel"
            label="产品型号">
          </el-table-column>
          <el-table-column
            align="center"
            prop="attrName"
            label="属性"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="salesPrice"
            align="center"
            label="单价(元)"
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
            prop="payAmount"
            label="总价(元)"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            label="售后"
            v-if="type == 0 || type == 3"
            show-overflow-tooltip>
            <template  slot-scope="scope">
              <span v-if="scope.row.serviceStatus == -1">--</span>
              <el-button
                v-if="scope.row.serviceStatus == 0"
                type="text"
                size="mini"
                @click="saleSee(scope.row,1)">申请售后</el-button>
              <el-button
                v-if="scope.row.serviceStatus == 1"
                type="text"
                size="mini"
                @click="saleSee(scope.row,2)">售后处理中</el-button>
              <span v-if="scope.row.serviceStatus == 2">已结单</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            show-overflow-tooltip>
            <template  slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="saleSee(scope.row,3)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="totalNum > 20" class="pageNum">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="20"
            layout="prev, pager, next, jumper"
            :total="totalNum">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "my_order",
        data() {
            return {
              orderFlag: this.$store.state.orderFlag,
              topList:['所有订单','待支付','待发货','待收货'],
              spanNum: 0,
              totalNum: 0,
              tableData: [],
              currentPage: 1,
              multipleSelection:[],
              type: 0
            }
        },
        created() {
          this.list(this.type,1)
        },
        methods: {
          list(type,pages) {
            this.$http.post('orderList',{tabIndex:type,page:pages}).then((res)=>{
              console.log(res.data)
              this.totalNum = res.data.data.count
              this.tableData = res.data.data.list
            })
          },
          //设置表头颜色
          tableheaderClassName({ row, rowIndex }) {
            return "table-head-th";
          },
          change(index) {
            this.spanNum = index
            this.type = index
            this.list(this.type,1)
          },
          // 获取多选参数,计算价格
          handleSelectionChange(val) {
            this.multipleSelection = val;
          },
          handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
            this.list(this.type,val)
            // console.log(`当前页: ${val}`);
          },
          saleSee(row,index) {
            // console.log(row,index)
            if(index == 1) {
              this.$router.push('/my_order/after_sale/'+row.id)
            }else if(index == 2){
              this.$router.push('/my_order/after_sale_dispose/'+row.id)
            }else{
              this.$router.push('/my_order/oder_detail/'+row.id)
            }
          }
        },
        watch: {
          '$route' (to, from) {
            // 对路由变化作出响应...
            // console.log(to);
            if(from.path == '/my_order') {
              this.orderFlag = false
            }
            if(to.path == '/my_order') {
              this.orderFlag = true
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
  .table-head-th{
    background-color: #C39B63 !important;
    color: #fff;
  }
  .content{
    width: 100%;
    background: #efefef;
    padding-top: 60px;
  }
  .main{
    background: #fff;
    min-height: 800px;
    padding: 0 20px 50px;
    box-sizing: border-box;
  }
  .box_top{
    /*line-height: 80px;*/
    padding: 40px 0;
    border-bottom: 1px solid #efefef;
    margin-bottom: 40px;
  }
  .box_top>span{
    float: left;
    width: 100px;
    border-right: 1px solid #999;
    cursor: pointer;
  }
  .box_top>span:last-child{
    border-right: none
  }
  .box_top>.hit{
    /*background: #333;*/
    color: #C39B63;
  }
  .pageNum{
    padding-right: 40px;
    box-sizing: border-box;
    text-align: right;
    margin: 30px 0;
  }
  .pageNum[data-v-dd524514]{
    background: #fff;
    padding-bottom: 50px;
  }
</style>

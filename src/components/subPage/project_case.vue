<template>
  <div class="content">
    <router-view/>
    <div v-if="pageFlag" class="main">
      <div class="case_title">
        <router-link to="/quality">产品支持</router-link>
        <span> > </span>
        <router-link to="/project_case" style="color: #CFA972">案例</router-link>
      </div>
      <div class="case_content">
        <div class="case_content_title">
          <span @click="changeCole(1)" :class="{col:colorChange == 1}">工程案例</span>
          <span>|</span>
          <span @click="changeCole(2)" :class="{col:colorChange == 2}">门店案例</span>
          <span>|</span>
          <span @click="changeCole(3)" :class="{col:colorChange == 3}">外销案例</span>
        </div>
        <div class="case_content_box" style="position: relative">
          <div v-if="caseData.length == 0" style="position: absolute;left: 50%;transform: translateX(-50%);top: 30%;">
            <img :src="$store.state.qiNiuServer+'/kongbai_02.png'" alt="" style="width: 300px;display: block;">
            <p style="line-height: 80px;font-size: 20px;color: #cfa972;">暂时没有数据</p>
          </div>
          <ul>
            <router-link tag="li" :to="{name:'detail_case',params: {id:item.id}}" v-for="(item,index) in caseData" :key="index">
              <div class="imgBox">
                <div class="box" :style="{background: 'url('+baseUrl+item.img+') no-repeat center/cover'}"></div>
              </div>
              <span class="name">
                <span>{{item.name}}</span>
              </span>
              <span class="info">{{item.summary}}</span>
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
  </div>
</template>

<script>
    export default {
        name: "project_case",
        data() {
            return {
              baseUrl:'',
              type: 1,
              pageFlag: this.$store.state.caseFlag,
              colorChange: 1,
              currentPage: 1,
              totalNum: 10,
              caseData:[]
            }
        },
      watch: {
        '$route' (to, from) {
          // 对路由变化作出响应...
          // console.log(to);
          // console.log(from);
          if(from.path == '/project_case') {
            this.pageFlag = false
          }
          if(to.path == '/project_case') {
            this.pageFlag = true
          }
        }
      },
      created() {
        this.caseList(this.type,1)
      },
      methods: {
        caseList(types,pages) {
          this.$http.get('caseList',{type:types,page:pages}).then((res)=>{
            console.log(res.data.data)
            if(res.data.code == 200) {
              this.totalNum = res.data.data.counts
              this.baseUrl = res.data.data.baseUrl
              this.caseData = res.data.data.list
            }
          })
        },
        changeCole(index) {
          this.type = index
          this.caseList(index,1)
          this.colorChange = index
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        // 当前页码
        handleCurrentChange(val) {
          this.caseList(this.type,val)
          console.log(`当前页: ${val}`);
        }
      }
    }
</script>
<style>
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #CFA972;
  }
</style>
<style scoped>
  .content{
    background: #efefef;
  }
  .main{
    background: #fff;
    color: #333;
    font-size: 16px;
  }
  .main>.case_title{
    background: #efefef;
    line-height: 100px;
    height: 80px;
    text-align: left;
  }
  .main>.case_title>a{
    color: #333;
  }
  .main>.case_title>span{
    padding: 0 10px;
  }
  .case_content{
    padding: 20px 30px;
  }
  .case_content>.case_content_title{
    line-height: 40px;
    text-align: left;
    color: #999;
    margin-bottom: 30px;
  }
  .case_content>.case_content_title>span{
    cursor: pointer;
  }
  .case_content>.case_content_title>span:nth-child(even){
    cursor: auto;
    padding: 0 20px;
  }
  .col{
    color: #333;
  }
  .case_content_box{
    padding: 20px 30px;
  }
  .case_content_box>ul{
    width: 100%;
    /*height: auto;*/
    height: 1200px;
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
    height: 250px;
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
  .case_content_box>ul>li>.name>span{
    border-left: 4px solid #CFA972;
    padding-left: 10px;
  }
  .case_content_box>ul>li>.info{
    line-height: 20px;
    font-size: 14px;
    color: #999;
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
</style>

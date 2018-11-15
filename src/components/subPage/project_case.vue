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
          <span @click="changeCole('0')" :class="{col:colorChange == '0'}">工程案例</span>
          <span>|</span>
          <span @click="changeCole('1')" :class="{col:colorChange == '1'}">门店案例</span>
          <span>|</span>
          <span @click="changeCole('2')" :class="{col:colorChange == '2'}">外销案例</span>
        </div>
        <div class="case_content_box">
          <ul>
            <router-link tag="li" :to="{name:'detail_case',params: {id:index}}" v-for="(item,index) in caseData" :key="index">
              <div class="imgBox">
                <div class="box" :style="{background: 'url('+item.url+') no-repeat center/cover'}"></div>
              </div>
              <span class="name">
                <span>{{item.title}}</span>
              </span>
              <span class="info">{{item.info}}</span>
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
              pageFlag: true,
              colorChange: '0',
              currentPage: 1,
              totalNum: 19,
              caseData:[
                {
                  url:'../../../static/img/2.jpg',
                  title:'长沙城市花园',
                  info:'长沙城市花园250套房'
                },{
                  url:'../../../static/img/4.jpg',
                  title:'长沙城市花园',
                  info:'长沙城市花园250套房'
                },{
                  url:'../../../static/img/4.png',
                  title:'长沙城市花园',
                  info:'长沙城市花园250套房'
                },{
                  url:'../../../static/img/3.jpg',
                  title:'长沙城市花园',
                  info:'长沙城市花园250套房'
                },{
                  url:'../../../static/img/5.jpg',
                  title:'长沙城市花园',
                  info:'长沙城市花园250套房'
                },{
                  url:'../../../static/img/7.jpg',
                  title:'长沙城市花园',
                  info:'长沙城市花园250套房'
                },{
                  url:'../../../static/img/8.jpg',
                  title:'长沙城市花园',
                  info:'长沙城市花园250套房'
                },{
                  url:'../../../static/img/2.jpg',
                  title:'长沙城市花园',
                  info:'长沙城市花园250套房'
                }
              ]
            }
        },
      watch: {
        '$route' (to, from) {
          // 对路由变化作出响应...
          console.log(to);
          console.log(from);
          if(from.path == '/project_case') {
            this.pageFlag = false
          }
          if(to.path == '/project_case') {
            this.pageFlag = true
          }
        }
      },
        methods: {
          changeCole(index) {
            this.colorChange = index
          },
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
          },
          handleCurrentChange(val) {
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
    height: 1234px;
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
</style>

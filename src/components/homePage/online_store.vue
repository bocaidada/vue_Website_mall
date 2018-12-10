<template>
  <div>
    <router-view/>
    <section v-if="pageFlag" class="content">
      <div class="banner">
        <img :src="serverBase+'/store_banner_01.jpg'" alt="" width="100%">
      </div>
      <div class="main">
        <div class="case_content">
          <div class="case_content_title">
            <span @click="changeCole(num)" :class="{col:colorChange == num}">全部</span>
            <span @click="changeCole(item.id)" :class="{col:colorChange == item.id}" v-for="item in classify">{{item.name}}</span>
          </div>
          <div class="case_content_box">
            <div v-if="caseData.length == 0" style="position: absolute;left: 50%;transform: translateX(-50%);top: 30%;">
              <img :src="serverBase+'/kongbai_02.png'" alt="" style="width: 300px;display: block;">
              <p style="line-height: 80px;font-size: 20px;color: #cfa972;">暂时没有数据</p>
            </div>
            <ul>
              <router-link tag="li" :to="{name:'product_detail',params: {id:item.id}}" v-for="(item,index) in caseData" :key="index">
                <div class="imgBox">
                  <div class="box" :style="{background: 'url('+baseUrl+item.img+') no-repeat center/cover'}"></div>
                </div>
                <span class="name">
                  <span class="tit">{{item.model}}</span>
                  <span class="price">￥{{item.salesPrice}}</span>
                </span>
                <span class="info">简介：{{item.summary}}</span>
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
    </section>
  </div>
</template>

<script>
    export default {
      name: "online_store",
      data() {
        return {
          serverBase:this.$store.state.qiNiuServer,
          num:0,
          type: 0,
          baseUrl:'',
          classify:[],
          pageFlag: this.$store.state.productFlag,
          colorChange: 0,
          currentPage: 1,
          totalNum: 10,
          goodsList:{
            catalogId: 0,
            page: 1
          },
          caseData:[]
        }
      },
      created() {
        this.dataInit()
      },
      mounted() {
        this.contentList(this.type,1)
      },
      watch: {
        '$route' (to, from) {
          // 对路由变化作出响应...
          // console.log(to);
          // console.log(to.path.indexOf("/online_store/product_detail"))
          // console.log(from);
          if(from.path == '/online_store') {
            this.pageFlag = false
          }
          if(to.path == '/online_store') {
            this.pageFlag = true
            this.$store.commit('orderType',2)
          }
        }
      },
      methods: {
        dataInit() {
          this.$http.get('goodsCatalog','').then((res)=>{
            console.log(res.data)
            if(res.data.code == 200){
              this.classify = res.data.data.list
            }
          })
        },
        contentList(types,pages) {
          this.$http.get('goodsList',{catalogId:types,page:pages}).then((res)=>{
            console.log(res.data)
            this.totalNum = res.data.data.counts
            this.baseUrl = res.data.data.baseUrl
            this.caseData = res.data.data.list
          })
        },
        changeCole(index) {
          this.type = index
          this.colorChange = index
          this.contentList(index,1)
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          this.contentList(this.type,val)
          console.log(`当前页: ${val}`);
        }
      }
    }
</script>

<style scoped>
  .content,.banner{
    width: 100%;
    background: rgb(241,241,241);
  }
  .banner>img{
    display: block;
    margin-bottom: 30px;
  }
  .case_content{
    padding: 20px 30px;
  }
  .case_content>.case_content_title{
    line-height: 20px;
    text-align: left;
    color: #999;
    margin-bottom: 30px;
  }
  .case_content>.case_content_title>span{
    text-align: center;
    display: inline-block;
    width: 60px;
    cursor: pointer;
    border-left: 2px solid #dfdfdf;
  }
  .case_content>.case_content_title>span:first-child{
    border-left: none;
    text-align: left;
    width: 45px;
  }
  .col{
    color: #333;
  }
  .case_content_box{
    padding: 80px 50px 40px;
    background: #fff;
    position: relative;
  }
  .case_content_box>ul{
    width: 100%;
    /*height: auto;*/
    height: 1310px;
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
    height: 280px;
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
  .case_content_box>ul>li>.name>.tit{
    border-left: 4px solid #CFA972;
    padding-left: 10px;
  }
  .case_content_box>ul>li>.name>.price{
    float: right;
    color: #CFA972;
  }
  .case_content_box>ul>li>.info{
    line-height: 20px;
    font-size: 14px;
    color: #999;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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

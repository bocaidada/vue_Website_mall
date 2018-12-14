<template>
  <div class="main">
    <div class="case_title">
      <router-link to="/news_list">行业资讯</router-link>
      <span> > </span>
      <a href="javascript:return false;" style="color: #CFA972" v-if="contentData.info">{{contentData.info.name}}</a>
    </div>
    <div class="case_content">
      <div class="box" v-if="contentFlag">
        <div class="box_text" v-html="content"></div>
      </div>
    </div>
    <!--<div style="height: 40px;background: #efefef"></div>-->
  </div>
</template>

<script>
  export default {
    name: "news_detail",
    data() {
      return {
        contentData:{},
        contents:'',
        contentFlag:false
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        // console.log(to);
        // console.log(from);
      },
      '$store.state.caseFlag' (val,old) {
        // console.log(val,old)
        // this.pageFlag = val
      }
    },
    created() {
      // console.log(this.$route.params.id)
      // console.log(this.$store.state.caseFlag);
      this.content()
    },
    methods: {
      content() {
        this.$http.get('newsInfo',{id:this.$route.params.id}).then((res)=>{
          if(res.data.code == 200){
            // console.log(res.data.data)
            this.contentData = res.data.data
            this.content = Base64.decode(res.data.data.info.content)
            if(this.content) {
              this.contentFlag = true
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .main{
    min-height: 820px;
  }
  .main>.case_title{
    /*background: #efefef;*/
    line-height: 100px;
    height: 80px;
    text-align: left;
    box-sizing: border-box;
    padding-left: 16px;
  }
  .main>.case_title>a{
    color: #333;
  }
  .main>.case_title>span{
    padding: 0 10px;
  }
  .case_content{
    padding: 20px 20px 40px;
    box-sizing: border-box;
    border-radius: 4px;
  }
  .case_content>.box{
    /*border:1px dashed #ccc;*/
    box-sizing: border-box;
    padding: 20px 25px;
  }
  .box_text{
    text-align: left;
    width: 100%;
    padding-bottom: 60px;
  }
  .box_text p{
    text-indent: 2em;
    line-height: 40px;
    height: 40px;
  }
  .box_text img{
    width: auto;
    margin: 0 auto;
  }
</style>

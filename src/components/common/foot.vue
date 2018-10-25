<template>
  <footer>
      <main>
        <div class="main_left">
          <dl>
            <dt>关于我们</dt>
            <dd>
              <router-link to="">公司简介</router-link>
            </dd>
            <dd>
              <router-link to="">发展历程</router-link>
            </dd>
            <dd>
              <router-link to="">公司动态</router-link>
            </dd>
            <dd>
              <router-link to="">奖项荣誉</router-link>
            </dd>
          </dl>
          <dl>
            <dt>加盟我们</dt>
            <dd>
              <router-link to="">加盟条件</router-link>
            </dd>
            <dd>
              <router-link to="">加盟优势</router-link>
            </dd>
            <dd>
              <router-link to="">加盟流程</router-link>
            </dd>
            <dd>
              <router-link to="">加盟申请</router-link>
            </dd>
            <dd>
              <router-link to="">门店地图</router-link>
            </dd>
          </dl>
          <dl>
            <dt>产品中心</dt>
            <dd>
              <router-link to="">实木门</router-link>
            </dd>
            <dd>
              <router-link to="">烤漆木门</router-link>
            </dd>
            <dd>
              <router-link to="">复合门</router-link>
            </dd>
            <dd>
              <router-link to="">全屋定制</router-link>
            </dd>
          </dl>
          <dl>
            <dt>工程案例</dt>
            <dd>
              <router-link to="">工程案例</router-link>
            </dd>
          </dl>
          <dl>
            <dt>关注我们</dt>
            <dd>
              <router-link to="">微信</router-link>
            </dd>
          </dl>
        </div>
        <div class="main_right">
            <div class="imgBox">
              <img src="../../../static/img/1.png" alt="">
              <span>金凯木业</span>
            </div>
        </div>
      </main>
  </footer>
</template>

<script>
    export default {
        name: "foot"
    }
</script>

<style scoped>
  footer{
    width: 100%;
    height: 400px;
    background: #313949;
  }
  main{
    width: 85%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    box-sizing: border-box;
    padding-top: 60px;
    color: #fff;
  }
  .main_left{
    width: 70%;
    height: 100%;
    float: left;
    display: flex;
    justify-content: space-around;
  }
  .main_left dl{
    text-align: left;
  }
  .main_left dt{
    line-height: 80px;
    letter-spacing: 1px;
    font-size: 20px;
  }
  .main_left dd{
    line-height: 45px;
    letter-spacing: 1px;
    cursor: pointer;
    font-size: 16px;
  }
  .main_left dd:hover a{
    color: #fff;
  }
  .main_left dd a{
    color: #ccc;
  }
  .main_right{
    width: 30%;
    height: 100%;
    float: left;
  }
  .imgBox{
    width: 100%;
    margin-top: 70px;
  }
  .imgBox>span{
    font-size: 26px;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .imgBox>img{
    width: 50%;
    vertical-align: middle;
  }
</style>

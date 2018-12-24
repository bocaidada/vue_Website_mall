<template>
  <transition name="slide-fade">
    <div class="login" v-if="isLogin">
      <img @click="close()" :src="$store.state.qiNiuServer+'/close.png'" alt="">
        <div class="box">
          <div class="topLogo">
            <img :src="$store.state.qiNiuServer+'/logo.png'" alt="">
          </div>
          <div class="log_reg" v-if="forgetFlag">
            <div class="title">
              <span :class="{hit:hitNUm == 0}" @click="loginState('log')">登陆</span>
              <span style="padding: 0 20px"> | </span>
              <span :class="{hit:hitNUm == 1}" @click="loginState('reg')">注册</span>
            </div>
            <div class="isLogin">
              <form class="log form" v-if="stateFlag" @submit.prevent="submit" autocomplete="off">
                <div class="field">
                  <input name="mobile" maxlength="11" placeholder="请输入手机号" type="text" v-model="loginDateForm.username">
                </div>
                <div class="field">
                  <input name="pass" maxlength="20" placeholder="请输入密码" type="password" v-model="loginDateForm.password">
                </div>
                <div class="field">
                  <input class="logSubmit" @click="logSubmit()" type="button" value="登录">
                  <!--<input class="logSubmit" @keyup.enter="logSubmit()" @click="logSubmit()" type="button" value="登录">-->
                </div>
                <span class="forget" @click="forgetPass()">忘记密码 ？</span>
              </form>
              <form  class="reg form" v-else @submit.prevent="submit" autocomplete="off">
                <div class="field">
                  <input name="mobile" maxlength="11" placeholder="请输入手机号" type="text" v-model="regDateForm.username">
                </div>
                <div class="field imgBox">
                  <input name="imgCode" v-model="imgCodes" placeholder="请输入图片验证码" type="text">
                  <div @click="addNum()"><img width="100%" :src="$store.state.sendHost+'/auth/vcode?key=' + this.key + '&num='+ keyNum" alt=""></div>
                </div>
                <div class="field imgBox">
                  <input name="phoneCode" maxlength="6" placeholder="请输入手机验证码" type="text" v-model="regDateForm.code">
                  <div @click="getPhoneCode(regDateForm.username,2)">
                    <span v-if="phoneFlag">获取验证码</span>
                    <div v-else><span style="font-size: 18px;color: red">{{phoneMsg}}</span><span> s</span></div>
                  </div>
                </div>
                <div class="field">
                  <input name="pass" placeholder="请设置密码" minlength="6" maxlength="20" type="password" v-model="regDateForm.password">
                </div>
                <div class="field">
                  <input class="regSubmit" @click="regSubmit()" type="button" value="注册">
                </div>
                  <p class="logHit">点击 “注册” 即表示您同意并愿意遵守 <br>金凯木业商城 <a href="http://www.jinkaidoor.com/protocol.html" target="_blank">服务协议</a></p>
              </form>
            </div>
          </div>
          <div class="forget_pass" v-else>
            <div class="forget_title">忘记密码</div>
            <form class="form" action="" autocomplete="off" v-if="oneFlag">
              <div class="field">
                <input name="mobile" maxlength="11" placeholder="请输入手机号" type="text" v-model="forgetData.mobile">
              </div>
              <div class="field imgBox">
                <input name="imgCode" v-model="imgCodes" placeholder="请输入图片验证码" type="text">
                <div @click="addNum()"><img width="100%" :src="$store.state.sendHost+'/auth/vcode?key=' + this.key + '&num='+ keyNum" alt=""></div>
              </div>
              <div class="field imgBox">
                <input name="phoneCode" maxlength="6" placeholder="请输入手机验证码" type="text" v-model="forgetData.code">
                <div @click="getPhoneCode(forgetData.mobile,3)">
                  <span v-if="phoneFlag">获取验证码</span>
                  <div v-else><span style="font-size: 18px;color: red">{{phoneMsg}}</span><span> s</span></div>
                </div>
              </div>
              <div class="field">
                <input class="regSubmit" @click="nextStep1()" type="button" value="下一步">
              </div>
            </form>
            <form class="form" action="" v-else>
              <div class="field">
                <input name="password" minlength="6" maxlength="20" onKeyUp="value=value.replace(/[\W]/g,'')" placeholder="请设置新密码" type="password" v-model="resetPass.password">
              </div>
              <div class="field">
                <input name="password" onKeyUp="value=value.replace(/[\W]/g,'')" placeholder="请再次输入密码" type="password" v-model="password">
              </div>
              <div class="field">
                <input class="regSubmit" @click="nextStep2()" type="button" value="提交">
              </div>
            </form>
          </div>
        </div>
    </div>
  </transition>
</template>

<script>
  import md5 from '../../../static/js/md5.min'
    export default {
      name: "login",
      data() {
        return {
          // 找回密码步骤开关
          oneFlag:true,
          password:'',
          forgetFlag:true,
          //图形验证码唯一识别码
          key:'',
          //图形验证码
          imgCodes:'',
          phoneFlag:true,
          phoneMsg:'',
          keyNum: 1,
          hitNUm: 0,
          isLogin:this.$store.state.isLogin,
          stateFlag:this.$store.state.regState,
          // 登陆信息
          loginDateForm: {
            username: '',
            password:'',
            type: 1
          },
          // 注册信息
          regDateForm: {
            username: '',
            password:'',
            code:''
          },
          // 注册获取短信验证码信息
          getSms:{
            mobile:'',
            type: 2,
            key:'',
            code:''
          },
          // 忘记密码确认身份信息
          forgetData:{
            mobile:'',
            code:''
          },
          //重置密码
          resetPass:{
            mobile:'',
            key:'',
            password:''
          }
        }
      },
      mounted() {
        this.imgCode()
      },
      watch: {
        "$store.state.isLogin":function (val,old) {
          console.log(val)
          this.isLogin = val
        },
        "$store.state.regState":function (val,old) {
          if(val){
            this.hitNUm = 0
          }else{
            this.hitNUm = 1
          }
          this.stateFlag = val
        },
        "regDateForm.username":function (val,old) {
          if(val.length == 11) {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            if (reg.test(val)) {} else{
              return this.$message.error('请输入正确的手机号');
            }
          }

        }
      },
    methods: {
      regSubmit: function() {
        if(this.regDateForm.username && this.regDateForm.password && this.regDateForm.code){
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(this.regDateForm.username)) {
            if(this.regDateForm.password.length<6 || this.regDateForm.password.length>20){
              return this.$message.error('密码长度只能设置6~20位')
            }
            if(this.regDateForm.code.length<6){
              return this.$message.error('验证码错误')
            }
            this.$http.post('register',this.regDateForm).then((res)=>{
              // console.log(res.data)
              if(res.data.code == 200){
                this.$message({
                  message: '注册成功！！！',
                  type: 'success'
                })
                this.regDateForm = {username: '',password:'',code: ''}
                this.$store.commit('userToken',res.data.data.token)
                this.close()
              }else{
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
          }else{
            return this.$message.error('请输入正确的手机号');
          }
        }else {
          return this.$message.error('请完整填写用户信息');
        }
      },
      logSubmit: function() {
        // console.log(this.loginDateForm)
        if(this.loginDateForm.username && this.loginDateForm.password){
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(this.loginDateForm.username)) {
            if(this.loginDateForm.password.length<6){
              return this.$message.error('密码不得小于六位');
            }
            this.$http.post('login',this.loginDateForm).then((res)=>{
              // console.log(res.data)
              if(res.data.code == 200){
                this.$message({
                  message: '登陆成功！！！',
                  type: 'success'
                })
                this.loginDateForm = {username: '',password:'',type: 1}
                this.$store.commit('userToken',res.data.data.token)
                this.close()

                // this.$router.push('/')
              }else{
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
          }else{
            return this.$message.error('请输入正确的手机号');
          }
        }else {
          return this.$message.error('手机号密码不能为空');
        }
        console.log(this.loginDateForm)
      },
      loginState(params) {
          if(params == 'log') {
            this.stateFlag = true
            this.hitNUm = 0
          }else{
            this.stateFlag = false
            this.hitNUm = 1
          }
        },
      forgetPass() {
        this.forgetFlag = false
      },
      //图片验证码刷新
      addNum() {
        this.keyNum += 1
      },
      // 关闭登陆窗口
      close() {
        // this.isLogin = false
        this.forgetFlag = true
        this.$store.commit('loginState',true)
      },
      // 找回密码第一步
      nextStep1() {
        if(this.forgetData.code){
          this.$http.post('findpwd',this.forgetData).then((res)=>{
            if(res.data.code == 200){
              // console.log(res.data.data.unique)
              this.resetPass.mobile = this.forgetData.mobile
              this.resetPass.key = res.data.data.unique
              this.oneFlag = false
              this.forgetData = {mobile:'',code:''}
              this.imgCodes = ''
            }else{
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          })
        }else{
          return this.$message.error('请完整填写上述各项信息')
        }
      },// 找回密码第二步
      nextStep2() {
        if(this.resetPass.password && this.resetPass.password.length>5){
          if(this.resetPass.password == this.password){
            this.$http.post('resetpwd',this.resetPass).then((res)=>{
              if(res.data.code == 200){
                // console.log(res.data)
                this.forgetFlag = true
                this.oneFlag = true
                this.$message({
                  message: '新密码设置成功！立即登陆',
                  type: 'success'
                })
                this.resetPass = {mobile:'',key:'',password:''}
              }else{
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
          }else{
            return this.$message.error('两次密码不一致')
          }
        }else{
          return this.$message.error('请设置大于6位的新密码')
        }
      },
      //请求图片验证码
      imgCode() {
        if(localStorage.getItem('key')){
          this.key = localStorage.getItem('key')
        }else{
          this.key = md5(new Date().getTime())
          localStorage.setItem('key',this.key)
        }
      },
      //获取验证码
      getPhoneCode(params,index) {
        this.getSms.mobile = params
        this.getSms.key = this.key
        this.getSms.type = index
        this.getSms.code = this.imgCodes
        if(this.getSms.mobile && this.getSms.code) {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(this.getSms.mobile)) {
            this.$http.post('phone_code',this.getSms).then((res) => {
              console.log(res.data)
              if(res.data.code == 200){
                if(this.phoneFlag){
                  this.phoneFlag = false
                  let countDown = 60
                  this.phoneMsg = countDown
                  let t = setInterval(()=>{
                    this.phoneMsg -= 1
                    if(this.phoneMsg == 0){
                      clearInterval(t)
                      this.phoneFlag = true
                      this.addNum()
                    }
                  },1000)
                }else{
                  this.$message({
                    message: '请勿重复点击',
                    type: 'warning'
                  })
                }
              }else{
                this.addNum()
                this.$message({
                  message: res.data.msg,
                  type: 'error'
                })
              }
            })
          }else{
            return this.$message.error('请输入正确的手机号');
          }
        }else{
          return this.$message.error('请完整填写手机号和图形验证码');
        }
      }
    }
  }
</script>

<style scoped>
  .login{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2000;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,.9);
  }
  .box{
    width: 360px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 15%;
    color: #CEA972;
    padding: 20px 5px;
  }
  .login>img{
    width: auto;
    position: absolute;
    right: 60px;
    top: 30px;
    cursor: pointer;
  }
  .topLogo{
    width: 120px;
    height: 120px;
    background: #fff;
    border: 2px solid #CEA972;
    border-radius: 50%;
    margin: 0 auto;
    position: relative;
  }
  .topLogo>img{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 60%;
  }
  .title{
    line-height: 60px;
    margin-bottom: 35px;
  }
  .title>span{
    cursor: pointer;
    color: #CEA972;
  }
  .title>span:nth-child(2){
    color: #CEA972;
  }
  .title>.hit{
    color: #fff;
  }
  .title>span:nth-child(2){
    cursor: auto;
  }
  .field,.imgBox{
    width: 100%;
    height: 50px;
    line-height: 50px;
    margin-bottom: 18px;
    overflow: hidden;
  }
  .field:last-child{
    margin-top: 45px;
  }
  .box .log_reg .isLogin .form{
    width: 100%;
  }
  input{
    width: 100%;
    height: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    outline: none;
    border: none;
    background: none;
    font-size: 17px;
    color: #d6d1cb;
    background: rgba(255,255,255,.1);
    border-radius: 10px;
  }
  input::-webkit-input-placeholder{
    color: rgba(195,155,99,1);
    font-size: 14px;
  }
  input:-ms-input-placeholder{
    color: rgba(195,155,99,1);
    font-size: 14px;
  }
  input[type='button']{
    background: rgba(195,155,99,1);
    color:rgba(230,230,230,1);
    cursor: pointer;
    font-weight: 400;
    letter-spacing: 5px;
    font-size: 21px;
  }
  input[type='button']:hover{
    background: rgb(195, 150, 112);
  }
  .imgBox>input{
    width: 60%;
    height: 100%;
    float: left;
  }
  .imgBox>div{
    float: right;
    width: 35%;
    height: 100%;
    background: rgba(255,255,255,.1);
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    font-size: 14px;
  }
  .logHit{
    color: #d6cdb1;
    font-size: 14px;
  }
  .logHit>span{
    color: rgba(195,155,99,1);
    cursor: pointer;
  }
  .forget{
    display: block;
    line-height: 20px;
    font-size: 14px;
    cursor: pointer;
  }
  .forget_title{
    line-height: 70px;
    font-size: 22px;
    /*color: #dfdfdf;*/
    margin-bottom: 10px;
  }
  .slide-fade-enter-active,.slide-fade-leave-active{
    transition: all 1.5s;
    -moz-transition: all 1.5s;
    -webkit-transition: all 1.5s;
    opacity: 1;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: rotate3d(1,1,1,180deg);
    -ms-transform: rotate3d(1,1,1,180deg);
    -moz-transform: rotate3d(1,1,1,180deg);
    -webkit-transform: rotate3d(1,1,1,180deg);
    opacity: 0;
  }
</style>

<template>
  <transition name="slide-fade">
    <div class="login" v-if="isLogin">
        <div class="box">
          <div class="topLogo">
            <img src="../../../static/img/logo.png" alt="">
          </div>
          <div class="title">
            <span :class="{hit:hitNUm == 0}" @click="loginState('log')">登陆</span>
            <span style="padding: 0 20px"> | </span>
            <span :class="{hit:hitNUm == 1}" @click="loginState('reg')">注册</span>
          </div>
          <div class="isLogin">
            <form class="log" v-if="stateFlag" @submit.prevent="submit" autocomplete="off">
              <div class="field">
                <input name="mobile" placeholder="请输入手机号" type="text" v-model="loginDateForm.username">
              </div>
              <div class="field">
                <input name="pass" placeholder="请输入密码" minlength="6" type="text" v-model="loginDateForm.password">
              </div>
              <div class="field">
                <input name="submit" type="submit" value="登录">
              </div>
            </form>
            <form class="reg" v-else @submit.prevent="submit" autocomplete="off">
              <div class="field">
                <input name="mobile" placeholder="请输入手机号" type="text" v-model="regDateForm.username">
              </div>
              <div class="field imgBox">
                <input name="imgCode" v-model="imgCodes" placeholder="请输入图片验证码" type="text">
                <div @click="addNum()"><img width="100%" :src="'http://api.jkmy.com/v1/auth/vcode?key=' + this.key + '&num='+ keyNum" alt=""></div>
              </div>
              <div class="field imgBox">
                <input name="phoneCode" placeholder="请输入手机验证码" type="text" v-model="regDateForm.code">
                <div @click="getPhoneCode()">
                  <span v-if="phoneFlag">获取验证码</span>
                  <div v-else><span style="font-size: 18px;color: red">{{phoneMsg}}</span><span> s</span></div>
                </div>
              </div>
              <div class="field">
                <input name="pass" placeholder="请设置密码" minlength="6" type="text" v-model="regDateForm.password">
              </div>
              <div class="field">
                <input name="submit" type="submit" value="注册">
              </div>
            </form>
          </div>
          <div class="reg"></div>
        </div>
    </div>
  </transition>
</template>

<script>
  import md5 from '../../../static/js/md5.min'
    export default {
      name: "login",
      data() {
        let checkPhone = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('手机号不能为空'));
          } else {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            // console.log(reg.test(value));
            if (reg.test(value)) {
              callback();
            } else {
              return callback(new Error('请输入正确的手机号'));
            }
          }
        }
        let validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            callback();
          }
        }
        return {
          key:'',
          //图形验证码
          imgCodes:'',
          phoneFlag:true,
          phoneMsg:'',
          keyNum: 1,
          hitNUm: 0,
          isLogin:this.$store.state.isLogin,
          stateFlag:true,
          loginDateForm: {
            username: '',
            password:''
          },
          regDateForm: {
            username: '',
            password:'',
            code:''
          },
          getSms:{
            mobile:'',
            type: 2,
            key:'',
            code:''
          },
          rules: {
            username: [
              {validator: checkPhone, trigger: 'blur'}
            ],
            password: [
              {validator: validatePass, message: '密码不能为空'},
            ]
          }
        }
      },
      mounted() {
        this.imgCode()
      },
      watch: {
        "$store.state.isLogin":function (val,old) {
          console.log(val,old)
          this.isLogin = val
        },
        "regDateForm.username":function (val,old) {
          console.log(val.length)
          if(val.length == 11) {
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            if (reg.test(val)) {

            }else{
              return this.$message.error('请输入正确的手机号');
            }
          }

        }
      },
    methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        submit: function() {
          this.$store.commit('loginState')
          // console.log(this.$store.state.isLogin)
          // let formData = JSON.stringify(this.regDateForm); // 这里才是你的表单数据
          // console.log(formData)
          console.log(this.regDateForm)

          // this.$http.post('/path/to', formData).then((res) => {
          //   // success callback
          // }, (res) => {
          //   // error callback
          // });
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
      //图片验证码刷新
      addNum() {
        this.keyNum += 1
      },
      //请求图片验证码
      imgCode() {
        this.key = md5(new Date().getTime())
      },
      validate() {
        this.getSms.mobile = this.regDateForm.username
        this.getSms.key = this.key
        this.getSms.code = this.imgCodes
        if(this.getSms.mobile && this.getSms.code) {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(this.getSms.mobile)) {

          }else{
            return this.$message.error('请输入正确的手机号');
          }
        }else{
          return this.$message.error('请完整填写手机号和图形验证码');
        }
      },
      getPhoneCode() {
        this.getSms.mobile = this.regDateForm.username
        this.getSms.key = this.key
        this.getSms.code = this.imgCodes
        if(this.getSms.mobile && this.getSms.code) {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (reg.test(this.getSms.mobile)) {
            this.$api.phone_code(this.getSms).then((res)=>{
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
                    }
                  },1000)
                }else{
                  this.$message({
                    message: '请勿重复点击',
                    type: 'warning'
                  })
                }
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
    /*box-shadow: 0 0 1px 1px rgba(207,169,114,.8);*/
    padding: 20px 5px;
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
  input::-webkit-input-placeholder,input:-ms-input-placeholder{
    color: rgba(195,155,99,1);
    font-size: 14px;
  }
  input[name='submit']{
    background: rgba(195,155,99,1);
    color:rgba(230,230,230,1);
    cursor: pointer;
    font-weight: 400;
    letter-spacing: 5px;
    font-size: 21px;
  }
  input[name='submit']:hover{
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
  .slide-fade-enter-active,.slide-fade-leave-active{
    transition: all 2s;
    opacity: 1;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: rotate3d(1,1,1,180deg);
    opacity: 0;
  }
</style>

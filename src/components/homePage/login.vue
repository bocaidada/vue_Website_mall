<template>
    <div class="login" v-if="isLogin">
        <div class="box">
          <div class="topLogo">
            <img src="../../../static/img/logo.png" alt="">
          </div>
          <div class="title">
            <span class="hit" @click="loginState('login')">登陆</span>
            <span style="padding: 0 20px"> | </span>
            <span @click="loginState('reg')">注册</span>
          </div>
          <div class="isLogin">
            <form @submit.prevent="submit">
              <div class="field">
                <input name="phone" placeholder="请输入手机号" type="text" v-model="numberValidateForm.phone">
              </div>
              <div class="field">
                <input name="pass" placeholder="请输入密码" type="text" v-model="numberValidateForm.password">
              </div>
              <div class="field">
                <input name="submit" type="submit" value="登录">
              </div>
            </form>
          </div>
          <div class="reg"></div>
        </div>
    </div>
</template>

<script>
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
          isLogin:this.$store.state.isLogin,
          numberValidateForm: {
            phone: '',
            password:''
          },
          rules: {
            phone: [
              {validator: checkPhone, trigger: 'blur'}
            ],
            password: [
              {validator: validatePass, message: '密码不能为空'},
            ]
          }
        }
      },
      watch: {
        "$store.state.isLogin":function (val,old) {
          console.log(val,old)
          this.isLogin = val
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
          let formData = JSON.stringify(this.numberValidateForm); // 这里才是你的表单数据
          console.log(formData)
          console.log(this.numberValidateForm)

          // this.$http.post('/path/to', formData).then((res) => {
          //   // success callback
          // }, (res) => {
          //   // error callback
          // });
        }
      }
    }
</script>

<style scoped>
  .login{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10000;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,.8);
  }
  .box{
    width: 360px;
    height: 500px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20%;
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
    color: #fff;
  }
  .title>span:nth-child(2){
    color: #CEA972;
  }
  .title>.hit{
    color: #CEA972;
  }
  .title>span:nth-child(2){
    cursor: auto;
  }
  .field{
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-radius: 30px;
    background: rgba(255,255,255,.1);
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
    color: rgba(195,155,99,1);
  }
  input::-webkit-input-placeholder{
    color: rgba(195,155,99,1);
  }
  input[name='submit']{
    background: rgba(195,155,99,1);
    color:rgba(88,87,85,1);
    cursor: pointer;
    font-weight: 400;
    letter-spacing: 5px;
    font-size: 21px;
  }
  input[name='submit']:hover{
    background: rgb(195, 150, 112);
  }
</style>

<template>
  <div class="content">
    <div class="topBan"></div>
    <div class="botBox">
      <div class="main">
        <div class="upload">
          <div @click="openUpload()">上传样本</div>
          <span>上传原料成为供应商</span>
        </div>
        <img src="../../../static/img/pinzhi/yuan_banner_02.png" alt="">
        <img src="../../../static/img/pinzhi/yuan_banner_03.png" alt="">
        <img src="../../../static/img/pinzhi/yuan_banner_04.png" alt="">
        <img src="../../../static/img/pinzhi/yuan_banner_05.png" alt="">
      </div>
    </div>
    <transition name="upload-fade">
       <div class="uploadData" v-if="uploadBoxFlag">
      <div class="uploadBox">
        <img src="../../../static/img/joinUs/close.png" @click="closeUpload()" alt="">
        <h2>样品上传</h2>
        <form @submit.prevent="submit" autocomplete="off">
          <textarea placeholder="填写样品参数例如：木板类型：松木;树木产地：杭州市北高峰........." name="uploadDateForm.info" v-model="uploadDateForm.content" id="" cols="30" rows="10"></textarea>
          <el-upload
            :action="$store.state.sendHost+'/upload/material'"
            list-type="picture-card"
            :limit=limit
            :on-preview="handlePictureCardPreview"
            :before-upload="handleUpload"
            :on-success="handleSuccess"
            :on-exceed="handleLimits">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div class="fieldBot">
            <input name="name" onkeyup="value=value.replace(/[\d]/g,'') "onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[\d]/g,''))" placeholder="请输入姓名" type="text" v-model="uploadDateForm.name">
            <input name="mobile" placeholder="请输入手机号" type="text" v-model="uploadDateForm.mobile"><input name="submit" type="submit" value="上传">
          </div>
        </form>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "purchase",
        data() {
            return {
              limit:6,
              uploadBoxFlag: false,
              dialogImageUrl: '',
              dialogVisible: false,
              uploadDateForm:{
                name:'',
                content:'',
                imgs:[],
                mobile:''
              }
            }
        },
        methods: {
          openUpload() {
            this.uploadBoxFlag = true
            this.uploadDateForm = {name:'',content:'',imgs:[],mobile:''}
          },
          closeUpload() {
            this.uploadBoxFlag = false
          },
          handleUpload(file, fileList) {
            // console.log(file, fileList);
          },
          handleSuccess(res) {
            console.log(res);
            if (res.code == 200){
              console.log(res.data.img)
              this.uploadDateForm.imgs += ',' + res.data.img
            }else{
              this.$message({
                message: res.data.msg,
                type: 'error'
              })
            }
          },
          handleLimits(file, fileList) {
            if(fileList.length) {
              this.$message({
                message: '最多只能上传六张图片',
                type: 'warning'
              });
            }
          },
          handlePictureCardPreview(file) {
            console.log(file)
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          },
          submit: function() {
            // if(!this.uploadDateForm.name){
            //   return this.$message.error('姓名不能为空');
            // }
            // if (!this.uploadDateForm.name) {
            //   return this.$message.error('手机号不能为空');
            // } else {
            //   const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            //   if (reg.test(this.numberValidateForms.mobile)) {
            //     this.uploadBoxFlag = false
            //   } else {
            //     return this.$message.error('请输入正确的手机号');
            //   }
            // }
            if(this.uploadDateForm.imgs != ''){
              this.uploadDateForm.imgs = this.uploadDateForm.imgs.substring(1);
            }
            if(this.uploadDateForm.name && this.uploadDateForm.content && this.uploadDateForm.mobile) {
              const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
              if (reg.test(this.uploadDateForm.mobile)) {
                this.$api.sample(this.uploadDateForm).then((res)=>{
                  console.log(res.data)
                  if(res.data.code == 200){
                    this.$message({
                      message: '上传成功！！！',
                      type: 'success'
                    })
                    this.closeUpload()
                  }else{
                    this.$message({
                      message: res.data.msg,
                      type: 'error'
                    })
                  }
                },(res)=>{

                })
              } else {
                return this.$message.error('请输入正确的手机号');
              }
            }else {
              return this.$message.error('请完整填写相关信息');
            }
            // this.numberValidateForms.id = this.applyId;

            // let formData = JSON.stringify(this.numberValidateForms); // 这里才是你的表单数据
            // this.$api.apply(this.numberValidateForms).then((res) => {
            //   console.log(res.data)
            //   if(res.data.code == 200) {
            //     this.$message({
            //       message: '提交申请成功！',
            //       type: 'success'
            //     })
            //   }else {
            //     this.$message({
            //       message: res.data.msg,
            //       type: 'error'
            //     })
            //   }
            // }, (res) => {
            //   // error callback
            // });
          }
        }
    }
</script>

<style scoped>
  .topBan{
    width: 100%;
    height: 600px;
    background: url("../../../static/img/pinzhi/yuan_banner_01.jpg") no-repeat center/cover;
  }
  .botBox{
    width: 100%;
    height: auto;
  }
  .upload{
    padding: 60px 0 0;
  }
  .upload>div{
    width: 280px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 36px;
    color: #C39B63;
    border-radius: 5px;
    border: 2px solid #C39B63;
    cursor: pointer;
    margin: 0 auto;
  }
  .upload>div:hover{
    color: #c3733f;
    border: 2px solid #c3733f;
  }
  .upload>span{
    display: block;
    line-height: 60px;
    font-size: 18px;
    color: #959595;
    text-align: center;
  }
  .botBox>.main>img{
    width: 100%;
    display: block;
    margin: 80px 0;
  }

  .uploadData{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.2);
    z-index: 100;
  }
  .uploadBox{
    width: 1000px;
    /*height: 500px;*/
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20%;
    background: #fff;
    color: #CEA972;
    box-shadow: 3px 3px 46px 3px rgba(131,121,115,0.15);
    box-sizing: border-box;
    padding: 20px 50px;
    text-align: left;
  }
  .uploadBox>img{
    position: absolute;
    right: 50px;
    top: 26px;
    cursor: pointer;
  }
  .uploadBox>h2{
    line-height: 50px;
    margin-bottom: 20px;
    text-align: center;
  }
  .fieldBot{
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  .fieldBot>input,textarea{
    height: 100%;
    border: none;
    outline: none;
    box-sizing: border-box;
    border-radius: 5px;
    color: #333;
  }
  .fieldBot>input::-webkit-input-placeholder{
    color: #b5b5b5;
    font-size: 14px;
  }
  .fieldBot>input[name='name'],.fieldBot>input[name='mobile']{
    width: 38%;
    padding: 0 20px;
    border: 1px solid #DABA8C;
  }
  .fieldBot>input[name='submit']{
    width: 20%;
    background: #DABA8C;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    letter-spacing: 2px;
  }
  .fieldBot>input[name='submit']:hover{
    background: #da9e7a;
  }
  textarea{
    width: 100%;
    height: 220px;
    resize: none;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #DABA8C;
  }
  .el-upload--picture-card{
    width: 100px;
    height: 100px;
  }

  .upload-fade-enter-active,.upload-fade-leave-active{
    transition: all 1.5s;
    opacity: 1;
  }
  .upload-fade-enter, .upload-fade-leave-to{
    transform: rotate3d(0,1,0,180deg);
    opacity: 0;
  }
</style>

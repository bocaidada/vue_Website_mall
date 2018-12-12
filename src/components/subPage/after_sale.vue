<template>
  <div class="content">
    <div class="main">
      <div class="main_top" v-if="orderNum == 1">
        <router-link to="/store_manage">订单列表</router-link>
        <span> > </span>
        <router-link :to="'/store_manage/oder_detail/'+$route.params.id">订单详情</router-link>
        <span> > </span>
        <router-link to="" style="color: #CFA972">申请售后</router-link>
      </div>
      <div class="main_top" v-else>
        <router-link to="/my_order">订单列表</router-link>
        <span> > </span>
        <router-link :to="'/my_order/oder_detail/'+$route.params.id">订单详情</router-link>
        <span> > </span>
        <router-link to="" style="color: #CFA972">申请售后</router-link>
      </div>
      <div class="main_box">
        <div class="user_info">
          <div class="user_info_left" v-if="orderInfo.info">
            <img :src="orderInfo.baseImgUrl+orderInfo.info.img" alt="">
          </div>
          <div class="user_info_right" v-if="orderInfo.info">
            <table border="0" style="height: 140px;margin-bottom: 20px"  v-if="orderNum == 1">
              <tr>
                <td width="100px">产品型号：</td>
                <td width="250px">{{orderInfo.info.model}}</td>
                <td width="100px">客户姓名：</td>
                <td width="250px">{{orderInfo.info.name}}</td>
              </tr>
              <tr>
                <td>产品颜色：</td>
                <td>{{orderInfo.info.attr}}</td>
                <td>联系方式：</td>
                <td>{{orderInfo.info.mobile}}</td>
              </tr>
              <tr>
                <td>产品尺寸：</td>
                <td>{{orderInfo.info.size}}</td>
                <td>下单时间：</td>
                <td>{{orderInfo.info.time}}</td>
              </tr>
            </table>
            <table border="0" style="height: 140px;margin-bottom: 20px" v-else>
              <tr>
                <td width="100px">产品型号：</td>
                <td width="250px">{{orderInfo.info.model}}</td>
                <td>下单时间：</td>
                <td>{{orderInfo.info.time}}</td>
              </tr>
              <tr>
                <td width="100px">产品颜色：</td>
                <td width="250px">{{orderInfo.info.attr}}</td>
                <td></td>
                <td></td>
              </tr>
            </table>
            <p style="line-height: 50px;font-size: 24px;color: red">￥{{orderInfo.info.price}}</p>
          </div>
        </div>
        <table border="0" class="sale_info">
          <tr>
            <td valign="top">服务类型：</td>
            <td>售后服务</td>
          </tr>
          <tr>
            <td valign="top">货物状态：</td>
            <td>
              <el-radio v-model="radio" @change="radioChange(1)" label="1">未收到货</el-radio>
              <br>
              <el-radio v-model="radio" @change="radioChange(2)" label="2">已收到货</el-radio>
            </td>
          </tr>
          <tr>
            <td valign="top">售后原因：</td>
            <td>
              <el-select v-model="uploadDateForm.reason" placeholder="请选择原因">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr v-if="uploadDateForm.reason == '0'">
            <td valign="top">原因描述：</td>
            <td>
              <textarea maxlength="255" v-model="uploadDateForm.remark" name="" id="" cols="30" rows="10" style="" placeholder="请填写其他原因描述"></textarea>
            </td>
          </tr>
          <tr>
            <td valign="top">售后说明：</td>
            <td>
              <textarea maxlength="255" v-model="uploadDateForm.explain" name="" id="explain" cols="30" rows="10" style="" placeholder="请填写售后说明"></textarea>
            </td>
          </tr>
          <tr>
            <td valign="top">上传凭证：</td>
            <td>
              <el-upload
                :action="$store.state.sendHost+'/upload/service'"
                list-type="picture-card"
                :headers="{hT:$store.state.hT,hToken:token,hDeviceType:'3'}"
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
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button @click="uploadSale()">保存</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "after_sale",
        data() {
            return {
              orderInfo:{},
              token:localStorage.getItem('token'),
              orderNum: this.$store.state.orderType,
              limit: 3,
              dialogImageUrl: '',
              dialogVisible: false,
              radio: '',
              options: [{
                value: '1',
                label: '物流太慢'
              }, {
                value: '2',
                label: '快递丢失'
              }, {
                value: '3',
                label: '颜色有差异'
              }, {
                value: '4',
                label: '货物破损'
              }, {
                value: '5',
                label: '规格有差异'
              }, {
                value: '0',
                label: '其他原因'
              }],
              value: '',
              uploadDateForm:{
                id:'',
                cargoStatus:'',
                reason:'',
                imgs:[],
                remark:'',
                explain:''
              }
            }
        },
        created() {
          this.orderData()
        },
        watch: {
          "value" (val,old) {
            console.log(val)
          },
          "$store.state.orderType" (val,old) {
            this.orderNum = val
          }
        },
        methods: {
          orderData() {
            this.$http.get('orderServiceInfo',{id:this.$route.params.id}).then((res)=>{
              // console.log(res.data)
              if(res.data.code == 200) {
                this.orderInfo = res.data.data
              }
            })
          },
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handleUpload(file, fileList) {
            // console.log(file, fileList);
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
              this.$message.error('上传头像图片大小不能超过 5MB!');
            }
            return isLt5M;
          },
          handleSuccess(res) {
            // console.log(res);
            if (res.code == 200){
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
                message: '最多只能上传三张图片',
                type: 'warning'
              });
            }
          },
          handlePictureCardPreview(file) {
            // console.log(file)
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          },
          radioChange(val) {
            this.uploadDateForm.cargoStatus = val
          },
          uploadSale() {
            this.uploadDateForm.id = this.$route.params.id
            if(this.uploadDateForm.cargoStatus && this.uploadDateForm.reason && this.uploadDateForm.explain) {
              if(this.uploadDateForm.imgs == ''){
                this.$message.error('最少上传一张图片凭证')
                return
              }else{
                this.uploadDateForm.imgs = this.uploadDateForm.imgs.substring(1);
              }
              console.log(this.uploadDateForm)
              this.$http.post('orderServiceCreate',this.uploadDateForm).then((res)=>{
                // console.log(res.data)
                if(res.data.code == 200) {
                  if(this.orderNum == 1){
                    this.$router.push('/store_manage/after_sale_dispose/'+this.$route.params.id)
                  }else{
                    this.$router.push('/my_order/after_sale_dispose/'+this.$route.params.id)
                  }
                }
              })
            }else{
              this.$message.error('请完整填写上述各项信息')
            }
          }
        }
    }
</script>

<style scoped>
  .content{
    width: 100%;
    background: #efefef;
    padding: 40px 0;
  }
  .content>.main{
    background: #fff;
  }
  .content>.main>.main_top{
    line-height: 60px;
    background: #efefef;
    text-align: left;
  }
  .content>.main>.main_top>a{
    color: #434343;
  }
  .main_box{
    padding: 35px 40px;
    text-align: left;
  }
  .user_info{
    height: 205px;
    padding-bottom: 35px;
    border-bottom: 1px dashed #efefef;
    margin-bottom: 50px;
  }
  .user_info_left{
    width: 200px;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;
    background: #efefef;
    float: left;
  }
  .el-select{
    width: 300px;
  }
  .user_info_left>img{
    width: 100%;
  }
  .user_info_right{
    width: 76%;
    height: 100%;
    float: right;
  }
  .sale_info{
    margin-bottom: 80px;
  }
  .sale_info tr{
    /*padding: 20px 0;*/
    margin-bottom: 20px;
  }
  .sale_info td{
    text-align: left;
    line-height: 35px;
    padding: 15px 0;
  }
  textarea{
    padding: 15px 20px;
    outline: none;
    /*border: 1px solid #CFA972;*/
    border: 1px solid #dfdfdf;
    resize: none;
    width: 450px;
    height: 150px;
    border-radius: 5px;
  }
  button{
    width: 140px;
    height: 40px;
    background: #CFA972;
    text-align: center;
    color: #fff;
    outline: none;
    border: none;
    border-radius: 5px;
    letter-spacing: 2px;
    font-size: 18px;
    cursor: pointer;
  }
  button:hover{
    background: #cf8b4f;
  }
</style>

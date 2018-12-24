<template>
  <div class="content">
    <div></div>
    <div class="mapBox"  v-show="changeNum == 1">
      <div class="map" id="lp_map"></div>
      <div class="offline_left">
        <div :class="{hit:changeNum == 1}" @click="changes(1)">
          <p>门店地图</p>
          <p>NATIONAL  STORE</p>
        </div>
        <div :class="{hit:changeNum == 2}" @click="changes(2)">
          <p>加入我们</p>
          <p>JOIN   CONDITIONS</p>
        </div>
        <div :class="{hit:changeNum == 3}" @click="changes(3)">
          <p>申请加入</p>
          <p>APPLY   FOR   FRANCHISE</p>
        </div>
      </div>
    </div>
    <div class="main" v-if="changeNum != 1">
      <div class="offline_left">
        <div :class="{hit:changeNum == 1}" @click="changes(1)">
          <p>门店地图</p>
          <p>NATIONAL  STORE</p>
        </div>
        <div :class="{hit:changeNum == 2}" @click="changes(2)">
          <p>加入我们</p>
          <p>JOIN   CONDITIONS</p>
        </div>
        <div :class="{hit:changeNum == 3}" @click="changes(3)">
          <p>申请加入</p>
          <p>APPLY   FOR   FRANCHISE</p>
        </div>
      </div>
      <div class="offline_right">
        <div v-if="changeNum == 2" class="offline_right_box join_us">
          <div class="join_us_top">
            <div class="join_us_top_left">
              <img :src="$store.state.qiNiuServer+'/server/xindex_02.png'" alt="">
              <p>加盟条件</p>
            </div>
            <div class="join_us_top_right">
              <p>1、具备经营和市场意识，能认同公司经营的理念，具品牌意识和发展眼光。</p>
              <p>2、对品牌经营，专卖经营有一定的了解，最好从事过与室内门产品相关的工作。</p>
              <p>3、具有相关销售网络或室内门产品营销经验。</p>
              <p>4、了解本区域木门市场，有一定销售渠道。</p>
              <p>5、是加盟店的直接经营者，能够全身心投入到经营中。</p>
              <p> 6、愿意遵守贵公司的各项规定，特申请加盟成为金凯室内门产品的经销商。</p>
            </div>
          </div>
          <div class="join_us_top">
            <div class="join_us_top_left">
              <img :src="$store.state.qiNiuServer+'/server/xindex_04.png'" alt="">
              <p>加盟优势</p>
            </div>
            <div class="join_us_top_right">
              <p>1、具备经营和市场意识，能认同公司经营的理念，具品牌意识和发展眼光。</p>
              <p>2、对品牌经营，专卖经营有一定的了解，最好从事过与室内门产品相关的工作。</p>
              <p>3、具有相关销售网络或室内门产品营销经验。</p>
              <p>4、了解本区域木门市场，有一定销售渠道。</p>
              <p>5、是加盟店的直接经营者，能够全身心投入到经营中。</p>
              <p>6、愿意遵守贵公司的各项规定，特申请加盟成为金凯室内门产品的经销商。</p>
            </div>
          </div>
        </div>
        <div v-if="changeNum == 3" class="offline_right_box apply_join">
          <img :src="$store.state.qiNiuServer+'/server/aindex_01.png'" alt="">

          <el-form :model="ruleForm" autocomplete="off" :rules="rules" status-icon ref="ruleForm">
            <el-form-item
              prop="name">
              <el-input type="text" v-model="ruleForm.name" maxlength=16 placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item
              prop="mobile">
              <el-input type="text" maxlength=11 v-model="ruleForm.mobile" placeholder="请输入联系方式"></el-input>
            </el-form-item>
            <el-form-item
              prop="company">
              <el-input v-model.number="ruleForm.company" maxlength="30" placeholder="请输入公司名称"></el-input>
            </el-form-item>
            <el-form-item
              prop="address">
              <el-input v-model.number="ruleForm.address" maxlength="100" placeholder="请输入公司地址"></el-input>
            </el-form-item>
            <el-form-item
              prop="message" style="width: 100%">
              <textarea name="" id="" cols="30" maxlength="255" v-model="ruleForm.message" rows="10" placeholder="请输入留言"></textarea>
            </el-form-item>
            <el-form-item style="width: 100%;text-align: right">
              <el-button class="button" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
          </el-form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "offline_store",
        data() {
            let checkPhone = (rule, value, callback) => {
              if (!value) {
                return callback(new Error('手机号不能为空'));
              } else {
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                if (reg.test(value)) {
                  callback();
                } else {
                  return callback(new Error('请输入正确的手机号'));
                }
              }
            }
            let checkName = (rule, value, callback) => {
              if (!value) {
                return callback(new Error('用户名不能为空'));
              } else {
                const reg = /^[A-Za-z\u4e00-\u9fa5]+$/
                if (reg.test(value)) {
                  callback();
                } else {
                  return callback(new Error('用户名只可以输入字母和中文'));
                }
              }
            }
            return {
              map:{},
              changeNum: 1,
              data_info:[],
              address:'',
              ruleForm:{
                name:'',
                mobile:'',
                company:'',
                address:'',
                message:''
              },
              rules: {
                name: [
                  {validator: checkName, trigger: 'blur'}
                ],
                mobile: [
                  {validator: checkPhone, trigger: 'blur'}
                ],
                company: [
                  {required: true, message: '公司名称不能为空', trigger: 'blur'}
                ],
                address: [
                  {required: true, message: '公司地址不能为空', trigger: 'blur'}
                ]
              }
            }
        },
        mounted () {
          this.map = new BMap.Map("lp_map");
          this.map.enableScrollWheelZoom(true); //启用滚轮放大缩小，默认禁用
          this.map.enableContinuousZoom(true); //启用地图惯性拖拽，默认禁用
          let point = new BMap.Point(120.21937542,30.25924446);
          this.map.centerAndZoom(point,6);
          this.initDataMap()
        },
        methods: {
          initDataMap() {
            let _this = this
            this.$http.get('shopMap','').then((res)=>{
              // console.log(res.data)
              if(res.data.code == 200) {
                let list = res.data.data.list
                if(list.length) {
                  for(let i=0;i<list.length;i++){
                    this.address = '门店名称：' + list[i].name + '；</br> 门店地址：' + list[i].address
                    this.data_info.push([list[i].lon,list[i].lat,this.address])
                  }
                }
                let opts = {
                  width : 250,     // 信息窗口宽度
                  height: 110,     // 信息窗口高度
                  title : "门店信息" , // 信息窗口标题
                  enableMessage:true//设置允许信息窗发送短息
                };
                for(let i=0;i<_this.data_info.length;i++){
                  let marker = new BMap.Marker(new BMap.Point(_this.data_info[i][0],_this.data_info[i][1]));  // 创建标注
                  let content = _this.data_info[i][2];
                  _this.map.addOverlay(marker);               // 将标注添加到地图中
                  addClickHandler(content,marker);
                }
                function addClickHandler(content,marker){
                  marker.addEventListener("click",function(e){
                    openInfo(content,e)}
                  );
                }
                function openInfo(content,e){
                  let p = e.target;
                  let point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                  let infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
                  _this.map.openInfoWindow(infoWindow,point); //开启信息窗口
                }
              }else{
                this.$message({
                  message:res.data.msg,
                  type:'error'
                })
              }
            })
          },
          changes(val) {
            this.changeNum = val
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$http.post('shopApply',this.ruleForm).then((res)=>{
                  console.log(res.data)
                  if(res.data.code == 200) {
                    this.$message({
                      message: '申请成功',
                      type:'success'
                    })
                    this.$refs[formName].resetFields();
                  }else{
                    this.$message({
                      message:res.data.msg,
                      type:'error'
                    })
                  }
                })
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          }
        }
    }
</script>

<style scoped>
  .content{
    width: 100%;
    height: 850px;
    position: relative;
  }
  .content>div:first-child{
    width: 100%;
    height: 850px;
    background: url("http://cdn.jinkaidoor.com/web/server/xindex_03.png") no-repeat center/cover;
    position: fixed;
    z-index: -1;
  }
  .main{
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    z-index: 1;
  }
  .offline_left{
    width: 28%;
    height: 100%;
    float: left;
    font-size: 20px;
    text-align: left;
    color: #fff;
  }
  .offline_left>div{
    width: 100%;
    height: 150px;
    box-sizing: border-box;
    padding: 40px 30px;
    background:rgba(126,107,90,.6);
    cursor: pointer;
  }
  .offline_left>.hit{
    background:rgba(89,73,63,.6);
  }
  .offline_left>div>p{
    line-height: 40px;
  }
  .offline_right{
    width: 72%;
    height: 100%;
    float: left;
    color: #fff;
  }
  .offline_right_box{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    box-sizing: border-box;
  }
  .join_us{
    width: 100%;
    height: 100%;
    padding: 120px 30px;
  }
  .join_us_top{
    width: 100%;
    margin-bottom: 80px;
    overflow: hidden;
  }
  .join_us_top>.join_us_top_left{
    width: 25%;
    float: left;
    text-align: center;
  }
  .join_us_top>.join_us_top_left>img{
    margin: 50px auto 30px;
  }
  .join_us_top>.join_us_top_right{
    width: 75%;
    float: left;
    text-align: left;
    line-height: 40px;
  }
  .apply_join{
    width: 100%;
    padding: 45px 70px 0;
  }
  .apply_join>img{
    width: 100%;
    margin-bottom: 20px;
  }
  .apply_join>form{
    width: 100%;
  }
  .apply_join>form>.fail{
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  .apply_join input{
    width: 48%;
    height: 100%;
    border: none;
    outline: none;
    border-radius: 5px;
    background:rgba(245,245,245,.1);
    padding-left: 20px;
    box-sizing: border-box;
    color: #fff;
  }
  textarea{
    width: 100%;
    height: 100px;
    background: rgba(245,245,245,1);
    border: none;
    outline: none;
    border-radius: 5px;
    color: #666;
    resize: none;
    box-sizing: border-box;
    padding: 10px 15px;
    /*margin-bottom: 20px;*/
  }
  .apply_join .button{
    outline: none;
    border: none;
    width:170px;
    height:50px;
    background:rgba(195,155,99,1);
    border-radius:4px;
    font-size: 20px;
    color: #fff;
    letter-spacing: 5px;
    cursor: pointer;
    float: right;
  }
  .apply_join .button:hover{
    background: rgb(195, 140, 97);
  }
  .el-form-item {
    margin-bottom: 22px;
    width: 46%;
    float: left;
  }
  .el-form-item:nth-child(odd) {
    margin-right: 8%;
  }
  .mapBox{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .mapBox>.offline_left{
    width: 336px;
    position: absolute;
    top: 0;
    right: 65%;
    z-index: 3;
  }
  #lp_map{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
  }
</style>

<template>
    <div class="content">
      <div class="topBan">
        <img :src="$store.state.qiNiuServer+'/pinzhi/banner_05.png'" alt="">
      </div>
      <div class="botBox">
        <div class="main">
          <div class="botBoxTop">
            <img :src="$store.state.qiNiuServer+'/server/index_01.png'" alt="">
          </div>
          <div class="botBoxContent">
            <p><span>1</span> 金凯产品可以自行购买并请专业安装师傅安装。</p>
            <p><span>2</span>金凯体验服务中心的地区也可以叫服务中心人员提供预约，安装与技术支持。</p>
            <p><span>3</span>如需定制尺寸可在下单地方填写尺寸提交订单，客服会帮你酸楚具体价格回传滇西表格方可确认付款。</p>
            <p><span>4</span>金凯产品不含运费，全部发物流为主，直接发往客户家里进行暗黄服务。由于地区不同，安装费用和运费会有差距，具体价格可询问当地金凯体验服务中心。</p>
            <p><span>5</span>木门不包含（拉手，胶链，门吸等五金配件），请在配件区另行购买。</p>
          </div>
          <div class="botBoxTop">
            <img :src="$store.state.qiNiuServer+'/server/index_02.png'" alt="">
          </div>
          <div class="care">
            <div class="careTitle">关于色差</div>
            <p>产品图片均为实物拍摄，并对照片实物精心修正调整，尽量与实物保持一致。</p>
            <p>由于光线、显示器不同，造成实物与图片色有所不同，这类问题不属于质量问题。</p>
          </div>
          <div class="care">
            <div class="careTitle">关于测量</div>
            <p>您在线下单后，您所在城市店面会按照订单顺序联系您预定测量时间。</p>
            <p>如有特殊需求请您记住订单号，主动联系当地金凯网店说明情况，带给您最优质的购物体验。</p>
          </div>
          <div class="care">
            <div class="careTitle">关于收获</div>
            <p>请在物流提货地点当场检查产品外包装，如有破损，配件不奇，发错货等情况，请在24小时内与客服人员联系。</p>
          </div>
          <div class="care">
            <div class="careTitle">关于退款</div>
            <p>定制等产品，有一定等特殊性，如果出现任何问题可以在线咨询，联系我</p>
            <p>只要订单尚未生产，您可以联系客服退款。</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "server",
        data() {
            return {

            }
        },
        methods: {}
    }
</script>

<style scoped>
  .topBan{
    width: 100%;
    margin-bottom: 60px;
  }
  .topBan>img{
    width: 100%;
  }
  .main{
    padding-bottom: 80px;
  }
  .botBox{
    height: auto;
  }
  .botBoxTop{
    padding: 40px 0;
    margin-bottom: 80px;
  }
  .botBoxTop>img{
    margin: auto;
  }
  .botBoxContent{
    font-size: 18px;
    color: #434343;
    text-align: left;
    line-height: 40px;
    margin-bottom: 80px;
  }
  .botBoxContent>p>span{
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #C39B63;
    color: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
    margin-right: 15px;
  }
  .care{
    border-left: 4px solid #C39B63;
    padding-left: 15px;
    margin-bottom: 60px;
  }
  .care>div{
    line-height: 25px;
    font-size: 24px;
    color: #C39B63;
    text-align: left;
    margin-bottom: 15px;
  }
  .care>p{
    line-height: 25px;
    font-size: 18px;
    color: #434343;
    text-align: left;
    margin-bottom: 10px;
  }
</style>

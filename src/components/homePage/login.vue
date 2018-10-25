<template>
    <div class="content">
        <div class="box">

        </div>
    </div>
</template>

<script>
    export default {
        name: "login"
    }
</script>

<style scoped>
  .content{
    width: 100%;
    height: 70vh;
    background: url("../../../static/img/timg.jpg") no-repeat center/cover;
    position: relative;
  }
  .box{
    width: 500px;
    height: 400px;
    /*background: #2c3e50;*/
    border-radius: 10px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 50px;
  }
</style>

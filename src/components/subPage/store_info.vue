<template>
    <div class="content">
      <h1>{{message}}我是店铺详细信息</h1>
    </div>
</template>

<script>
    export default {
      name: "store_info",
      props: {
        message: String  //定义传值的类型<br>
      }
    }
</script>

<style scoped>
    .content{
      color: #333;
    }
</style>

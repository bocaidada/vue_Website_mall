<template>
    <div class="content">
      <h1>{{message}}我是店铺详细信息</h1>
    </div>
</template>

<script>
    export default {
      name: "store_info",
      props: {
        message:String
      },
      data() {
        return {

        };
      },
      mounted() {
        setTimeout(() => {
          this.$emit('listenToChild', 'hello');
        }, 1000);
      },
      methods: {

      }
    }
</script>

<style scoped>
    .content{
      color: #333;
    }
</style>

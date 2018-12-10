<template>
    <div class="content">
      <img :src="$store.state.qiNiuServer+'/server/sindex_01.jpg'" alt="">
      <img :src="$store.state.qiNiuServer+'/server/sindex_02.jpg'" alt="">
      <img :src="$store.state.qiNiuServer+'/server/sindex_03.jpg'" alt="">
      <img :src="$store.state.qiNiuServer+'/server/sindex_04.jpg'" alt="">
      <img :src="$store.state.qiNiuServer+'/server/sindex_05.jpg'" alt="">
      <img :src="$store.state.qiNiuServer+'/server/sindex_06.jpg'" alt="">
      <img :src="$store.state.qiNiuServer+'/server/sindex_07.jpg'" alt="">
      <img :src="$store.state.qiNiuServer+'/server/sindex_08.jpg'" alt="">
    </div>
</template>

<script>
    export default {
        name: "make",
        data() {
            return {

            }
        },
        methods: {}
    }
</script>

<style scoped>
  .content{
    width: 100%;
  }
  .content>img{
    width: 100%;
    display: block;
  }
</style>

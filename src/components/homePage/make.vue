<template>
    <div class="content">
      <img :src="$store.state.qiNiuServer+item.url" v-for="(item,index) in imgData" :key="index" alt="">
    </div>
</template>

<script>
    export default {
        name: "make",
        data() {
            return {
              imgData:[
                {url:'/server/sindex_01.jpg'},
                {url:'/server/sindex_02.jpg'},
                {url:'/server/sindex_03.jpg'},
                {url:'/server/sindex_04.jpg'},
                {url:'/server/sindex_05.jpg'},
                {url:'/server/sindex_06.jpg'},
                {url:'/server/sindex_07.jpg'},
                {url:'/server/sindex_08.jpg'}
              ]
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

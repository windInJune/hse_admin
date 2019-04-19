<template>
  <el-footer>
     <span>上海健康安全环境研究会 版权所有 Copyright 2011   中国HSE在线  沪ICP备11032460号 </span>
     <img :src="imgSrc" alt="">
  </el-footer>
</template>
<script>
export default {
  data() {
    return {
      imgSrc:require('../../assets/images/bdtj.png')
    };
  }
}
</script>
<style scoped>
.el-footer{
  width: 100%;
   background:rgba(235,235,235,1);
  color: #959595;
  font-size: 14px;
  line-height: 60px;
  position: absolute;
  bottom: 0;
  z-index: 99999;
}
.el-footer img {
    margin-left:10px;
}
</style>

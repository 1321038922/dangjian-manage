<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .fll{
    float: left;
  }
  .flr{
    float: right;
  }
  /* 表格全局样式 */
  .table-item-img {
    width: 80px;
    height: 80px;
  }
  .el-submenu .el-menu-item{
    min-width: 0;
  }
 .clearfix:after{
   content: '';
   display: block;
   clear: both;
   width: 0;
   padding: 0;
 }
</style>

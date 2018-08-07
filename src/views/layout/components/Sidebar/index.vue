<template>
  <div class="scroll-wrap">
    <el-scrollbar 
      wrapClass="scroll-out-wrap"
      wrap-style="overflow-x: hidden!important;"
      style="height:100%"
      ref="scrollbar"> 
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <sidebar-item></sidebar-item>
        </el-menu>
      </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: { }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  .scroll-wrap{
    width: 90px;
    /* .el-menu {
      border: none;
      height: 100%;
      width: 90px !important;
    } */
  }
  
</style>


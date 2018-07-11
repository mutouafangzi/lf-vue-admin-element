<template>
  <div>
    <el-scrollbar 
      wrap-class="scroll-wrap"
      ref="scrollbar"> 
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
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

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .sidebar-wrap{
    .scroll-wrap{
      height: 100%;
      width: 180px;
      overflow-x: hidden !important;
    }
  }
  
</style>


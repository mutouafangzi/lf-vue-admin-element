<template>
    <div class="app-wrapper">
      <!-- 左边侧栏菜单 -->
      <sidebar class="sidebar-container"></sidebar>
      <!-- 右边主要内容 -->
      <div class="main-container">
        <!-- 右边上部分 -->
        <navbar></navbar>
        <!-- 右边下部分 -->
        <app-main></app-main>
      </div>
    </div>
</template>

<script>
  import {Navbar, Sidebar, AppMain} from '@/views/layout/components'

  export default {
    name: 'layout',
    
    computed:{
      
    },
    data() {
        return {}
    },
    components:{ 
      Navbar,
      Sidebar,
      AppMain
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper{
    // @include clearfix
    position: relative;
    height: 100%;
    width: 100%;
    // 主体区域
    .main-container {
      min-height: 100%;
      transition: margin-left .28s;
      margin-left: 180px;
    }
    // 侧边栏
    .sidebar-container {
      /* .horizontal-collapse-transition {
        transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
      } */
      transition: width .28s;
      width: 180px !important;
      height: 100%;
      position: fixed;
      font-size: 0px;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
    }
  }
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  

</style>

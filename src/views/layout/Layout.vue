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
      sidebar(){
        return this.$store.state.app.sidebar
      }
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
    .sidebar-container {
      width: 180px;
      height: 100%;
    }
  }

</style>

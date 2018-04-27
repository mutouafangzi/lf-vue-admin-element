<template>
    <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <navbar></navbar>
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
  @import "../../styles/mixin";
  .app-wrapper{
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    /* 此时sidebar.opened */
    &.hideSidebar{
      .sidebar-container{
        width: 36px;
        overflow: inherit;
      }
      .main-container{
        margin-left: 36px;
      }
    }
    //不做特殊处理的样式
    .sidebar-container {
      transition: width 0.28s ease-out;
      width: 180px;
      height: 100%;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow-y: auto;
      &::-webkit-scrollbar {display:none}
    }
    .main-container {
      min-height: 100%;
      transition: margin-left 0.28s ease-out;
      margin-left: 180px;
    }


  }

</style>

<template>
  <div>
    <el-scrollbar>
      <el-col :span="24">
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
      </el-col>
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

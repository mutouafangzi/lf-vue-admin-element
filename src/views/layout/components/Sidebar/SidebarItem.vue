<template>
  <div class="menu-wrapper">
    <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/documentation">文档</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/guide">引导页</router-link>
        </span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>
            <router-link to="/permission">权限测试页</router-link>
          </span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/icon">图标</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/components">组件</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/charts">图表</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/tab">Tab</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/table">表格</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/example">综合实力</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/nested">路由嵌套</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/error">错误页面</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/error-log">错误日志</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/excel">Excel</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/zip">ZIP</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/theme">换肤</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/clipboard">剪贴板</router-link>
        </span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">
          <router-link to="/i18n">国际化</router-link>
        </span>
      </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  
}
</script>

<template>
  <div class="menu-wrapper">
    <router-link to="/dashboard">
      <el-menu-item index="0">
        <i class="el-icon-menu"></i>
        <span>首页</span>
      </el-menu-item>
    </router-link>
    <router-link to="/documentation">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span>文档</span>
      </el-menu-item>
    </router-link>
    <router-link to="/guide">
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">引导页</span>
      </el-menu-item>
    </router-link>

    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>权限测试页</span>
      </template>
      <el-menu-item-group>
        <router-link to="/permission/page">
          <el-menu-item index="1-1">页面权限</el-menu-item>
        </router-link>
        <router-link to="/permission/directive">
          <el-menu-item index="1-2">指令权限</el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-submenu>

    <router-link to="/icon">
      <el-menu-item index="5">
        <i class="el-icon-menu"></i>
        <span slot="title">图标</span>
      </el-menu-item>
    </router-link>
    <router-link to="/components">
      <el-menu-item index="6">
        <i class="el-icon-menu"></i>
        <span slot="title">组件</span>
      </el-menu-item>
    </router-link>
    <router-link to="/charts">
      <el-menu-item index="7">
        <i class="el-icon-menu"></i>
        <span slot="title">图表</span>
      </el-menu-item>
    </router-link>
    <router-link to="/tab">
      <el-menu-item index="8">
        <i class="el-icon-menu"></i>
        <span slot="title">Tab</span>
      </el-menu-item>
    </router-link>
    <router-link to="/table">
      <el-menu-item index="9">
        <i class="el-icon-menu"></i>
        <span slot="title">表格</span>
      </el-menu-item>
    </router-link>
    <router-link to="/example">
      <el-menu-item index="10">
        <i class="el-icon-menu"></i>
        <span slot="title">综合实力</span>
      </el-menu-item>
    </router-link>
    <router-link to="/nested">
      <el-menu-item index="11">
        <i class="el-icon-menu"></i>
        <span slot="title">路由嵌套</span>
      </el-menu-item>
    </router-link>
    <router-link to="/error">
      <el-menu-item index="12">
        <i class="el-icon-menu"></i>
        <span slot="title">错误页面</span>
      </el-menu-item>
    </router-link>
    <router-link to="/error-log">
      <el-menu-item index="13">
        <i class="el-icon-menu"></i>
        <span slot="title">错误日志</span>
      </el-menu-item>
    </router-link>
    <router-link to="/excel">
      <el-menu-item index="14">
        <i class="el-icon-menu"></i>
        <span slot="title">Excel</span>
      </el-menu-item>
    </router-link>
    <router-link to="/zip">
      <el-menu-item index="15">
        <i class="el-icon-menu"></i>
        <span slot="title">ZIP</span>
      </el-menu-item>
    </router-link>
    <router-link to="/theme">
      <el-menu-item index="16">
        <i class="el-icon-menu"></i>
        <span slot="title">换肤</span>
      </el-menu-item>
    </router-link>
    <router-link to="/clipboard">
      <el-menu-item index="17">
        <i class="el-icon-menu"></i>
        <span slot="title">剪贴板</span>
      </el-menu-item>
    </router-link>
    <router-link to="/i18n">
      <el-menu-item index="18">
        <i class="el-icon-menu"></i>
        <span slot="title">国际化</span>
      </el-menu-item>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SidebarItem"
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.menu-wrapper {
  a {
    display: inline-block;
    width: 100%;
  }
}
</style>


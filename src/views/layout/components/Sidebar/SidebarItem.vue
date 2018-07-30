<template>
  <div class="menu-wrapper">
    <router-link to="/dashboard">
      <el-menu-item index="0">
        <i class="icon iconfont icon-Home-f"></i>&nbsp;
        <span>首页</span>
      </el-menu-item>
    </router-link>
    <router-link to="/documentation">
      <el-menu-item index="1">
        <i class="icon iconfont icon-File-word"></i>&nbsp;
        <span>文档</span>
      </el-menu-item>
    </router-link>
    <router-link to="/guide">
      <el-menu-item index="2">
        <i class="icon iconfont icon-cc-guidepost"></i>&nbsp;
        <span slot="title">引导页</span>
      </el-menu-item>
    </router-link>

    <el-submenu index="3">
      <template slot="title">
        <i class="icon iconfont icon-permissions"></i>&nbsp;
        <span>权限测试页</span>
      </template>
      <router-link to="/permission/page">
        <el-menu-item index="1-1">页面权限</el-menu-item>
      </router-link>
      <router-link to="/permission/directive">
        <el-menu-item index="1-2">指令权限</el-menu-item>
      </router-link>
    </el-submenu>

    <router-link to="/icon">
      <el-menu-item index="5">
        <i class="icon iconfont icon-icon-I"></i>&nbsp;
        <span slot="title">图标</span>
      </el-menu-item>
    </router-link>
    <el-submenu index="6">
      <template slot="title">
        <i class="icon iconfont icon-permissions"></i>&nbsp;
        <span>组件</span>
      </template>
      <router-link to="/components/page">
        <el-menu-item index="6-1">富文本编辑器</el-menu-item>
      </router-link>
      <router-link to="/components/directive">
        <el-menu-item index="6-2">Markdown</el-menu-item>
      </router-link>
      <router-link to="/components/directive">
        <el-menu-item index="6-3">JSON编辑器</el-menu-item>
      </router-link>
      <router-link to="/components/directive">
        <el-menu-item index="6-4">Splitpane</el-menu-item>
      </router-link>
      <router-link to="/components/directive">
        <el-menu-item index="6-5">头像上传</el-menu-item>
      </router-link>
      <router-link to="/components/directive">
        <el-menu-item index="6-6">Dropzone</el-menu-item>
      </router-link>
      <router-link to="/components/directive">
        <el-menu-item index="6-7">sticky</el-menu-item>
      </router-link>
      <router-link to="/components/directive">
        <el-menu-item index="6-8">CountTo</el-menu-item>
      </router-link>
      <router-link to="/components/directive">
        <el-menu-item index="6-9">小组件</el-menu-item>
      </router-link>
      <router-link to="/components/directive">
        <el-menu-item index="6-10">返回顶部</el-menu-item>
      </router-link>
      <router-link to="/components/directive">
        <el-menu-item index="6-11">拖拽Dialog</el-menu-item>
      </router-link>
      <router-link to="/components/directive">
        <el-menu-item index="6-12">列表拖拽</el-menu-item>
      </router-link>
      <router-link to="/components/directive">
        <el-menu-item index="6-13">可拖拽看板</el-menu-item>
      </router-link>
    </el-submenu>
    <router-link to="/components">
      <el-menu-item index="6">
        <i class="icon iconfont icon-component"></i>&nbsp;
        <span slot="title">组件</span>
      </el-menu-item>
    </router-link>
    <router-link to="/charts">
      <el-menu-item index="7">
        <i class="icon iconfont icon-chart-scatterplot-hexbin"></i>&nbsp;
        <span slot="title">图表</span>
      </el-menu-item>
    </router-link>
    <router-link to="/tab">
      <el-menu-item index="8">
        <i class="icon iconfont icon-tab"></i>&nbsp;
        <span slot="title">Tab</span>
      </el-menu-item>
    </router-link>
    <router-link to="/table">
      <el-menu-item index="9">
        <i class="icon iconfont icon-table"></i>&nbsp;
        <span slot="title">表格</span>
      </el-menu-item>
    </router-link>
    <router-link to="/example">
      <el-menu-item index="10">
        <i class="icon iconfont icon-example"></i>&nbsp;
        <span slot="title">综合实例</span>
      </el-menu-item>
    </router-link>
    <router-link to="/nested">
      <el-menu-item index="11">
        <i class="icon iconfont icon-listnested"></i>&nbsp;
        <span slot="title">路由嵌套</span>
      </el-menu-item>
    </router-link>
    <router-link to="/error">
      <el-menu-item index="12">
        <i class="icon iconfont icon-msnui-404-inverse"></i>&nbsp;
        <span slot="title">错误页面</span>
      </el-menu-item>
    </router-link>
    <router-link to="/error-log">
      <el-menu-item index="13">
        <i class="icon iconfont icon-debug"></i>&nbsp;
        <span slot="title">错误日志</span>
      </el-menu-item>
    </router-link>
    <router-link to="/excel">
      <el-menu-item index="14">
        <i class="icon iconfont icon-excel-view"></i>&nbsp;
        <span slot="title">Excel</span>
      </el-menu-item>
    </router-link>
    <router-link to="/zip">
      <el-menu-item index="15">
        <i class="icon iconfont icon-zip-view"></i>&nbsp;
        <span slot="title">ZIP</span>
      </el-menu-item>
    </router-link>
    <router-link to="/theme">
      <el-menu-item index="16">
        <i class="icon iconfont icon-skin"></i>&nbsp;
        <span slot="title">换肤</span>
      </el-menu-item>
    </router-link>
    <router-link to="/clipboard">
      <el-menu-item index="17">
        <i class="icon iconfont icon-clipboard"></i>&nbsp;
        <span slot="title">剪贴板</span>
      </el-menu-item>
    </router-link>
    <router-link to="/i18n">
      <el-menu-item index="18">
        <i class="icon iconfont icon-i18n"></i>&nbsp;
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


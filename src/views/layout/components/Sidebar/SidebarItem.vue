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
        <i class="icon iconfont icon-component"></i>&nbsp;
        <span>组件</span>
      </template>
      <router-link to="/components/tinymce">
        <el-menu-item index="6-1">富文本编辑器</el-menu-item>
      </router-link>
      <router-link to="/components/markdown">
        <el-menu-item index="6-2">Markdown</el-menu-item>
      </router-link>
      <router-link to="/components/json-editor">
        <el-menu-item index="6-3">JSON编辑器</el-menu-item>
      </router-link>
      <router-link to="/components/splitpane">
        <el-menu-item index="6-4">Splitpane</el-menu-item>
      </router-link>
      <router-link to="/components/avatar-upload">
        <el-menu-item index="6-5">头像上传</el-menu-item>
      </router-link>
      <router-link to="/components/dropzone">
        <el-menu-item index="6-6">Dropzone</el-menu-item>
      </router-link>
      <router-link to="/components/sticky">
        <el-menu-item index="6-7">sticky</el-menu-item>
      </router-link>
      <router-link to="/components/count-to">
        <el-menu-item index="6-8">CountTo</el-menu-item>
      </router-link>
      <router-link to="/components/mixin">
        <el-menu-item index="6-9">小组件</el-menu-item>
      </router-link>
      <router-link to="/components/back-to-top">
        <el-menu-item index="6-10">返回顶部</el-menu-item>
      </router-link>
      <router-link to="/components/drag-dialog">
        <el-menu-item index="6-11">拖拽Dialog</el-menu-item>
      </router-link>
      <router-link to="/components/dnd-list">
        <el-menu-item index="6-12">列表拖拽</el-menu-item>
      </router-link>
      <router-link to="/components/drag-kanban">
        <el-menu-item index="6-13">可拖拽看板</el-menu-item>
      </router-link>
    </el-submenu>
    <el-submenu index="7">
      <template slot="title">
        <i class="icon iconfont icon-chart-scatterplot-hexbin"></i>&nbsp;
        <span>图表</span>
      </template>
      <router-link to="/charts/keyboard">
        <el-menu-item index="7-1">键盘图表</el-menu-item>
      </router-link>
      <router-link to="/charts/line">
        <el-menu-item index="7-2">折线图</el-menu-item>
      </router-link>
      <router-link to="/charts/mixchart">
        <el-menu-item index="7-3">混合图表</el-menu-item>
      </router-link>
      <router-link to="/charts/mapcharts">
        <el-menu-item index="7-4">地图</el-menu-item>
      </router-link>
    </el-submenu>
    <router-link to="/tab">
      <el-menu-item index="8">
        <i class="icon iconfont icon-tab"></i>&nbsp;
        <span slot="title">Tab</span>
      </el-menu-item>
    </router-link>
    <el-submenu index="9">
      <template slot="title">
        <i class="icon iconfont icon-table"></i>&nbsp;
        <span>表格</span>
      </template>
      <router-link to="/table/dynamicTable">
        <el-menu-item index="9-1">动态table</el-menu-item>
      </router-link>
      <router-link to="/table/dragTable">
        <el-menu-item index="9-2">拖拽table</el-menu-item>
      </router-link>
      <router-link to="/table/innerEditTable">
        <el-menu-item index="9-3">table内编辑</el-menu-item>
      </router-link>
      <router-link to="/table/treeTable">
        <el-menu-item index="9-4">树形表格</el-menu-item>
      </router-link>
      <router-link to="/table/customTreeTable">
        <el-menu-item index="9-4">自定义列表</el-menu-item>
      </router-link>
      <router-link to="/table/complexTable">
        <el-menu-item index="9-4">综合Table</el-menu-item>
      </router-link>
    </el-submenu>
    <el-submenu index="10">
      <template slot="title">
        <i class="icon iconfont icon-example"></i>&nbsp;
        <span>综合实例</span>
      </template>
      <router-link to="/example/creatArticle">
        <el-menu-item index="10-1">创建文章</el-menu-item>
      </router-link>
      <router-link to="/example/articleList">
        <el-menu-item index="10-2">文章列表</el-menu-item>
      </router-link>
    </el-submenu>
    <el-submenu index="11">
      <template slot="title">
        <i class="icon iconfont icon-listnested"></i>&nbsp;
        <span>路由嵌套</span>
      </template>
      <router-link to="/nested/menu1">
        <el-menu-item index="11-1">菜单1</el-menu-item>
      </router-link>
      <router-link to="/nested/menu1">
        <el-menu-item index="11-2">菜单2</el-menu-item>
      </router-link>
    </el-submenu>
    <el-submenu index="12">
      <template slot="title">
        <i class="icon iconfont icon-msnui-404-inverse"></i>&nbsp;
        <span>错误页面</span>
      </template>
      <router-link to="/error/401">
        <el-menu-item index="11-1">401</el-menu-item>
      </router-link>
      <router-link to="/error/404">
        <el-menu-item index="11-2">404</el-menu-item>
      </router-link>
    </el-submenu>
    <router-link to="/error-log">
      <el-menu-item index="13">
        <i class="icon iconfont icon-debug"></i>&nbsp;
        <span slot="title">错误日志</span>
      </el-menu-item>
    </router-link>
    <el-submenu index="14">
      <template slot="title">
        <i class="icon iconfont icon-excel-view"></i>&nbsp;
        <span>Excel</span>
      </template>
      <router-link to="/excel/exportExcel">
        <el-menu-item index="14-1">Export Excel</el-menu-item>
      </router-link>
      <router-link to="/excel/exportSelected">
        <el-menu-item index="14-2">Export Selected</el-menu-item>
      </router-link>
      <router-link to="/excel/uploadExcel">
        <el-menu-item index="14-3">Upload Excel</el-menu-item>
      </router-link>
    </el-submenu>
    <el-submenu index="15">
      <template slot="title">
        <i class="icon iconfont icon-zip-view"></i>&nbsp;
        <span>ZIP</span>
      </template>
      <router-link to="/zip/exportZip">
        <el-menu-item index="15-1">Export Zip</el-menu-item>
      </router-link>
      <router-link to="/zip/exportElse">
        <el-menu-item index="15-2">Export Else</el-menu-item>
      </router-link>
    </el-submenu>
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


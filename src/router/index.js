import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../views/layout/Layout.vue'

Vue.use(Router)

export let routes = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/main.js')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  // 首页
  {
    path: '/dashboard',
    name: '',
    component: () => import('@/views/dashboard/main.js')
  },
  // 文档
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index')
      }
    ]
  },
  // 引导页
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index')
      }
    ]
  },
  // 页面权限
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page')
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive')
      }
    ]
  },
  // 图标
  {
    path: '/icon',
    component: Layout,
    redirect: '/icon/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/icon/index')
      }
    ]
  },
  // 组件
  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        // 富文本
        path: 'tinymce',
        component: () => import('@/views/components-demo/tinymce.vue')
      },
      {
        // markdown
        path: 'markdown',
        component: () => import('@/views/components-demo/markdown')
      },
      {
        // json编辑器
        path: 'json-editor',
        component: () => import('@/views/components-demo/jsonEditor')
      },
      {
        // 拆分网格/栅格布局
        path: 'splitpane',
        component: () => import('@/views/components-demo/splitpane')
      },
      {
        // 头像上传
        path: 'avatar-upload',
        component: () => import('@/views/components-demo/avatarUpload')
      },
      {
        // 文件拖拽上传
        path: 'dropzone',
        component: () => import('@/views/components-demo/dropzone')
      },
      {
        // 当窗口滚动至元素上边距离时，将元素固定在窗口顶部。
        path: 'sticky',
        component: () => import('@/views/components-demo/sticky')
      },
      {
        // 计数组件
        path: 'count-to',
        component: () => import('@/views/components-demo/countTo')
      },
      {
        // 小组件
        path: 'mixin',
        component: () => import('@/views/components-demo/mixin')
      },
      {
        // 返回顶部
        path: 'back-to-top',
        component: () => import('@/views/components-demo/backToTop')
      },
      {
        // 拖拽Dialog
        path: 'drag-dialog',
        component: () => import('@/views/components-demo/dragDialog')
      },
      {
        // 列表拖拽
        path: 'dnd-list',
        component: () => import('@/views/components-demo/dndList')
      },
      {
        // 可拖拽看板
        path: 'drag-kanban',
        component: () => import('@/views/components-demo/dragKanban')
      },
      {
        // 基于elementui的组件
        path: 'elemetui-mixin',
        component: () => import('@/views/components-demo/eleMixin')
      }
    ]
  },
  // 图表
  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        // 键盘图表
        path: 'keyboard',
        component: () => import('@/views/charts/keyboard')
      },
      {
        // 折线图
        path: 'line',
        component: () => import('@/views/charts/line')
      },
      {
        // 混合图表
        path: 'mixchart',
        component: () => import('@/views/charts/mixchart')
      },
      {
        // 地图
        path: 'mapcharts',
        component: () => import('@/views/charts/mapcharts')
      }
    ]
  },
  // 图像
  {
    path: '/graphic',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        // 3D
        path: '3D',
        component: () => import('@/views/graphic/3D/index')
      },
      {
        // 骰子
        path: 'dice',
        component: () => import('@/views/graphic/dice/index')
      },
      {
        // 全景看房
        path: 'panorama',
        component: () => import('@/views/graphic/panorama')
      }
    ]
  },
  // 动画
  {
    path: '/animation',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        // css3动画
        path: 'css3-animation',
        component: () => import('@/views/animation/css3-animation/index')
      }
    ]
  },
  // tab
  {
    path: '/tab',
    component: Layout,
    redirect: '/tab/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index')
      }
    ]
  },
  // 表格
  {
    path: '/table',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'dynamicTable',
        component: () => import('@/views/table/dynamicTable')
      },
      {
        path: 'dragTable',
        component: () => import('@/views/table/dragTable')
      },
      {
        path: 'innerEditTable',
        component: () => import('@/views/table/innerEditTable')
      },
      {
        path: 'treeTable',
        component: () => import('@/views/table/treeTable')
      },
      {
        path: 'customTreeTable',
        component: () => import('@/views/table/customTreeTable')
      },
      {
        path: 'complexTable',
        component: () => import('@/views/table/complexTable')
      }
    ]
  },
  // 实例
  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'creatArticle',
        component: () => import('@/views/example/article/creatArticle')
      },
      {
        path: 'articleList',
        component: () => import('@/views/example/article/articleList')
      },
      {
        path: 'koaServer',
        component: () => import('@/views/example/koa/main.vue')
      },
      {
        path: 'bigscreen',
        component: () => import('@/views/example/big-screen/main.vue')
      },
      {
        path: 'testWebsocket',
        component: () => import('@/views/example/websocket/main.vue')
      },
      {
        path: 'cssstyle',
        component: () => import('@/views/example/css-style/main.vue')
      }
    ]
  },
  // 路由嵌套
  {
    path: '/nested',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1')
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2')
      }
    ]
  },
  // 错误页面
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: '401',
        component: () => import('@/views/errors/401')
      },
      {
        path: '404',
        component: () => import('@/views/errors/404')
      }
    ]
  },
  // 错误日志
  {
    path: '/error-log',
    component: Layout,
    redirect: '/error-log/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/errlog/index')
      }
    ]
  },
  // Excel
  {
    path: '/excel',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'exportExcel',
        component: () => import('@/views/excel/exportExcel')
      },
      {
        path: 'exportSelected',
        component: () => import('@/views/excel/exportSelected')
      },
      {
        path: 'uploadExcel',
        component: () => import('@/views/excel/uploadExcel')
      }
    ]
  },
  // Zip
  {
    path: '/zip',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'exportZip',
        component: () => import('@/views/zip/exportZip')
      },
      {
        path: 'exportElse',
        component: () => import('@/views/zip/exportElse')
      }
    ]
  },
  // 换肤
  {
    path: '/theme',
    component: Layout,
    redirect: '/theme/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index')
      }
    ]
  },
  // 剪贴板
  {
    path: '/clipboard',
    component: Layout,
    redirect: '/clipboard/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index')
      }
    ]
  },
  // 国际化
  {
    path: '/i18n',
    component: Layout,
    redirect: '/i18n/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n/index')
      }
    ]
  }
]

export default new Router({
  routes,
  scrollBehavior: () => ({ y: 0 })
})

import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../views/layout/Layout.vue'
import Documentation from '../views/documentation/index.vue'
import Dashboard from '../views/dashboard/index.vue'
import Guide from '../views/guide/index.vue'
// import Permission from '../views/permission/index.vue'
import Icon from '../views/icon/index.vue'
import Components from '../views/components/index.vue'
import Charts from '../views/charts/index.vue'
import Tab from '../views/tab/index.vue'
import Table from '../views/table/index.vue'
import Example from '../views/example/index.vue'
import Nested from '../views/nested/index.vue'
import Errors from '../views/errors/index.vue'
import ErrorLog from '../views/errlog/index.vue'
import Excel from '../views/excel/index.vue'
import Zip from '../views/zip/index.vue'
import Theme from '../views/theme/index.vue'
import Clipboard from '../views/clipboard/index.vue'
import I18n from '../views/I18n/index.vue'

Vue.use(Router)

let routes = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: Dashboard,
    }]
  },
  {
    path: '/login',
    component: () =>
      import ('@/views/login/index.vue')
  },
  // 首页
  {
    path: '/dashboard',
    component: Dashboard
  },
  // 文档
  {
    path: '/documentation',
    component: Documentation
  },
  // 引导页
  {
    path: '/guide',
    component: Guide
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
        component: ()=>import('@/views/permission/directive')
      }
    ]
  },
  // 图标
  {
    path: '/icon',
    component: Icon
  },
  // 组件
  {
    path: '/components',
    component: Components
  },
  // 图表
  {
    path: '/charts',
    component: Charts
  },
  // tab
  {
    path: '/tab',
    component: Tab
  },
  // 表格
  {
    path: '/table',
    component: Table
  },
  // 实例
  {
    path: '/example',
    component: Example
  },
  // 路由嵌套
  {
    path: '/nested',
    component: Nested
  },
  // 错误页面
  {
    path: '/error',
    component: Errors
  },
  // 错误日志
  {
    path: '/error-log',
    component: ErrorLog
  },
  // Excel
  {
    path: '/excel',
    component: Excel
  },
  // Zip
  {
    path: '/zip',
    component: Zip
  },
  // 换肤
  {
    path: '/theme',
    component: Theme
  },
  // 剪贴板
  {
    path: '/clipboard',
    component: Clipboard
  },
  // 国际化
  {
    path: '/i18n',
    component: I18n
  },
]

export default new Router({
  routes,
  scrollBehavior: () => ({ y:0 })
})

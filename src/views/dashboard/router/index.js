/**
 * Created by lifang01
 * 2018/5/24
 * 安全态势路由
 */
import RouterConfig from '@/router'

// import situation from '../view/situation/main'
const dashboard = r => require.ensure([], () => r(require('../view/situation/main')), 'apps/situation/dashboard')
const dashboardManage = r => require.ensure([], () => r(require('../view/dashboard-manage/main')), 'apps/situation/dashboardManage')

let routes = RouterConfig.init([
  {
    path: '/situation',
    name: 'situation',
    redirect: '/situation/dashboard'
  },
  {
    label: '仪表板',
    path: '/situation/dashboard',
    name: 'dashboard',
    component: dashboard
  },
  // 周期报表
  {
    label: '仪表板管理',
    path: '/situation/dashboardmanage',
    name: 'dashboardManage',
    component: dashboardManage
  }
])

export default routes

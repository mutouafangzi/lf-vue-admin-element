import { SET_THEME_COLOR, SET_CURRENT_PAGE_FLAG, SET_OPEN_DASHBOARD_ID } from './types.js'

export default {
  // 设置或者更新主题
  [SET_THEME_COLOR] (state, data) {
    // 更新state的属性
    state.themeColor = data
  },
  // 设置当前页面标识
  [SET_CURRENT_PAGE_FLAG] (state, data) {
    state.currentPageFlag = data
  },
  // 设置打开的仪表板id
  [SET_OPEN_DASHBOARD_ID] (state, data) {
    state.openDashboardId = data
  }
}

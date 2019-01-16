import { SET_THEME_COLOR, SET_CURRENT_PAGE_FLAG, SET_OPEN_DASHBOARD_ID } from './types.js'

export default {
  setThemeColor ({commit}, themeColor) {
    commit(SET_THEME_COLOR, themeColor)
  },
  setCurrentPageFlag ({commit}, currentPageFlag) {
    commit(SET_CURRENT_PAGE_FLAG, currentPageFlag)
  },
  setOpenDashboardId ({commit}, openDashboardId) {
    commit(SET_OPEN_DASHBOARD_ID, openDashboardId)
  }
}

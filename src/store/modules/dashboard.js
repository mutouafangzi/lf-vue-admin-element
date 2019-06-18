const dashboard = {
  state: {
    // 当前主题
    themeColor: '',
    // 页面标识: dashboard & 其他
    currentPageFlag: '',
    // 仪表板管理中需要被打开的id
    openDashboardId: ''
  },
  actions: {
    setThemeColor ({ commit }, themeColor) {
      commit('SET_THEME_COLOR', themeColor)
    },
    setCurrentPageFlag ({ commit }, currentPageFlag) {
      commit('SET_CURRENT_PAGE_FLAG', currentPageFlag)
    },
    setOpenDashboardId ({ commit }, openDashboardId) {
      commit('SET_OPEN_DASHBOARD_ID', openDashboardId)
    }
  },
  mutations: {
    // 设置或者更新主题
    SET_THEME_COLOR (state, data) {
      // 更新state的属性
      state.themeColor = data
    },
    // 设置当前页面标识
    SET_CURRENT_PAGE_FLAG (state, data) {
      state.currentPageFlag = data
    },
    // 设置打开的仪表板id
    SET_OPEN_DASHBOARD_ID (state, data) {
      state.openDashboardId = data
    }
  }
}

export default dashboard

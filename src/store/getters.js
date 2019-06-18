const getters = {
  themeColor: state => state.dashboard.themeColor,
  currentPageFlag: state => state.dashboard.currentPageFlag,
  openDashboardId: state => state.dashboard.openDashboardId,
  isLogin: state => state.loginStore.isLogin,
  menu: state => state.loginStore.menu,
  token: state => state.loginStore.token,
  loginInfo: state => state.loginStore.loginInfo,
  menus: state => state.permissionStore.menus
}

export default getters

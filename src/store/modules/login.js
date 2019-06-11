const loginStore = {
  state: {
    // 是否登录
    isLogin: false,
    // 获取的菜单
    menu: [],
    // 现有的权限
    token: '',
    // 登陆信息
    loginInfo: {}
  },

  actions: {
    Login ({ commit }, loginInfo) {
      commit(LOGIN, loginInfo)
    }
  },

  mutations: {
    // 设置用户信息
    LOGIN (state, data) {
      state.loginInfo = data
    },
    SET_USER_TOKEN (state, data) {
      state.token = data
    }
  }
}

export default loginStore

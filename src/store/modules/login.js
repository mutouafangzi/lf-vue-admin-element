import mutations from '../mutations'
import actions from '../actions'
import getters from '../getters'

const state = {
  // 是否登录
  isLogin: false,
  // 获取的菜单
  menu:[],
  // 现有的权限
  token: '',
  // 登陆信息
  loginInfo: {}
}

export default {
  state,
  getters,
  actions,
  mutations
}
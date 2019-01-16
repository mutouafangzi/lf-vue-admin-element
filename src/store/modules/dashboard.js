import mutations from '../mutations'
import actions from '../actions'
import getters from '../getters'

const state = {
  // 当前主题
  themeColor: '',
  // 页面标识: dashboard & 其他
  currentPageFlag: '',
  // 仪表板管理中需要被打开的id
  openDashboardId: ''
}

export default {
  state,
  getters,
  actions,
  mutations
}

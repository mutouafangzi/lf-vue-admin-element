const getters = {
  //侧边菜单
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.user.visitedViews,
  //头像
  avatar: state => state.user.avater,
  name: state => state.user.name,
  roles: state => state.user.roles
}
export default getters

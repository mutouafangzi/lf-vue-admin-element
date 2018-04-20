import Cookies from 'js-cookie';

const app = {
  state:{
    //侧边栏关闭和打开的状态
    sidebar:{
      /* cookie中sidebarStatus为0时，sidebar.opened为true.
      cookie中sidebarStatus为1时sidebar.opened为false */
      opened: !+ Cookies.get('sidebarStatus')
    },
    
  },
  mutations:{
    // 控制侧边栏的打开与关闭
    //mutation中只写同步方法
    TOGGLE_SIDEBAR: state => {
      /* 如果未设置侧边状态在cookie中，那么就设置cookie设为1 */
      if(state.sidebar.opened){
        Cookies.set('sidebarStatus',1)
      }else{
        /* 如果已经设置侧边状态，此时state.sidebar.opened为false，那么就将cookie中的sidebarStatus设为0 */
        Cookies.set('sidebarStatus',0)
      }
      /* 将state.sidebar.opened取反 */
      //state.sidebar.opened = !state.sidebar.opened
    },
    
  },
  actions: {
    //提交TOGGLE_SIDEBAR方法，变更状态
    ToggleSideBar({commit}){
      commit('TOGGLE_SIDEBAR')
    },
    
  }
}

export default app

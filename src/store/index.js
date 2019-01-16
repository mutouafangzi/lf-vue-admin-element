import Vue from 'vue'
import Vuex from 'vuex'
import dashboard from './modules/dashboard'
// import user from './modules/user'
// import permission from './modules/permission'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dashboard,
    /* app,   
    user */
  },
  getters,
  actions
})

export default store

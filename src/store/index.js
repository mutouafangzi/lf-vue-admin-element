import Vue from 'vue'
import Vuex from 'vuex'
import dashboard from './modules/dashboard'
import user from './modules/user'
import permission from './modules/permission'
import login from './modules/login'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dashboard,
    app,
    user,
    permission,
    login
  },
  getters
})

export default store

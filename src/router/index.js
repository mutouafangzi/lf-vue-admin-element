import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../views/layout/Layout.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      hidden: true
    },
    {
      path: '/',
      name: '首页',
      component: Layout,
    }
  ]
})

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
    //{ path: '/404', component: () => import('@/views/404'), hidden: true },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      name: 'Dashboard',
      hidden: true,
      children: [{
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }]
    }
  ]
})

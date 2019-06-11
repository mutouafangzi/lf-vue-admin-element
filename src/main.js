// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import "./router/permission"

//引入一些css文件
import "normalize.css"
// 引入iconfont文件
import "./assets/iconfont/iconfont.css"
// 引入全局css
import '@/styles/index.scss'

//二维码插件
//import ImgCode from './vendor/imgCode'  
//引入其他的组件
import ElementUI from 'element-ui'
//英语语言
import locale from 'element-ui/lib/locale/lang/en'
// 引入echarts
import echarts from 'echarts'
import "element-ui/lib/theme-chalk/index.css"
// 引入mock
// import "./mock/index.js"
// 引入axios
import axios from 'axios'
import https from './api/request.js'
Vue.prototype.$https = https 

Vue.use(ElementUI, { locale });
Vue.prototype.$echarts = echarts 
//Vue.use(ImgCode)

Vue.config.productionTip = false

let data = window.sessionStorage.getItem('permission')

router.beforeEach((to, from, next) => {
  console.log(data,to.path,from.path)
  if(!data && to.path !== '/login'){
    // 未登录直接访问其他非登录页面时，重定位到登陆页面
    next('/login')
  } else {
    // 已经登录，访问非登录页面时
    if (to.path) {
      next()
    } else {
      next({ path: '/404' })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

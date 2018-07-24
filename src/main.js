// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

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


Vue.use(ElementUI, { locale });
Vue.prototype.$echarts = echarts 
//Vue.use(ImgCode)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

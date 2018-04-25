// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import locale from 'element-ui/lib/locale/lang/en'
import "normalize.css"
import "./assets/iconfont/iconfont.css"
//二维码插件
//import ImgCode from './vendor/imgCode'  

Vue.use(ElementUI, { locale });
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

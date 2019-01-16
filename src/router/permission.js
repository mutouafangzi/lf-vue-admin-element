import router from './index'

router.beforeEach((to, from, next) => {
  // console.log('路由进行改变', to, from)
  next()
})
import axios from "axios"
import {Message,MessageBox} from "element-ui"
import store from "../store"
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 在这个项目中是要加上token
  if(store.getters.token){
    //让每一个请求携带自定义token
    config.headers['X-Token'] = getToken()
  }
  /* 
  const TokenKey = 'Admin-lifang-Token'
  function getToken(){
    return Cookies.get(TokenKey)
  }
  */
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log(error)
  return Promise.reject(error);
});

//响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const res = response.data
  if(res.code !== 20000){
    Message({
      message: res.message,
      type: 'error',
      duration: 5 * 1000
    })
    // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    if(res.code === 50008 || res.code === 50012 || res.code === 50014){
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      })
    }
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default service
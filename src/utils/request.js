import axios from "axios"
import {Message,MessageBox} from "element-ui"
import store from "../store"
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if(store.getters.token){

  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
import Mock from "mockjs"
import {loginAPI, articleAPI, roleAPI} from './data/index.js'
// import loginAPI from './data/index.js'

// console.log('loginAPI', loginAPI, articleAPI, roleAPI)

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 角色相关
Mock.mock(/\/role\/list/, 'get', roleAPI.getList)
Mock.mock(/\/role\/detail/, 'get', roleAPI.getRole)
Mock.mock(/\/role\/create/, 'post', roleAPI.createRole)
Mock.mock(/\/role\/update/, 'post', roleAPI.updateRole)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

export default Mock
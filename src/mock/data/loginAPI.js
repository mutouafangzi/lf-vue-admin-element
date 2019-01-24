var Mock = require('mockjs')
// import { param2Obj } from '@/utils'
// let param2Obj = require('@/utils')

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

const loginAPI = {
  // config可以理解为请求时传入的参数
  loginByUsername: config => {
    console.log('解析config', config)
    const { username } = JSON.parse(config.body)
    return {
      'statusCode': 200,
      'messages': [ '用户登录成功' ],
      'data': userMap[username]
      
    }
  },
  // 获取用户信息
  getUserInfo: config => {
    // 解析url中的token
    const { token } = param2Obj(config.url)
    // token和用户名一样，所以判断是否有这个用户
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}

module.exports = function (app) {
  // 登录相关
  app.post('/api/user/login/param2Obj', function(req, res) {
    res.send(Mock.mock({
      'statusCode': 200,
      'messages': [
        '获取成功'
      ],
      /* 厂商 */
      'data':loginAPI.loginByUsername
    }));
  });
  app.get('/api/user/info', function(req, res) {
    res.send(Mock.mock({
      'statusCode': 200,
      'messages': [
        '获取成功'
      ],
      /* 厂商 */
      'data':loginAPI.getUserInfo
    }));
  });

  app.post('/api/user/logout', function(req, res) {
    res.send(Mock.mock({
      'statusCode': 200,
      'messages': [
        '获取成功'
      ],
      /* 厂商 */
      'data':loginAPI.logout
    }));
  });
}



import { param2Obj } from '@/utils'

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

export default {
  // config可以理解为请求时传入的参数
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
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

var Mock = require('mockjs')

const articleAPI = {}

// 文章相关
Mock.mock('/api/article/list', 'get', articleAPI.getList)
Mock.mock('/api/article/detail', 'get', articleAPI.getArticle)
Mock.mock('/api/article/pv', 'get', articleAPI.getPv)
Mock.mock('/api/article/create', 'post', articleAPI.createArticle)
Mock.mock('/api/article/update', 'post', articleAPI.updateArticle)
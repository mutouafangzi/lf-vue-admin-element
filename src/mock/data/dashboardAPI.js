var Mock = require('mockjs')
module.exports = function (app) {
  // 常用仪表板标签组的获取
  app.get('/api/situation/dashboard/labels/list', function(req, res) {
    res.send(Mock.mock({
      'statusCode': 200,
      'messages': [ '数据获取成功' ],
      'data': [
        {
          'name': '告警仪表板zaizheli',
          'id': 'id1'// 主键
        }, {
          'name': '告警仪表板2',
          'id': 'id2'// 主键
        }, {
          'name': '告警仪表板3',
          'id': 'id3'// 主键
        }, {
          'name': '告警仪表板4',
          'id': 'id4'// 主键
        }
      ]
    }));
  })

  app.post('/api/situation/dashboard/labels/update', function(req, res) {
    res.send(Mock.mock({
      'statusCode': 200,
      'messages': [ '常用仪表板标签组更新成功' ],
      'data': [ ]
    }));
  })
}



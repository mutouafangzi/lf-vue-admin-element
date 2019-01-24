let express = require('express');    //引入express模块
let Mock = require('mockjs');        //引入mock模块

let app = express();                //实例化express

/* 
* 前端页面不通过后台进行访问的话，存在跨域问题，如果需要解决，可以在后台添加跨域请求
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
/**
 * 配置test.action路由
 * @param  {[type]} req  [客户端发过来的请求所带数据]
 * @param  {[type]} res  [服务端的相应对象，可使用res.send返回数据，res.json返回json数据，res.down返回下载文件]
 */
/* app.get('/api/test.action', function(req, res) {
  res.send('hello world');
}); */
let routes = require('./index.js')
console.log('引入', routes, routes(app))
routes(app)
// app.use(express.router(routes))
/**
* 监听9527端口
*/
app.listen('9527',function (err) {
  if(err){
    console.log(err)
    return
  }
  console.log('listening监听 at http://localhost:9527')
});
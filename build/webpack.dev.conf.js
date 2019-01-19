'use strict'
// 开发环境的一个基本配置
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

var port = process.env.PORT || config.dev.port
// body-parser在中间件中对传入的请求体进行解析（response body）
var bodyParser = require('body-parser')
var fs = require('fs')

//  引入模块
consot express = require('express')
// 创建应用对象
var apiServer = express()
apiServer.use(bodyParser.urlencoded({extended: true}))
apiServer.use(bodyParser.json())

var apiRouter = express.Router()
apiRouter.route('/:apiName').all(
  function (req, res) {
    fs.readFile('../src/mock/data/index.js', 'utf8', function (err, data) {
      if (err) throw err
      var data = JSON.parse(data)
      console.log('数据', data)
      if (data[req.params.apiName]) {
        res.json(data[req.params.apiName])  
      }
      else {
        res.send('no such api name')
      }
    })
  }
)

apiServer.use('/api', apiRouter)
apiServer.listen(port+1, function (err) {
  if(err){
    console.log(err)
    return
  }
  console.log('listening监听 at http://localhost:'+(port+1)+ '\n')
})

var jsonServer = require('json-server') //引入文件
var apiServer = jsonServer.create(); //创建服务器
var apiRouter = jsonServer.router('db.json') //引入json 文件 ，这里的地址就是你json文件的地址，我再static下的建立了一个文件夹mock，然后把json文件放在里面
var middlewares = jsonServer.defaults(); //返回JSON服务器使用的中间件。
apiServer.use(middlewares)
apiServer.use('/api',apiRouter)
apiServer.listen( 9527 ,function(err){ //json服务器端口:9527
  if(err){
    console.log(err)
    return
  }
  else
    console.log('JSON Server is 运行')  //json server成功运行会在git bash里面打印出'JSON Server is running'


const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true,
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    //热加载插件
    new webpack.HotModuleReplacementPlugin(),
    //引入jquery后需要的配置
    new webpack.ProvidePlugin({
      $: 'jquery' ,
      'jQuery': 'jquery'
    }),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    //默认情况下中文语言包依旧是被引入的，可以使用 webpack 的 NormalModuleReplacementPlugin 替换默认语言包
    new webpack.NormalModuleReplacementPlugin(/element-ui[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]zh-CN/, 'element-ui/lib/locale/lang/en')
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${config.dev.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

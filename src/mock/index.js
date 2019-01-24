/* export { default as loginAPI } from './data/loginAPI.js'
export { default as articleAPI } from './data/articleAPI.js'
export { default as roleAPI } from './data/roleAPI.js'

export { default as dashboardAPI } from './data/dashboardAPI.js' */

let login = require('./data/loginAPI')
let dashboard = require('./data/dashboardAPI')

module.exports = function (app) {
  login(app)
  dashboard(app)
}
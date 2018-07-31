'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ENV_CONFIG: '"dev"',
    BASE_API: '"https://easy-mock.com/mock/5add7d50fe29a6045d0a7ba1/lf-vue-admin-element"',
})
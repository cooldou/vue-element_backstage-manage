'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://gp-local.cn:9001"'
  // BASE_URL: '"http://v2.api.back.sccitysafety.com"'
})

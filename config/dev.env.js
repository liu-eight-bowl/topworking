/*
 * @Author: liubing 943485115@qq.com
 * @Date: 2022-09-24 16:37:23
 * @LastEditors: liubing 943485115@qq.com
 * @LastEditTime: 2023-03-29 13:36:40
 * @FilePath: /topworking/config/dev.env.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MOCK: true,
})

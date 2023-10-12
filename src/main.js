/*
 * @Author: liubing 943485115@qq.com
 * @Date: 2022-09-24 16:37:23
 * @LastEditors: liubing 943485115@qq.com
 * @LastEditTime: 2023-08-25 16:48:15
 * @FilePath: /vue/topworking/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store.js'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
import axios from 'axios'
import customDirectives from './customDirectives/index'
// 如果是测试环境则引入mock
if (process.env.MOCK) {
  require('@/mock')
}

Vue.prototype.$echarts = echarts
Vue.prototype.$service = axios

Vue.use(ElementUI)
Vue.use(customDirectives)

Vue.config.productionTip = false

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  // 方案1，通过缓存
  let userDataString = localStorage.getItem('userData')
  let userData = null
  let isTimeOver = false
  if (userDataString) {
    userData = JSON.parse(userDataString)
    // token过期时间设置，用于token认证，如果是cookie则不需要
    // isTimeOver = (new Date().getTime() - userData.time) / 1000 / 1000 > 1
    // console.log(isTimeOver, 123)
  }
  // localstorage容错处理，如果不兼容，则正常跳转
  if (!window.localStorage) {
    next()
  }
  /**
   * 1 如果没有登陆，并且不在登录页的时候则跳转到登陆页
   * 2 如果是登陆情况下，页面在登录页的时候，则跳转到首页
   * 3 如果是登陆了，不在登陆页，则直接进入页面
   */
  if ((!userDataString && to.path !== '/login')) {
    next('/login')
  } else if (userDataString && to.path === '/login') {
    next('/')
  } else {
    next()
  }
  window.document.title = to.meta.title
  console.log(userData, isTimeOver)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

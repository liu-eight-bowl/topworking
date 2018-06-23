// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)

Vue.config.productionTip = false

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  let userDataString = localStorage.getItem('userData')
  let userData = null
  let isTimeOver = false
  if (userDataString) {
    userData = JSON.parse(userDataString)
    // token过期时间设置，用于token认证，如果是cookie则不需要
    isTimeOver = (new Date().getTime() - userData.time) / 1000 / 1000 > 1
    console.log(isTimeOver)
  }
  // localstorage容错处理，如果不兼容，则正常跳转
  if (!window.localStorage) {
    next()
  }
  if ((!userDataString && to.path !== '/login')) {
    next('/login')
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

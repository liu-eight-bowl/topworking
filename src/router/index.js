/*
 * @Author: liubing 943485115@qq.com
 * @Date: 2022-09-24 16:37:23
 * @LastEditors: liubing 943485115@qq.com
 * @LastEditTime: 2023-08-25 10:11:14
 * @FilePath: /vue/topworking/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'dashboard'
    },
    {
      path: '/login',
      component: () => import('@/components/pages/Login.vue'),
      meta: { title: '登录页' }
    },
    {
      path: '/404',
      component: () => import('@/components/pages/404.vue'),
      meta: { title: '404' }
    },
    {
      path: '/',
      component: () => import('@/components/pages/Home.vue'),
      meta: { title: '系统首页' },
      children: [
        {
          path: '/dashboard',
          component: () => import('@/components/pages/Cdashboard.vue'),
          meta: { title: '系统首页' }
        },
        {
          path: '/table',
          component: () => import('@/components/pages/Ctable/index.vue'),
          meta: { title: '表格数据' }
        },
        {
          path: '/tabs',
          component: () => import('@/components/pages/Ctabs.vue'),
          meta: { title: '选项卡' }
        },
        {
          path: '/form',
          component: () => import('@/components/pages/Cform.vue'),
          meta: { title: '表单提交' }
        },
        {
          path: '/chart',
          component: () => import('@/components/pages/Cchart.vue'),
          meta: { title: '图表组件' }
        },
        {
          path: '/CwechatMobile',
          component: () => import('@/components/pages/CwechatMobile.vue'),
          meta: { title: '微信手机模型' }
        },
        {
          path: '/list',
          component: () => import('@/components/pages/Clist.vue'),
          meta: { title: '产品树' }
        }
      ]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

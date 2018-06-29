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
          component: () => import('@/components/pages/Ctable.vue'),
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
          meta: { title: '图表展示' }
        },
        {
          path: '/list',
          component: () => import('@/components/pages/Clist.vue'),
          meta: { title: '列表信息' }
        }
      ]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

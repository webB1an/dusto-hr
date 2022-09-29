import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout'
import Todo from '@/views/layout/todo'
import Guide from '@/views/guide'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/todo',
      children: [
        {
          path: 'todo',
          name: 'Todo',
          component: Todo
        },
        {
          path: 'my',
          name: 'My',
          component: () => import('@/views/layout/my')
        }
      ]
    },
    {
      path: '/guide',
      name: 'Guide',
      component: Guide
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login')
    }
  ]
})

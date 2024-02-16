import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 前台路由
    {
      path: '/',
      component: () => import('../views/FrontView.vue'),
      // 巢狀路由：子路由不用加斜線
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: 'products',
          component: () => import('../views/ProductsView.vue')
        },
        {
          path: 'cart',
          component: () => import('../views/CartView.vue')
        }
      ]
    },
    // 後台路由
    {
      path: '/admin',
      component: () => import('../views/dashboard/DashboardView.vue'),
      // 巢狀路由：子路由不用加斜線
      children: [
        {
          path: 'products',
          component: () => import('../views/dashboard/ProductsView.vue')
        },
        {
          path: 'order',
          component: () => import('../views/dashboard/OrderView.vue')
        }
      ]
    },
    // 登入路由
    {
      path: '/login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/AdminLogin.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/dashboard/AdminDashboard.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/dashboard/AdminProducts.vue')
        },
        {
          path: 'orders',
          component: () => import('../views/dashboard/AdminOrders.vue')
        }
      ]
    }
  ]
})

export default router

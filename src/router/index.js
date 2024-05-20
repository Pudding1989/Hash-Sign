import { createRouter, createWebHistory } from 'vue-router'
import HashSignView from '@/views/HashSignView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HashSignView
    },
    {
      path: '/drop-down',
      name: 'drop-down',
      component: () => import('@/views/DropDownView.vue')
    },
  ]
})

export default router

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
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/app/Home.vue'
import Login from '@/pages/auth/Login.vue'
import NotFound from '@/pages/error/NotFound.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

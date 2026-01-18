import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/app/Home.vue'
import Login from '@/pages/auth/Login.vue'
import NotFound from '@/pages/error/NotFound.vue'
import Register from '@/pages/auth/Register.vue'
import LandingPage from '@/pages/LandingPage.vue'

const routes = [
  {
    path: '/',
    component: LandingPage
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/app',
    component: Home,
    meta: {
      requiresAuth: true
    }
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router

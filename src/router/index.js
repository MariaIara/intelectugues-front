import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/app/Home.vue'
import Login from '@/pages/auth/Login.vue'
import NotFound from '@/pages/error/NotFound.vue'
import Register from '@/pages/auth/Register.vue'
import LandingPage from '@/pages/LandingPage.vue'
import TrackPage from '@/pages/app/TrackPage.vue'
import ChallengePage from '@/pages/app/ChallengePage.vue'
import Profile from '@/pages/app/Profile.vue'
import RankingPage from '@/pages/app/RankingPage.vue'

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
    path: '/profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ranking',
    component: RankingPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/app/track/:id',
    component: TrackPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/app/challenge/:id',
    component: ChallengePage,
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

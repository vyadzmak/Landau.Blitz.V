import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Dashboard from '@/components/dashboard/Dashboard'
import Login from '@/components/login/Login'
import Users from '@/components/users/Users'
import UserInfo from '@/components/userInfo/UserInfo'
import Log from '@/components/log/Log'
import store from '../store/index'

Vue.use(Router)

function requireAuth (to, from, next) {
  return store.state.userData
}

const router = new Router({
  routes: [{
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    exact: true,
    redirect: to => {
      // put some code here to detect user's start page according user mapping
      return {path: '/users'}
    },
    children: [{
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/userInfo/:id',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/log',
      name: 'Log',
      component: Log
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    redirect: {path: '/'}
  }]
})

router.beforeEach((to, from, next) => {
  if (requireAuth(to, from, next) != null || to.name === 'Login') {
    next()
  } else {
    next({ path: '/login' })
  }
})

export default router

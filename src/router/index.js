import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard/Dashboard'
import Login from '@/components/login/Login'
import Users from '@/components/users/Users'
import Companies from '@/components/companies/Companies'
import Projects from '@/components/projects/Projects'
import Project from '@/components/project/Project'
import Settings from '@/components/settings/Settings'
import Log from '@/components/log/Log'
import store from '../store/index'

Vue.use(Router)

function requireAuth (to, from, next) {
  let found = false
  if (store.state.userData) {
    let userRoutes = []
    switch (store.state.userData.UserRoleId) {
      case 1: userRoutes = ['Dashboard', 'Users', 'Companies', 'Projects', 'Settings', 'Log', 'Project']
        break
      case 2:
      case 3: userRoutes = ['Dashboard', 'Users', 'Companies', 'Projects', 'Project']
        break
      default: break
    }
    found = userRoutes.indexOf(to.name) !== -1
  }
  return found
}

const router = new Router({
  routes: [{
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    exact: true,
    redirect: to => {
      let rPath = ''
      switch (store.state.userData ? store.state.userData.UserRoleId : 0) {
        case 1:
        case 2:
        case 3:
          rPath = '/companies'
          break
        default:
          rPath = '/login'
          break
      }
      return {path: rPath}
    },
    children: [{
      path: '/users/:id',
      name: 'Users',
      component: Users
    },
    {
      path: '/companies',
      name: 'Companies',
      component: Companies
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/project/:id',
      name: 'Project',
      component: Project
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
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
  if (requireAuth(to, from, next) || to.name === 'Login') {
    next()
  } else {
    next({ path: '/login' })
  }
})

export default router

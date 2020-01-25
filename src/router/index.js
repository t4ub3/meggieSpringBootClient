import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../components/LoginPage'
import OverviewPage from '../components/OverviewPage'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'overview', component: OverviewPage },
  { path: '/login', name: 'login', component: LoginPage }
]

export const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  // try to access a restricted page + not logged in
  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

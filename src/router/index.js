import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/welcome.vue'
import User from '../components/user/user.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: login },
  //  重定向到login
  { path: '/', redirect: '/login' },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: User }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token ，查看是否登录
  const logintoken = window.sessionStorage.getItem('token')
  if (!logintoken) return next('/login')
  next()
})

export default router

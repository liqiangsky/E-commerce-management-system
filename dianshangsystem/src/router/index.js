import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Welcome from '../components/Welcome'
import Users from '../components/Users'
import Roles from '../components/Roles'

//防止重复点击路由出错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: Login, component: () => import('@/views/Login.vue') },
  {
    path: '/home', redirect: '/welcome', name: Home, component: () => import('@/views/Home.vue'),
    children: [
      { path: '/welcome', name: Welcome, component: () => import('@/components/Welcome.vue') },
      { path: '/users', name: Users, component: () => import('@/components/Users.vue') },
      { path: '/roles', name: Roles, component: () => import('@/components/Roles.vue') }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})
//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const token = sessionStorage.token;
  if (!token) return next('/login');
  next();
})
export default router

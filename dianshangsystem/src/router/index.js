import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Welcome from '../views/Welcome'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: Login, component: ()=> import('@/views/Login.vue') },
  { path: '/welcome', name: Welcome, component: ()=> import('@/views/Welcome.vue') }
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

export default router

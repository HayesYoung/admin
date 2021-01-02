import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/pageUpdate',
    name: 'PageUpdate',
    component: () => import('../views/Management/PageUpdate.vue')
  },
  {
    path: '/',
    name: 'About',
    component: () => import('../views/Management.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;

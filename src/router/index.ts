import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home-page" */ '@/pages/HomePage.vue')
    },
    {
      path: '/persons',
      name: 'persons',
      component: () => import(/* webpackChunkName: "persons-page" */ '@/pages/PersonsPage.vue')
    }
  ]
})

export default router

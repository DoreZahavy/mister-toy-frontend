import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ToyIndex from '../views/ToyIndex.vue'
import ToyEdit from '../views/ToyEdit.vue'
import ToyDetails from '../views/ToyDetails.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/toy',
      name: 'toy',
      component: ToyIndex
    },
    {
      path: '/toy/:toyId',
      name: 'toyDetails',
      component: ToyDetails
    },
    {
      path: '/toy/edit/:toyId?',
      name: 'toyEdit',
      component: ToyEdit
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

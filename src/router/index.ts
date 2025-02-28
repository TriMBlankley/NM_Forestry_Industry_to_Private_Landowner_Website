import { createRouter, createWebHistory } from 'vue-router'
import MapFilterView from '@/views/MapFilterView.vue'

const router = createRouter({
  
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MapFilterView,
    },
  ],
})

export default router

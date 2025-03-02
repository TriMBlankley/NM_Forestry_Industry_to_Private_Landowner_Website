import { createRouter, createWebHistory } from 'vue-router'

import MainMapSearch from '@/views/MainMapSearch.vue'
import LandownerSurvey from '@/views/LandownerSurvey.vue'
import IndustrySurvey from '@/views/IndustrySurvey.vue'

const router = createRouter({
  
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainMapSearch,
    },
    {
      path: '/LandownerSurvey',
      name: 'Landowner Survey',
      component: LandownerSurvey
    },
    {
      path: '/IndustrySurvey',
      name: 'Industry Survey',
      component: IndustrySurvey
    }
  ],
})

export default router

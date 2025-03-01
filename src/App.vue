<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import SiteBanner from './components/SiteBanner.vue'
import MapFilterView from './views/MapFilterView.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="main-body">
    <SiteBanner />
    <MapFilterView />
    <Footer />
  </div>
</template>

<style scoped>
.main-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  overscroll-behavior: none;

  
  min-height: 100vh;
  width: 100vw;
  box-sizing: border-box;
}

@media (min-width: 1024px) {
  nav {
    text-align: left;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

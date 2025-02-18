<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import TopBanner from './views/TopBanner.vue'
import MapFilterView from './views/MapFilterView.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <body>
    <TopBanner />
    <MapFilterView />
    <Footer />
  </body>
</template>

<style scoped>
body {
  display: flex;
  flex-direction: column;
  
}

@media (min-width: 1024px) {

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import leafletTest from './components/leafletTest.vue'
import Footer from './components/Footer.vue'
import MapFilterView from './views/MapFilterView.vue'
</script>

<template>
  <body>
    <MapFilterView />
  </body>
</template>

<style scoped>


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

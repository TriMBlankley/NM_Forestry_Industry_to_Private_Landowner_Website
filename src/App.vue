<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue'
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import SiteBanner from './components/SiteBanner.vue'
import MapFilterView from './views/MapFilterView.vue'
import Footer from './components/Footer.vue'

const userInputAdress = ref('');
</script>

<template>
  <body>
    <SiteBanner />
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

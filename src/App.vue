<script setup lang="ts">
// Vue.js Imports
import { ref } from 'vue';
import { RouterView } from 'vue-router'

// Component Imports
import SiteBanner from './components/SiteBanner.vue'
import Footer from './components/Footer.vue'

const showMap = ref(true);

const handleToggleView = () => {
    showMap.value = !showMap.value;
};
</script>

<template>
  <div class="main">
    <SiteBanner :showMap="showMap" @toggleView="handleToggleView" />
    
    <!-- router-view is a built-in component, that looks at /src/router/index.ts, and determines
     the correct view to display based on where in the site the user is -->
    <RouterView v-slot="{ Component }">
      <component :is="Component" :showMap="showMap" />
    </RouterView>

    <Footer />
  </div>
</template>

<style scoped>

.main {
  /* Size */
  min-height: 100vh;
  width: 100vw;

  /* Display Settings */ 
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  /* Content Positioning */
  justify-content: space-between;

  /* Behaviour */
  overflow: hidden;
  overscroll-behavior: none;
}

@media (min-width: 1024px) {
  nav {
    /* Font */
    font-size: 1rem;

    /* Content Positioning */
    text-align: left;
    padding: 1rem 0;
  }
}
</style>

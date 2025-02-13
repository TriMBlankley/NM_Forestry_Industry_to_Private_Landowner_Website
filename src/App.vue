<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import leafletTest from './components/leafletTest.vue'
import Footer from './components/Footer.vue';
</script>

<template>
  <body>
    <div class ="map-holder">
      <leafletTest class="map"/>
    </div>

    <Footer />
  </body>
  
  
</template>

<style scoped>

.map-holder {
  position: absolute;
  top: 50%;
  left: 5%;
  width: 40%;
  height: 70%;
  transform: translateY(-50%);
}

.map{
  width: 100%;
  height: 100%;
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

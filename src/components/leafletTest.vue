<script setup lang="ts">
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { ref, onMounted } from 'vue' //Reactive type in vue

const map = ref(null)
onMounted(() => {

    let inMap = L.map(map.value!).setView([34.063281, -106.905829], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(inMap);

});
    
</script>

<template>
    <div ref="map"></div>
</template>

<style scoped>
    #map { height: 180px; }
</style>


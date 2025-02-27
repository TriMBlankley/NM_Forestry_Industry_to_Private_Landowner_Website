<script setup lang="ts">
import { ref, onMounted } from 'vue' //Reactive type in vue

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'


interface Props {
    adress: string;
}

const props = defineProps<Props>();

const map = ref(null)
onMounted(() => {

    let inMap = L.map(map.value!).setView([34.063281, -106.905829], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(inMap);

    var marker = L.marker([34.063281, -106.905829]).addTo(inMap);
});
    
</script>

<template>
    <div ref="map"></div>
    
</template>

<style scoped>
#map { 
    height: 100px; 
    position: absolute; 
    z-index: 1; 
}

.map-search {
    position: absolute;
    z-index: 2;

}

</style>
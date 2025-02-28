<script setup lang="ts">
import { ref, onMounted } from 'vue' //Reactive type in vue

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'


interface Props {
    adress: string;
}

const props = defineProps<Props>();


// This swaps out the defaut blue leaflet pin to the custom orange one
//
//It needs a icon, and a shadow that can be svg's or png's
var nmfIcon = L.icon({
    iconUrl: './src/assets/Graphics/nmfMarker.svg',
    shadowUrl: './src/assets/Graphics/nmfPinShadow.svg',

    iconSize:     [30, 90], // size of the icon
    shadowSize:   [40, 30], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [17, 61],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const map = ref(null)
onMounted(() => {

    let inMap = L.map(map.value!).setView([34.063281, -106.905829], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(inMap);

    var marker = L.marker([34.063281, -106.905829], {icon: nmfIcon}).addTo(inMap);
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
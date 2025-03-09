<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Leaflet, the api connecting to OpenStreetMap
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import SearchIcon from "../assets/Graphics/SearchIcon.svg"


const map = ref<HTMLElement | null>(null);
const searchQuery = ref('');
const marker = ref<L.Marker | null>(null);
let leafletMap: L.Map | null = null;

// Custom icon setup
const nmfIcon = L.icon({
    iconUrl: './src/assets/Graphics/nmfMarker.svg',
    shadowUrl: './src/assets/Graphics/nmfPinShadow.svg',
    iconSize: [30, 90],
    shadowSize: [40, 30],
    iconAnchor: [22, 94],
    shadowAnchor: [17, 61],
    popupAnchor: [-3, -76]
});

onMounted(() => {
    leafletMap = L.map(map.value!).setView([34.063281, -106.905829], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(leafletMap);
});

const searchLocation = async () => {
    if (!searchQuery.value) return;

    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}`);
        if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            leafletMap?.setView([parseFloat(lat), parseFloat(lon)], 13);
            if (marker.value) {
                marker.value.setLatLng([parseFloat(lat), parseFloat(lon)]).bindPopup(searchQuery.value).openPopup();
            } else {
                marker.value = L.marker([parseFloat(lat), parseFloat(lon)], { icon: nmfIcon }).addTo(leafletMap).bindPopup(searchQuery.value).openPopup();
            }
        }
    } catch (error) {
        console.error('Error fetching location:', error);
    }
};
</script>

<template>
    <div style="position: relative;">
        <div ref="map" id="map"></div>
        <div class="map-search">
            <input v-model="searchQuery" placeholder="Enter Town or City" @keyup.enter="searchLocation" />
            <button @click="searchLocation">
                <SearchIcon alt="Search" style="height:1.5em"/>
            </button>
        </div>

    </div>
</template>

<style scoped>
#map {

  position: absolute;
  z-index: 1;
  inset: 0; /* Expands to fill the entire parent */
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-search {
  position: absolute;
  z-index: 99;
  top: 0;
  right: 0;
  padding: 4px 4px;

  display: flex;
  flex-direction: row;
  align-items: center;
}

input {
    padding: 5px;
    margin-right: 5px;
}

button {
    border: none;
    cursor: pointer;
    background: none;
}
</style>

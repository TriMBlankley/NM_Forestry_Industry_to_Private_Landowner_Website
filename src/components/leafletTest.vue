<script setup lang="ts">
import { ref, watch, onMounted, defineProps } from 'vue';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Business } from '../business-information';

// Define the props to accept businesses from the parent
const props = defineProps<{ businesses: Business[] }>();

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

const map = ref<HTMLElement | null>(null);
let leafletMap: L.Map | null = null;
const marker = ref<L.Marker | null>(null);
const searchQuery = ref('');

// Initialize the map
onMounted(() => {
    leafletMap = L.map(map.value!).setView([34.063281, -106.905829], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(leafletMap);
});

// Watch props.businesses and update markers on the map
watch(() => props.businesses, (newFilteredBusinesses) => {
  if (leafletMap) {
    // Remove existing markers
    leafletMap.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        leafletMap.removeLayer(layer);
      }
    });

    // Add new markers for each filtered business
    newFilteredBusinesses.forEach((business) => {
        if (business.latitude && business.longitude) {
        // Start the popup content with the business name
        let popupContent = `${business.bus_name}`;

        // Conditionally add the website if it exists
        if (business.website) {
        popupContent += `<br> Website: <a href="${business.website}" target="_blank">${business.website}</a>`;
        }

        // Conditionally add the phone number if it exists
        if (business.phone_num) {
        popupContent += `<br> Phone: ${business.phone_num}`;
        }

        // Conditionally add the address, city, and zip if they exist
        const addressContent = [business.address, business.city, business.zip]
        .filter(Boolean)  // Remove falsy values
        .join(', ');  // Join remaining values with commas

        // Add the combined address content if it's not empty
        if (addressContent) {
        popupContent += `<br> Address: ${addressContent}`;
        }

        // Create the marker and bind the popup content
        L.marker([business.latitude, business.longitude], { icon: nmfIcon })
        .addTo(leafletMap)
        .bindPopup(popupContent);
        }
    });
  }
});

// Function to search for a location (does not interfere with the filtered business pins)
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
        <SearchIcon alt="Search" style="height: 1.5em" />
      </button>
    </div>
  </div>
</template>

<style scoped>
#map {
  position: absolute;
  z-index: 1;
  inset: 0;
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



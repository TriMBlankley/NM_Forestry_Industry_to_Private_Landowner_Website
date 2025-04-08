<script setup lang="ts">
import { ref, watch, onMounted, defineProps, defineEmits } from 'vue';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Business } from '../business-information';

// Define the props to accept businesses from the parent
const businessWithMarkers = ref<Business[]>([]);
const props = defineProps<{
  businesses: Business[];
  selectedPosition: { lat: number; lon: number } | null;
}>();
const emit = defineEmits(['update:businessWithMarkers']);
watch(businessWithMarkers, (newbusinessWithMarkers) => {
  emit('update:businessWithMarkers', newbusinessWithMarkers);
});

// Custom icon setup
const nmfIcon = L.icon({
  iconUrl: './src/assets/Graphics/nmfMarker.svg',
  shadowUrl: './src/assets/Graphics/nmfMarkerShadow.svg',
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

// Function to calculate the distance between two points using Haversine formula (in kilometers)
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

// Function to filter businesses based on the radius from a given location
function filterBusinessesByRadius(lat: number, lon: number) {
  return props.businesses.filter((business) => {
    if (!business.latitude || !business.longitude || !business.work_radius) return false;

    // Convert work_radius from miles to kilometers (1 mile = 1.60934 kilometers)
    const workRadiusKm = business.work_radius * 1.60934;

    // Calculate the distance from the search location to the business location
    const distance = getDistance(lat, lon, business.latitude, business.longitude);
    return distance <= workRadiusKm; // Return true if within the business's work radius
  });
}

// Function to update map markers based on filtered businesses
function updateMapMarkers(filteredBusinessess: Business[]) {
  if (leafletMap) {
    // Remove existing markers
    leafletMap.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        leafletMap.removeLayer(layer);
      }
    });

    const businessesWithMarkers: Business[] = [];
    console.log('Businesses with markers:', businessesWithMarkers);

    // Add new markers for each business
    filteredBusinessess.forEach((business) => {
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

        businessesWithMarkers.push(business);
        // Create the marker and bind the popup content
        L.marker([business.latitude, business.longitude], { icon: nmfIcon })
          .addTo(leafletMap)
          .bindPopup(popupContent);
      }
    });

    // Update the businessWithMarkers reactive reference and emit the changes
    businessWithMarkers.value = businessesWithMarkers;
    emit('update:businessWithMarkers', businessesWithMarkers);
    console.log('Emitted businesses with markers:', businessesWithMarkers);
  }
}

// Initialize the map
onMounted(() => {
  leafletMap = L.map(map.value!).setView([34.063281, -106.905829], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(leafletMap);

  if (props.businesses && props.businesses.length > 0) {
    updateMapMarkers(props.businesses); // This will add all the markers for the businesses
  } else {
    console.warn('No businesses available to display markers');
  }
});

// Function to search for a location (does not interfere with the filtered business pins)
const searchLocation = async () => {
  if (!searchQuery.value) {
    // If searchQuery is empty, show all businesses
    updateMapMarkers(props.businesses);
    console.log("Shit")
    return; // Exit the function early
  }
    console.log(searchQuery.value)
  try {
    console.log("Testing")
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value} New Mexico`);
    console.log("Got past response:")
    console.log(response)
    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      leafletMap?.setView([parseFloat(lat), parseFloat(lon)], 13);
      if (marker.value) {
        marker.value.setLatLng([parseFloat(lat), parseFloat(lon)]).bindPopup(searchQuery.value).openPopup();
      } else {
        marker.value = L.marker([parseFloat(lat), parseFloat(lon)], { icon: nmfIcon }).addTo(leafletMap).bindPopup(searchQuery.value).openPopup();
      }

      // Filter businesses based on the search location
      const filteredBusinesses = filterBusinessesByRadius(parseFloat(lat), parseFloat(lon));
      updateMapMarkers(filteredBusinesses);
    }
  } catch (error) {
    console.error('Error fetching location:', error);
  }
};

// Watch for changes in props.businesses to update the map when the businesses change
watch(() => props.businesses, (newBusinesses) => {
  if (leafletMap) {
    updateMapMarkers(newBusinesses);  // Update markers when businesses change
  }
});

watch(() => props.selectedPosition, (newPosition) => {
  if (leafletMap && newPosition) {
    leafletMap.setView([newPosition.lat, newPosition.lon], 13); // Update the map view based on the new position
    filterBusinessesByRadius(newPosition.lat, newPosition.lon); // Filter businesses by new position
  }
});
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






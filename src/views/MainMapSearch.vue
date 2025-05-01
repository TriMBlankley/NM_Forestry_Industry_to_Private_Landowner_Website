<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import axios from 'axios';
import Leaflet from '../components/Leaflet.vue';
import BusinessList from '../components/BusinessList.vue';
import FilterAndSearch from '../components/FilterAndSearch.vue';
import type { Business } from '../business-information';

const filteredBusinesses = ref<Business[]>([]);
const businessWithMarkers = ref<Business[]>([]);
const businesses = ref<Business[]>([]);
const error = ref<string | null>(null);
const selectedPosition = ref<{ lat: number; lon: number } | null>(null);
const isMobile = ref(window.innerWidth <= 768);

// Update mobile detection on window resize
const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  fetchBusinesses();
  window.addEventListener('resize', handleResize);
});

// Cleanup event listener
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// Fetch businesses from API
const fetchBusinesses = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/data');
        businesses.value = response.data;
        error.value = null;
    } catch (err) {
        error.value = 'Error! Could not get businesses!';
    }
};

// Handle business selection to update position
const handleBusinessSelected = (position: { lat: number; lon: number }) => {
    selectedPosition.value = position;
};

// Watch businessWithMarkers for any changes and log it
watch(businessWithMarkers, (newbusinessWithMarkers) => {
  console.log('Updated businesses from Leaflet:', newbusinessWithMarkers);
}, { immediate: true });

// Define props
const props = defineProps({
    showMap: {
        type: Boolean,
        required: true
    }
});

</script>

<template>
    <div class="map-layout">
        <template v-if="!isMobile">
            <div class="map-holder">

                <!-- Pass filteredBusinesses and bind businessWithMarkers using v-model -->
                <Leaflet :businesses="filteredBusinesses" :selectedPosition="selectedPosition" v-model:businessWithMarkers="businessWithMarkers" class="map" ref="leafletRef" />
            </div>

            <!-- Business holder: Pass the businessWithMarkers to BusinessTest -->
            <div class="business-holder">
                <BusinessList :error="error" :businesses="businessWithMarkers" @businessSelected="handleBusinessSelected"/>
            </div>

            <!-- Filter holder: Pass businesses to FilterAndSearch -->
            <div class="filter-holder">
                <FilterAndSearch :businesses="businesses" v-model:filteredBusinesses="filteredBusinesses"/>
            </div>
        </template>


        <!-- Mobile Layout ---------------------------->
        <template v-else>
            <div v-if="props.showMap" class="map-holder mobile-map-holder">
                <Leaflet 
                    :businesses="filteredBusinesses" 
                    :selectedPosition="selectedPosition" 
                    v-model:businessWithMarkers="businessWithMarkers" 
                    class="map" 
                    ref="leafletRef" 
                />
            </div>
            <div v-else class="business-holder mobile-business-holder">
                <BusinessList :error="error" :businesses="businessWithMarkers" @businessSelected="handleBusinessSelected"/>
            </div>

            <div class="filter-holder">
                <FilterAndSearch :businesses="businesses" v-model:filteredBusinesses="filteredBusinesses"/>
            </div>
        </template>
    </div><!-- end map layout-->
</template>



<style scoped>
/* MAIN (map layout) CSS --------- -----------------------------*/
.map-layout {
    width: 100%;
    height: 80vh;

    margin: 1em 0;
    
    display: flex;
    flex-direction: row;

    justify-content: space-between;

    box-sizing: border-box;
}

/* map css -----------------------------*/
.map-holder {
    margin: 0 1em;
    height: 100%;
    width: 65vw;

    overflow: hidden;

    border: 5px solid var(--nmf-ge-separator);
    background-color: var(--nmf-ge-separator);
    border-radius: 5px;

    /*      top, left&right bottom */
    margin: 0 1em 0;

    box-sizing: border-box;
}


.map {
    z-index: 10;
    width: 100%;
    height: 100%;    
}

.map-search {
    z-index: 20;
    position: absolute;
    top: 0;
    left: 0;

    height: 28px;

    width: 250px;

    font-size: 14px;
    line-height: 7px;
}

/* buisness holder css -----------------------------*/
.business-holder {
    display: flex;
    flex-direction: column;

    box-sizing: border-box;
}


/* filter holder css -----------------------------*/
.filter-holder {
    box-sizing: border-box;
}

/* Mobile specific styles */
@media (max-width: 768px) {
    .map-layout {
        flex-direction: column;
        height: auto;
    }

    .mobile-map-holder,
    .mobile-business-holder {
        width: 100%;
        height: 60vh;
        margin: 1em 0;
    }

    .filter-holder {
        width: 100%;
        order: -1; /* Move filter to top */
    }
}
</style>
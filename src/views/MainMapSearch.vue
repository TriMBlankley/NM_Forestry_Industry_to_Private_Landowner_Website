<script setup lang="ts">
// Vue.js Imports
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

// Component Imports
import Leaflet from '../components/Leaflet.vue';
import BusinessTest from '../components/BusinessTest.vue';
import FilterAndSearch from '../components/FilterAndSearch.vue';

import type { Business } from '../business-information';

const filteredBusinesses = ref<Business[]>([]);
const businesses = ref<Business[]>([]);
const error = ref<string | null>(null);
    const selectedPosition = ref<{ lat: number; lon: number } | null>(null);

// gets businesses
const fetchBusinesses = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/data');
        businesses.value = response.data;
        error.value = null;
    } catch (err) {
        error.value = 'Error! Could not get businesses!';
    }
};

onMounted(() => {
    fetchBusinesses();
});

const handleBusinessSelected = (position: { lat: number; lon: number }) => {
    selectedPosition.value = position; // Store the selected position
};
</script>

<template>
    <div class="map-layout">
        <div class="map-holder">

            <!-- The buisnesses tag is the prop that passes the values to the child component to let pins appear on the map-->
            <Leaflet :businesses="filteredBusinesses" :selectedPosition="selectedPosition" class="map" ref="leafletRef" />

            <!--<div class="map-search">
                <input class="map-search" type="text" v-model="userInputAdress" placeholder="Local adress">
            </div>-->
        </div>

        <!-- buisness holder ---------------->
        <div class="business-holder">
            <BusinessTest :businesses="filteredBusinesses" @businessSelected="handleBusinessSelected"/>
        </div>

        <!-- filter holder ---------------->
        <div class="filter-holder">
            <FilterAndSearch :businesses="businesses" v-model:filteredBusinesses="filteredBusinesses"/>
        </div>
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
</style>
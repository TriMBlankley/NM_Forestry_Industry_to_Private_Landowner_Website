<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

import leafletTest from '../components/leafletTest.vue';
import BusinessTest from '../components/BusinessTest.vue';
import FilterAndSearch from '../components/FilterAndSearch.vue';
import type { Business } from '../business-information';

const userInputAdress = ref<string>('');

const businesses = ref<Business[]>([]);
const error = ref<string | null>(null);

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
</script>

<template>
    <div class="map-layout">
        <div class="map-holder">

            <!-- The message tag is the prop that passes the value to the child component-->
            <leafletTest :adress="userInputAdress" :businesses="businesses" class="map" />

            <!--<div class="map-search">
                <input class="map-search" type="text" v-model="userInputAdress" placeholder="Local adress">
            </div>-->
        </div>

        <!-- buisness holder ---------------->
        <div class="business-holder">
            <BusinessTest :businesses="businesses" />
        </div>
        <!-- <div class="business-holder" style="background-color: purple">
            <p style="width: 100px;"></p>
        </div> -->

        <!-- filter holder ---------------->
        <div class="filter-holder">
            <FilterAndSearch />
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
<script setup lang="ts">
import leafletTest from '../components/leafletTest.vue';
import BusinessTest from '../components/BusinessTest.vue';
import FilterAndSearch from '../components/FilterAndSearch.vue';
import type { Business } from '../business-information';
import { ref, onMounted } from 'vue';
import axios from 'axios';

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
            <leafletTest :businesses="businesses" class="map"/>
        </div>
        <div class ="business-holder">
            <BusinessTest :businesses="businesses"/>
        </div>
        <div class ="filter-holder">
            <FilterAndSearch />
        </div>
    </div>
</template>

<style scoped>
.map-holder {
  width: 60%;
  height: 100%;
  display: flex;
  border: 5px solid var(--nmf-ge-separator);
  top:0;
  left:0;
  overflow: hidden;
}

.map{
    width: 100%;
    height: 100%;
    border-radius: 3px;
}


.business-holder{
    border: 5px solid var(--nmf-ge-separator);
    background-color: var(--nmf-bk-backroundMain);
    border-radius: 5px;
    display: flex;
}

.filter-holder{
    border: 5px solid var(--nmf-ge-separator);
    background-color: var(--nmf-bk-backroundMain);
    border-radius: 5px;
}


.map-layout{
    position: absolute;
    top: 52.5%;
    left: 2.5%;
    width: 95%;
    height: 75%;
    transform: translateY(-50%);
    display: flex;
    justify-content: flex start;
    align-items: stretch;
    border: 2px solid var(--nmf-ge-separator);
    background-color: var(--nmf-ge-separator);
    border-radius: 5px;
}
</style>
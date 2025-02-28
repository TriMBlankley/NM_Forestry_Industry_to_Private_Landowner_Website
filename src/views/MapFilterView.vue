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
            <div class="map-search">
                
                <input type="text" v-model="userInputAdress" placeholder="Local adress">
                    
            </div>
            <!-- The message tag is the prop that passes the value to the child component-->
            <leafletTest :adress="userInputAdress" :businesses="businesses" class="map"/>
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
/* MAIN Css --------- -----------------------------*/
.map-layout{
    width: 100vw;
    height: 80vh;
    position: absolute;
    
    transform: translate(-50%, 16%);
    
    display: flex;
    flex-direction: row;
}

/* map css -----------------------------*/
.map-holder {
  width:80vw;
  margin-left: 1vw;
  height: 100%;
  
  overflow: hidden;

  border: 5px solid var(--nmf-ge-separator);
  background-color: var(--nmf-ge-separator);
  border-radius: 5px;
}

.map{
    z-index: 1;
    width: 100%;
    height: 100%;
}

.map-search {
    z-index: 2;
    position: absolute;
    left: 60vh;
}

/* buisness holder css -----------------------------*/
.business-holder{
    display: flex;
    flex-direction: column;
}


/* filter holder css -----------------------------*/
.filter-holder{
    border: 5px solid var(--nmf-ge-separator);
    background-color: var(--nmf-bk-backroundMain);
    border-radius: 5px;
    color: var(--nmf-ge-button);
}
</style>
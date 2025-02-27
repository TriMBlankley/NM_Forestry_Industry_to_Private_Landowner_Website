<script setup lang="ts">
import { ref } from 'vue';

import leafletTest from '../components/leafletTest.vue';
import BusinessTest from '../components/BusinessTest.vue';
import FilterAndSearch from '../components/FilterAndSearch.vue';

const userInputAdress = ref<string>('');

</script>

<template>
    <div class="map-layout">
        <div class="map-holder">
            <div class="map-search">
                
                <input type="text" v-model="userInputAdress" placeholder="Local adress">
                    
            </div>
            <!-- The message tag is the prop that passes the value to the child component-->
            <leafletTest :adress="userInputAdress" class="map"/>
        </div>
        <div class ="business-holder">
            <BusinessTest />
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
    z-index: 1;
    width: 100%;
    height: 100%;
    border-radius: 3px;
}

.map-search {
    z-index: 2;
    position: absolute;
    left: 80vh;
}


.business-holder{
    border: 5px solid var(--nmf-ge-separator);
    background-color: var(--nmf-bk-backroundMain);
    border-radius: 5px;
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
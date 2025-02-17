<script setup lang="ts">
import leafletTest from '../components/leafletTest.vue';
import BusinessTest from '../components/BusinessTest.vue';
import FilterAndSearch from '../components/FilterAndSearch.vue';
</script>

<template>
    <div class="layout">
        <div class="map-holder">
            <leafletTest class="map"/>
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
    width: 100%;
    height: 100%;
    border-radius: 3px;
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


.layout{
    position: absolute;
    top: 50%;
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
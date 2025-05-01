<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import axios from 'axios';
import type { Business } from '../business-information';



const props = defineProps<{ businesses: Business[], error: String }>();
//const error = ref<string | null>(null); 
const emit = defineEmits();
const handleBusinessClick = (business: Business) => {
  if (business.latitude && business.longitude) {
    emit('businessSelected', {
      lat: business.latitude,
      lon: business.longitude
    });
  }
};

</script>

<template>
    <div class="businesses-holder">
      <div class="business-box" v-if="props.error">
        <p class="error-message">{{ props.error }}</p>
      </div>

      <div v-else-if="props.businesses.length === 0">
        <p class="business-box">No businesses found, please refine your search.</p>
     </div>

      <div v-else>
        <div
          v-for="(business, index) in props.businesses" :key="index" class="business-box" @click="handleBusinessClick(business)">
          <p><b>{{ business.bus_name }}</b></p>
          <p v-if="business.website">Website: <a :href="business.website" target="_blank">{{ business.website }}</a></p>
          <p>Phone: {{ business.phone_num }}</p>
          <p>Address: {{ [business.address, business.city, business.zip].filter(Boolean).join(', ') }}</p>
          <p v-if="business.business_work"> Services: {{ business.business_work.replace(/,/g, ', ').replace(/\b\w/g, char => char.toUpperCase()) }}</p>
        </div>
      </div>
    </div>
  </template>

<style scoped>
.businesses-holder {
    display: block;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    height: 100%;
    width: 100%;
    padding: 10px;
    max-height: 80vh; 
}

.other-holder{
    width: 100%;
    border: 2px solid var(--nmf-ge-separator);
    display: flex;
}

.business-box {
    border-bottom: 2px solid var(--nmf-ge-separator);
    border-top: 2px solid var(--nmf-ge-separator);
    width: 100%;
    height: auto; 
    padding: 5px;
    box-sizing: border-box;
    margin-bottom: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 5px;
}

.business-box:hover {
    background: var(--nmf-ge-buisness-hover);
}

.error-message {
  color: red;
  font-weight: bold;
}

</style>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Business {
    bus_id: number;
    bus_name: string;
    website: string;
    zip: number;
    county: string;
    city: string;
    address: string;
    mailing_add: string;
    email: string;
    work_radius: number;
    phone_num: string;
    business_work: string;
}

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
    <div class="businesses-holder">
        <div v-if="error">{{ error }}</div>
            <div v-for="(business, index) in businesses" :key="index" class="business-box">
            <p><b>{{ business.bus_name }}</b></p>
            <p v-if="business.website">Website: <a :href="business.website" target="_blank">{{ business.website }}</a></p>
            <p>Phone: {{ business.phone_num }}</p>
            <p>Address: {{[business.address, business.city, business.zip].filter(Boolean).join(', ')}}</p>
            <p v-if="business.business_work"> Services: {{ business.business_work.replace(/,/g, ', ').replace(/\b\w/g, char => char.toUpperCase()) }}</p>
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

.business-box {
    border: 2px solid var(--nmf-ge-separator);
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

</style>
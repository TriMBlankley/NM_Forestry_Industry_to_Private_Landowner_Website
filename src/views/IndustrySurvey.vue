<script setup lang="ts">
import { ref, reactive } from 'vue';
import axios from 'axios';
import { businessWork, newMexicoCounties } from '@/business-information';

const workTypes = businessWork;

interface SurveyForm {
  bus_name: string;
  address: string;
  zip: number | null;
  county: string;
  city: string;
  mailing_add: string;
  phone_num: string;
  email: string;
  website: string;
  work_radius: number | null;
  latitude: number | null;
  longitude: number | null;
  work_types: string[];
}

const form = reactive<SurveyForm>({
  bus_name: '',
  address: '',
  zip: null,
  county: '',
  city: '',
  mailing_add: '',
  phone_num: '',
  email: '',
  website: '',
  work_radius: null,
  latitude: null,
  longitude: null,
  work_types: []
});

// Function to get latitude and longitude using Nominatim (OpenStreetMap)
const getCoordinates = async (address: string) => {
  const formattedAddress = `${address}, New Mexico`;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formattedAddress)}&addressdetails=1&limit=1`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.length > 0) {
      const { lat, lon } = data[0];
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } else {
      console.error('Location not found');
      return { latitude: null, longitude: null };
    }
  } catch (error) {
    console.error('Geocoding error:', error);
    return { latitude: null, longitude: null };
  }
};

const submitForm = async () => {
  // Step 1: Get latitude and longitude based on address, county, and zip
  const { latitude, longitude } = await getCoordinates(form.address);

  // Step 2: Update form data with coordinates
  form.latitude = latitude;
  form.longitude = longitude;

  // Step 3: Send form data to the server
  try {
    const response = await axios.post('http://localhost:3000/api/submit', form);
    alert('Submitted successfully!');
    console.log(response.data);
  } catch (error) {
    alert('Failed to submit');
    console.error(error);
  }
};
</script>

<template>
  <div class="survey-main">
    <h1>Industry Survey</h1>

    <form class="survey-form" @submit.prevent="submitForm">
      <label>
        <span>
        Business Name<span class="required">*</span>:
        </span>
        <input v-model="form.bus_name" type="text" required />
      </label>

      <label>
        <span>
        Address<span class="required">*</span>:
        </span>
        <input v-model="form.address" type="text" required />
      </label>

      <label>
          <span>
            Zip<span class="required">*</span>:
          </span>
        <input v-model.number="form.zip" type="number" required />
      </label>

      <label>
        <span>
          County<span class="required">*</span>:
            <select v-model="form.county" required>
              <option value="" disabled>Select a county</option>
              <option v-for="(county, index) in newMexicoCounties" :key="index" :value="county">
                {{ county }}
              </option>
            </select>
          </span>
      </label>

      <label>
        City:
        <input v-model="form.city" type="text" />
      </label>

    
      <label>
        Mailing Address (if a PO Box is used):
        <input v-model="form.mailing_add" type="text" />
      </label>

      <label>
        <span>
          Phone Number<span class="required">*</span>:
        </span>
        <input v-model="form.phone_num" type="tel" required />
      </label>

      <label>
        Email:
        <input v-model="form.email" type="email" />
      </label>

      <label>
        Website URL:
        <input v-model="form.website" type="url" />
      </label>

      <label>
        <span>
          Work radius (in miles) of your business? <span class="required">*</span>
        </span>
          <input v-model.number="form.work_radius" type="number" required/>
        </label>

      <fieldset>
        <legend>What type of work does your business do?</legend>
        <div v-for="(workType, index) in workTypes" :key="index">
          
          <input
            type="checkbox"
            :id="`work-${index}`"
            :value="workType"
            v-model="form.work_types"
          />
          <label :for="`work-${index}`">{{ workType }}</label>
        </div>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
</style>

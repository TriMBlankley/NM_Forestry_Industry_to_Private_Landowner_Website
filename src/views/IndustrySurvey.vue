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
  const { latitude, longitude } = await getCoordinates(form.address);

  // If lat or long are null or the coordinates are not in New Mexico, it will not submit.
  if (
    latitude === null || latitude === undefined ||
    longitude === null || longitude === undefined ||
    latitude < 30 || latitude > 37 ||
    longitude < -109 || longitude > -103
  ) {
    alert('Coordinates are invalid. Please check the address to ensure the coordinates exist in New Mexico.');
    return;
  }

  form.latitude = latitude;
  form.longitude = longitude;

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
        <input v-model="form.bus_name" type="text" maxlength="70" required />
      </label>

      <label>
        <span>
        Address (Please avoid abbreviating. If there is no set address, type in the city as the address)<span class="required">*</span>:
        </span>
        <input v-model="form.address" type="text" maxlength="70" required />
      </label>

      <label>
          <span>
            Zip<span class="required">*</span>:
          </span>
        <input v-model.number="form.zip" type="text" pattern="^\d{5}$" maxlength="5" inputmode="numeric" title="ZIP code must be exactly 5 digits and numbers only" required />
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
        <input v-model="form.city" type="text" maxlength="70" />
      </label>

    
      <label>
        Mailing Address (if a PO Box is used):
        <input v-model="form.mailing_add" type="text" maxlength="70" />
      </label>

      <label>
        <span>
          Phone Number <span class="required">*</span>:
        </span>
        <!-- That pattern ensures that the phone number is in a certain format ie. can use (),-,/ or nothing to seperate phone numbers and how extensions can be added-->
        <input v-model="form.phone_num" type="text" pattern="^\(?\d{3}\)?(?:-|\.| )?\d{3}(?:-|\.| )?\d{4}(?:\s?(?:x|x\.|ext|ext\.)\s?\d{1,5})?$" maxlength="25" inputmode="tel" title="Enter a valid phone number: 555-555-5555 ext.900 or 555/555/5555" required />
      </label>

      <label>
        Email:
        <input v-model="form.email" type="email" maxlength="70" />
      </label>

      <label>
        Website URL:
        <input v-model="form.website" type="url" maxlength="70" />
      </label>

      <label>
        <span>
          Work radius (in miles) of your business? <span class="required">*</span>
        </span>
          <input v-model.number="form.work_radius" type="number" maxlength="3" required/>
        </label>

      <fieldset>
        <legend>What type of work does your business do?</legend>
        <div v-for="(workType, index) in workTypes" :key="index">
          
          <!-- Prints work types from business-information-->
          <label :for="`work-${index}`">
            <input
              type="checkbox"
              :id="`work-${index}`"
              :value="workType"
              v-model="form.work_types"
            />
            {{ workType }}
          </label>
        </div>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { reactive } from 'vue';
import axios from 'axios';
import { newMexicoCounties } from '@/business-information';

interface LandownerForm {
  owner_name: string;
  entity_name: string;
  phone_num: string;
  contact_address: string;
  email: string;
  land_address: string;
  land_zip: number | null;
  land_city: string;
  land_county: string;
  parcel_id: string;
  forest_plan: string;
  land_size: number | null;
  land_occupancy: string;
  wildfire: string;
  flooding: string;
}

const form = reactive<LandownerForm>({
  owner_name: '',
  entity_name: '',
  phone_num: '',
  contact_address: '',
  email: '',
  land_address: '',
  land_zip: null,
  land_city: '',
  land_county: '',
  parcel_id: '',
  forest_plan: '',
  land_size: null,
  land_occupancy: '',
  wildfire: '',
  flooding: ''
});

let forestPlanFile: File | null = null;

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    forestPlanFile = target.files[0];
  }
};

const submitForm = async () => {
  try {
    // Prevents submission if the file is not a PDF
    if (forestPlanFile && forestPlanFile.type !== 'application/pdf') {
          alert('The uploaded file must be a PDF.');
          return; 
        }

    const formData = new FormData();
    for (const [key, value] of Object.entries(form)) {
      formData.append(key, value as string | Blob);
    }

    if (forestPlanFile) {
      formData.append('mgmt_plan', forestPlanFile);
    }

    const response = await axios.post('http://localhost:3000/api/submit-landowner', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    alert('Form submitted successfully!');
    console.log(response.data);
  } catch (err) {
    alert('Failed to submit form');
    console.error(err);
  }
};

</script>

<template>
  <div class="survey-main">
    <h1>Landowner Survey</h1>

    <form class="survey-form" @submit.prevent="submitForm">
      <h2>1. Contact Information</h2>

      <label>
        <span>Owner Name<span class="required">*</span>:</span>
        <input v-model="form.owner_name" type="text" maxlength="70" required />
      </label>

      <label>
        Entity Name (if applicable):
        <input v-model="form.entity_name" type="text" maxlength="70" />
      </label>

      <label>
        <span>Phone Number<span class="required">*</span>:</span>
        <!-- That pattern ensures that the phone number is in a certain format ie. can use (),-,/ or nothing to seperate phone numbers and how extensions can be added-->
          <input v-model="form.phone_num" type="text" pattern="^\(?\d{3}\)?(?:-|\.| )?\d{3}(?:-|\.| )?\d{4}(?:\s?(?:x|x\.|ext|ext\.)\s?\d{1,5})?$" maxlength="25" inputmode="tel" title="Enter a valid phone number: 555-555-5555 ext.900 or 555/555/5555" required />
      </label>

      <label>
        <span>Address / PO Box<span class="required">*</span>:</span>
        <input v-model="form.contact_address" type="text" maxlength="70" required />
      </label>

      <label>
        Email:
        <input v-model="form.email" type="email" maxlength="70"/>
      </label>

      <h2>2. Location of Land</h2>

      <label>
        <span>Address<span class="required">*</span>:</span>
        <input v-model="form.land_address" type="text" maxlength="70" required />
      </label>

      <label>
        <span>Zip Code<span class="required">*</span>:</span>
        <input v-model.number="form.land_zip" type="text" pattern="^\d{5}$" maxlength="5" inputmode="numeric" required />
      </label>

      <label>
        <span>County<span class="required">*</span>:
        <select v-model="form.land_county" required>
          <option value="" disabled>Select a county</option>
          <option
            v-for="(county, index) in newMexicoCounties"
            :key="index"
            :value="county"
          >
            {{ county }}
          </option>
        </select>
      </span>
      </label>

      <label>
        City:
        <input v-model="form.land_city" type="text" maxlength="70" />
      </label>

      <h2>3. Land Information</h2>

      <label>
        <span>Parcel ID<span class="required">*</span>:</span>
        <input v-model="form.parcel_id" type="text" required maxlength="20"/>
      </label>

      <fieldset>
        <span><legend>Do you currently have or have you previously had a forest management plan? <span class="required">*</span></legend></span>

        <label>
          <input type="radio" name="forest_plan" value="current" v-model="form.forest_plan" />
          Yes, I have a current plan
        </label>

        <label>
          <input type="radio" name="forest_plan" value="expired" v-model="form.forest_plan" />
          Expired plan (&gt;10 years old)
        </label>

        <label>
          <input type="radio" name="forest_plan" value="none" v-model="form.forest_plan" />
          I do not have a plan
        </label>

        <label>
          <div display="mgmt-div">
            Upload Forest Management Plan PDF (optional):
            <input type="file" @change="handleFileUpload" accept="application/pdf" />
          </div>
        </label>
      </fieldset>

      <label>
        Land Size (in acres):
        <input v-model.number="form.land_size" type="number" maxlength="10"/>
      </label>

      <label>
        <label for="land_occupancy"><span>Are there people or cattle on your land?<span class="required">*</span></span></label>
        <select v-model="form.land_occupancy" id="land_occupancy" required>
          <option value="">--Select--</option>
          <option value="people">People</option>
          <option value="cattle">Livestock</option>
          <option value="both">Both</option>
          <option value="none">None</option>
        </select>
      </label>

      <fieldset>
        <legend>Have you experienced a wildfire on your land?<span class="required">*</span></legend>
        <label>
          <input type="radio" name="wildfire" value="1" v-model="form.wildfire" required />
          Yes
        </label>
        <label>
          <input type="radio" name="wildfire" value="0" v-model="form.wildfire" />
          No
        </label>
      </fieldset>

      <fieldset>
        <legend>Have you experienced flooding on your land?<span class="required">*</span></legend>
        <label>
          <input type="radio" name="flooding" value="1" v-model="form.flooding" required />
          Yes
        </label>
        <label>
          <input type="radio" name="flooding" value="0" v-model="form.flooding" />
          No
        </label>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>


<style>
/* Survey Styles are housed in main.css, as both Industry and Landowner
survey pages use the same styling */

.mgmt-div {
  display: flex;
  flex-direction: row;
}

@media (max-width: 600px) {
  .upload-wrapper {
    display: block;
    align-items: center;
  }
}
</style>
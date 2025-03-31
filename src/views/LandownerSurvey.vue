<script setup lang="ts"></script>

<template>
  <div class="industry-survey-main">
    <h1>Landowner Survey</h1>

    <form class="industry-form">
      <h2>1. Contact Information</h2>

      <label>
        Owner Name:
        <input type="text" name="owner_name" />
      </label>

      <label>
        Entity Name (if applicable):
        <input type="text" name="entity_name" />
      </label>

      <label>
        Phone Number:
        <input type="tel" name="phone_number" />
      </label>

      <label>
        Address / PO Box:
        <input type="text" name="contact_address" />
      </label>

      <label>
        Email:
        <input type="email" name="email" />
      </label>

      <h2>2. Location of Land</h2>

      <label>
        Address:
        <input type="text" name="land_address" />
      </label>

      <label>
        Zip Code:
        <input type="number" name="land_zip" />
      </label>

      <label>
        County:
        <input type="text" name="land_county" />
      </label>

      <label>
        City:
        <input type="text" name="land_city" />
      </label>

      <h2>3. Land Information</h2>

      <label>
        Parcel ID:
        <input type="text" name="parcel_id" />
      </label>

      <fieldset>
        <legend>Do you currently have or have you previously had a forest management plan approved by the Forestry Division?</legend>

        <label>
          <input type="radio" name="forest_plan" value="current" />
          Yes, I have a current management plan
        </label>

        <label>
          <input type="radio" name="forest_plan" value="expired" />
          I have an expired management plan (&gt;10 years old)
        </label>

        <label>
          <input type="radio" name="forest_plan" value="none" />
          I do not have a forest management plan
        </label>

        <label>
          Upload plan (optional):
          <input type="file" name="management_plan_upload" />
        </label>
      </fieldset>

      <label>
        Land Size (in acres):
        <input type="number" name="land_size" />
      </label>

      <label>
        Occupancy of the Site:
        <input type="text" name="occupancy" />
      </label>

      <label>
        Natural Resources:
        <textarea name="natural_resources" rows="4"></textarea>
      </label>
    </form>
  </div>
</template>

<style>
.industry-survey-main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.industry-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.industry-form h2 {
  margin-top: 2rem;
  font-size: 1.25rem;
}

.industry-form label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
}

.industry-form input[type="text"],
.industry-form input[type="number"],
.industry-form input[type="tel"],
.industry-form input[type="email"],
.industry-form input[type="file"],
.industry-form textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

fieldset {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 4px;
}
</style>








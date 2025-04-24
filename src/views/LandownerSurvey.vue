<script setup lang="ts"></script>

<template>
  <div class="survey-main">
    <h1>Landowner Survey</h1>

    <form class="survey-form">
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

      <fieldset>
        <legend> Have you experienced a wildfire on your land?</legend>
          <label>
            <input type="radio" name="wildfire" value="fireYes" />
            Yes.
          </label>
          <label>
            <input type="radio" name="wildfire" value="fireNo" />
            No
          </label>
      </fieldset>

      <fieldset>
        <legend> Have you experienced flooding on your land?</legend>
          <label>
            <input type="radio" name="flooding" value="floodYes" />
            Yes
          </label>
          <label>
            <input type="radio" name="flooding" value="floodNo" />
            No
          </label>
      </fieldset>
    </form>
  </div>
</template>

<style>
/* All Styles are housed in main.css, as both Industry and Landowner
survey pages use the same styling */
</style>








<script setup lang="ts"></script>

<template>
  <div class="survey-main">
    <h1>Industry Survey</h1>

    <form class="survey-form">
      <label>
        Business Name:
        <input type="text" name="bus_name" />
      </label>

      <label>
        Address:
        <input type="text" name="address" />
      </label>

      <label>
        Zip:
        <input type="number" name="zip" />
      </label>

      <label>
        County:
        <input type="text" name="county" />
      </label>

      <label>
        City:
        <input type="text" name="city" />
      </label>

      <!-- Latitude + Longitude logic to be added here -->

      <label>
        Mailing Address (if a PO Box is used):
        <input type="text" name="mailing_add" />
      </label>

      <label>
        Phone Number:
        <input type="tel" name="phone_num" />
      </label>

      <label>
        Email:
        <input type="email" name="email" />
      </label>

      <label>
        Website URL:
        <input type="url" name="website" />
      </label>

      <label>
        Work radius of your business?
        <input type="number" name="work_radius" />
      </label>

      <fieldset>
        <legend>What type of work does your business do?</legend>
        <label><input type="checkbox" value="Construction" /> Construction</label>
        <label><input type="checkbox" value="Maintenance" /> Maintenance</label>
        <label><input type="checkbox" value="Repair" /> Repair</label>
        <label><input type="checkbox" value="Consulting" /> Consulting</label>
        <label><input type="checkbox" value="Other" /> Other</label>
      </fieldset>
    </form>
  </div>
</template>

<style>
/* All Styles are housed in main.css, as both Industry and Landowner
survey pages use the same styling */
</style>







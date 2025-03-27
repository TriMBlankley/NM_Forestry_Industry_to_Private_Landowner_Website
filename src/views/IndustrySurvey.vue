<script setup lang="ts"></script>

<template>
  <div class="industry-survey-main">
    <h1>Industry Survey</h1>

    <form class="industry-form">
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

.industry-form label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
}

.industry-form input[type="text"],
.industry-form input[type="number"],
.industry-form input[type="tel"],
.industry-form input[type="email"],
.industry-form input[type="url"] {
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







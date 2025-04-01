<!-- Dark Blue footer of the website -->
<script setup lang="ts">
// Authors and Contributors:
const authors = "Jena Peterson, Tri Blankley";
const contributors = 'Dominic DOnofrio'
</script>

<template>
    <div class="bottom-banner">
        <p>
            Created for the New Mexico Forestry Division as a Capstone Project.
            <br />
            Authors: {{ authors }} 
            <br />
            Contributors: {{ contributors }}
        </p>
    </div>
</template>

<style scoped>
.bottom-banner {
    /* Size */
    width: 100%;
    min-height: 15vh;

    /* Display Settings */
    display: flex;
    flex-direction: row-reverse;
    box-sizing: border-box;

    /* Content Positioning */
    text-align: right;

    /* Color */
    color: var(--nmf-t-bkContrast);
    background-color: var(--nmf-bk-contrast);
}

p {
    /* Content Positioning */
    margin-right: 1em; 
    margin-top: 1em;
}
</style>
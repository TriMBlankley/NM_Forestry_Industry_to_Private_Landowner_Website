<script setup lang="ts">
    const ENMRDurl = 'https://www.emnrd.nm.gov/'

    const adress = ""

</script>

<template>
    <div class="banner">
        <div class="logo-and-title">
            
            <a v-bind:href=ENMRDurl target="_blank"> <!-- target="_blank" makes this open the window in a new tab-->
                <img src="../assets/Graphics/ENMRDLogoVectorized.svg" alt="ENMRD Logo" width="100">
            </a>

            <h1>
                Forest Industry Leaders of New Mexico 
            </h1>
        </div>

        <input v-model="adress" placeholder="target adress" />

        <img style="height: 75%;" src="../assets/Graphics/SettingsButton.svg" v-on:click="Settings" />
    </div>
</template>

<style scoped>
.banner {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.logo-and-title {
    width: 50%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

}
</style>
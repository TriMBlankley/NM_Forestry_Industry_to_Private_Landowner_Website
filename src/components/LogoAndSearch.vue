<script setup lang="ts">
const adress = ""
</script>

<template>
    <div class="banner">
        <div class="logo-and-title">
            <a style="width: 15%;"
            href="https://www.emnrd.nm.gov/">
                test nav
                <img src="../assets/Graphics/ENMRD_Logo.svg" />
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
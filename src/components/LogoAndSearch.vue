<script setup lang="ts">
    const ENMRDurl = 'https://www.emnrd.nm.gov/'

    let adress = ""
</script>

<template>
    <div class="banner">
        <div class="logo-and-title">
            
            <a v-bind:href=ENMRDurl target="_blank"> <!-- target="_blank" makes this open the window in a new tab-->
                <img src="../assets/Graphics/ENMRDLogoVectorized.svg" alt="ENMRD Logo" height="100%">
            </a>

            <h1>
                Forest Industry Leaders of New Mexico 
            </h1>
        </div>

        <input v-model="adress" placeholder="target adress"/>

        <img src="../assets/Graphics/SettingsButton.svg" style="height: 30px; margin-right: 7px;"/>
    </div>
</template>

<style scoped>
.banner {
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
}

.logo-and-title {
    width: 50%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
input{
    flex-grow: 1; 
    margin-left: 90px; 
    margin-right: 50px; 
    padding: 5px;
    border-radius: 10px;
    border: 2px solid var(--nmf-ge-separator);

}

a {
    margin-left: 10px;
}

</style>
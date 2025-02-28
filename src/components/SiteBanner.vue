<script setup lang="ts">
    const ENMRDurl = 'https://www.emnrd.nm.gov/'
</script>

<template>
    <div class="site-banner">
        <div class="logo-and-title">
            
            <a v-bind:href=ENMRDurl target="_blank"> <!-- target="_blank" makes this open the window in a new tab-->
                <img src="../assets/Graphics/ENMRDLogoVectorized.svg" alt="ENMRD Logo" height="100%">
            </a>

            <h1 style="margin-left: 20px;">
                Forest Industry Leaders of New Mexico 
            </h1>
        </div><!-- Logo and Title    -->

        <div class="nav-separator">
            <div style="margin-right: 40px;">
                <button>Map</button>
                <button>Business Survey</button>
                <button>Landowner Survey</button>
            </div>
        </div> 
    </div>
</template>

<style scoped>
.site-banner {
    position: absolute;
    top: 0;
    width: 100vw;
    transform: translateX(-50vw);
    align-items: center;
    display: flex;
    flex-direction: column;
}

.logo-and-title {
    width: 100vw;
    display: flex;
    flex-direction: row;
}

a {
    margin-left: 10px;
}

.nav-separator {
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    background-color: var(--nmf-ge-separator);
}

.nav-buttons{
    
    
    margin-right: 40px;
}

button {
    background-color: inherit;
    border: none;
    color: var(--nmf-t-a);
    font-weight: bold;
    margin-left: 5px;
    margin-right: 5px;
}

</style>
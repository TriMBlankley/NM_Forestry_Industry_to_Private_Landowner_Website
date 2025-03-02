<script setup lang="ts">
    const ENMRDurl = 'https://www.emnrd.nm.gov/'
</script>

<template>
    <div class="site-banner">
        <div class="logo-and-title">
            
            <a v-bind:href=ENMRDurl target="_blank"> <!-- target="_blank" makes this open the window in a new tab-->
                <img src="../assets/Graphics/ENMRDLogoVectorized.svg" alt="ENMRD Logo" style="height:100%">
            </a>

            <h1 style="margin-left: 7px;">
                Forest Industry Leaders of New Mexico 
            </h1>
        </div><!-- Logo and Title    -->

        <div class="nav-separator">
            <RouterLink class="router-link" to="/">Map Search</RouterLink>
            <RouterLink class="router-link" to="/IndustrySurvey">Industry Survey</RouterLink>
            <RouterLink class="router-link" to="/LandownerSurvey">Landowner Survey</RouterLink>           
        </div> 
    </div>
</template>

<style scoped>
.site-banner {
    width: 100%;
    display: flex;
    flex-direction: column;
    white-space: nowrap;
}

.logo-and-title {
    width: 100%;
    display: flex;
    flex-direction: row;
}

a {
    margin-left: 7px;
    flex-shrink: 0;
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

.router-link {
    color: var(--nmf-t-a);
    font-weight: bold;
    margin-left: 5px;
    margin-right: 5px;
}

</style>
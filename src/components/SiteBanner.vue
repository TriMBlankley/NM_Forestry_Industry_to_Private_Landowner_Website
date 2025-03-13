<script setup lang="ts">
import nmfLogo from "../assets/Graphics/Logo.svg"
import enmrdLogo from "../assets/Graphics/ENMRDLogoVectorized.svg"



const ENMRDurl = 'https://www.emnrd.nm.gov/sfd/'
</script>

<template>
    <div class="site-banner">
        <div class="logo-and-title">
            <div class="left-title">
                <RouterLink class="router-link" to="/" style="margin-right: 0;">
                    <nmfLogo class="home-button" alt="HomeButton" style="height:2.5em"/> 
                </RouterLink>

                <h1 style="margin-left: 7px;">
                    Forest Industry Leaders of New Mexico
                </h1>
            </div>
            <div class="right-home">
                <a v-bind:href=ENMRDurl target="_blank"> <!-- target="_blank" makes this open the window in a new tab-->
                    <enmrdLogo alt="ENMRD Logo" style="height:2.5em" />
                </a>
            </div>
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
    justify-content: space-between;
    align-items: center;
    margin-top: .4em;
}

.left-title {
    display: flex;
    align-items: center;
}

.right-home {
    display: flex;
    align-items: center;
    margin-right: .5em;
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


.nav-buttons {
    margin-right: 40px;
}

.router-link {
    color: var(--nmf-t-a);
    font-weight: bold;
    margin-left: 5px;
    margin-right: 5px;
}

.home-button {
    color: var(--nmf-ge-button);
}
.home-button:hover {
    color: var(--nmf-ge-focusedButton);
}
</style>
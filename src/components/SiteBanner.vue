<!-- 
 Top Banner of the website, Containing navigation buttons
 for acessing the main pages.
-->
<script setup lang="ts">
// SVG Asset Imports:
import nmfLogo from "../assets/Graphics/Logo.svg"
import enmrdLogo from "../assets/Graphics/ENMRDLogoVectorized.svg"

// This is the link that clicking the ENMRD logo redirects to.
const ENMRDurl = 'https://www.emnrd.nm.gov/sfd/'
</script>

<template>
    <div class="site-banner">
        <div class="logo-and-title">
            <div class="left-title">
                <!-- Router link is used instead of an 'a' tag in order to better integrate with vuejs -->
                 <!-- If you do not use a ruter link, the page does not store history properly -->
                <RouterLink class="router-link" to="/" style="margin-right: 0;">
                    <!-- This uses the SVG of the nmfLogo as a vue component, this makes it load the svg as an inline element, loading the  -->
                    <!-- svg's faster, and makeing them more reactive -->
                    <nmfLogo class="home-button" alt="HomeButton" style="height:2.5em"/> 
                </RouterLink>

                <h1 style="margin-left: 7px;"> <!-- Main Title of the Website-->
                    Forest Industry Leaders of New Mexico
                </h1>
            </div>
            <div class="right-home">
                <!-- Here, and 'a' tag is used like normal because the nav button links to an external webiste -->
                <a v-bind:href=ENMRDurl target="_blank"> <!-- target="_blank" makes this open the window in a new tab-->
                    <enmrdLogo alt="ENMRD Logo" style="height:2.5em" />
                </a>
            </div>
        </div><!-- Logo and Title    -->

        <!-- This is the thin blue bar running along the bottom of the header, it contains nav buttons for inter-site moovement with router links -->
        <div class="nav-separator">
            <RouterLink class="router-link" to="/">Map Search</RouterLink>
            <RouterLink class="router-link" to="/IndustrySurvey">Industry Survey</RouterLink>
            <RouterLink class="router-link" to="/LandownerSurvey">Landowner Survey</RouterLink>
        </div>
    </div>
</template>

<style scoped>
.site-banner {
    /* Size */
    width: 100%;

    /* Display Settings */
    display: flex;
    flex-direction: column;

    /* Behaviour */
    white-space: nowrap;
}

.logo-and-title {
    /* Size  */
    width: 100%;

    /* Display Settings */
    display: flex;
    flex-direction: row;

    /* Behaviour */
    justify-content: space-between;
    align-items: center;
    margin-top: .4em;
}

.left-title {
    /* Display Settings */
    display: flex;

    /* Behaviour */
    align-items: center;
}

.right-home {
    /* Content Positioning */
    margin-right: .5em;

    /* Display Settings */
    display: flex;

    /* Behaviour */
    align-items: center;
}

a {
    /* Content Positioning */
    margin-left: 7px;
}

.nav-separator {
    /* Size */
    width: 100vw;

    /* Color */
    background-color: var(--nmf-ge-separator);

    /* Display Settings */
    display: flex;
    flex-direction: row;

    /* Content Positioning */
    justify-content: flex-end;
    
}


.nav-buttons {
    /* Content Positioning */
    margin-right: 40px;
}

.router-link {
    /* Color */
    color: var(--nmf-t-a);
    font-weight: bold;

    /* Content Positioning */
    margin-left: 5px;
    margin-right: 5px;
}

.home-button {
    /* Color */
    color: var(--nmf-ge-button);
}
.home-button:hover {
    /* Color */
    color: var(--nmf-ge-focusedButton);
}
</style>
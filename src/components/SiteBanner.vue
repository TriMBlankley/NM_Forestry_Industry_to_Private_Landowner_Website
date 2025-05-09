<!-- 
 Top Banner of the website, Containing navigation buttons
 for acessing the main pages.
-->
<script setup lang="ts">
// Vue.js Imports: 
import {useRoute} from 'vue-router';
import {computed} from 'vue';

// SVG Asset Imports:
import nmfLogo from "../assets/Graphics/nmfLogo.svg"
import enmrdLogo from "../assets/Graphics/ENMRDLogoVectorized.svg"

// This is the link that clicking the ENMRD logo redirects to.
const ENMRDurl = 'https://www.emnrd.nm.gov/sfd/'

// Define props
const props = defineProps({
    showMap: {
        type: Boolean,
        required: true
    }
});

// Emit for toggling view
const emit = defineEmits(['toggleView', 'setMapView']);

// Method to handle toggle
const handleToggle = () => {
    emit('toggleView');
};

// Method to explicitly set map view to true
const setMapView = () => {
    emit('setMapView', true);
};

// Get current route for the reactive button while on mobile
const route = useRoute();
const isMapPage = computed(() => route.name === 'home');

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
            <div class="mobile-only">
                <button v-if="isMapPage" class="mobile-toggle" @click="handleToggle">
                    {{ props.showMap ? 'Businesses' : 'Map' }}
                      <!-- {{ isMapPage }} -->
                </button>
                <RouterLink v-else class="router-link mobile-only" to="/" @click="setMapView">
                    Map Search
                </RouterLink>
            </div>

            <div class="grow"></div>

            <RouterLink class="router-link desktop-only" to="/">Map Search</RouterLink>
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

.grow {
    flex-grow: 10;
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

/* Hide elements based on screen size */
@media (max-width: 768px) {
    .desktop-only {
        display: none;
    }
}

@media (min-width: 768px) {
    .mobile-only {
        display: none;
    }
}

/* MOBILE UI --------------------------- */
.mobile-toggle {
    /* Color */
    color: var(--nmf-t-a);
    background-color: transparent;
    font-weight: bold;
    
    /* Content Positioning */
    margin-left: 5px;
    margin-right: 5px;
    padding: 0 8px;
    
    /* Border */
    border: none;
    cursor: pointer;
    
    /* Font */
    font-size: inherit;
    font-family: inherit;
    white-space: nowrap;
}

.mobile-toggle:hover {
    color: var(--nmf-ge-focusedButton);
}

/* Hide toggle button on desktop */
@media (min-width: 769px) {
    .mobile-toggle {
        display: none;
    }
}
</style>
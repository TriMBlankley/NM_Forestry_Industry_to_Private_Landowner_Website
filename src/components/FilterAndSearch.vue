<script setup lang="ts">
import { ref, computed, watch } from 'vue';

import folderButton from '@/assets/Graphics/arrowButton.svg'
import { businessWork } from '@/business-information';
import type { Business } from '../business-information';

const searchBusinesses = ref('');
const chosenWorkTypes = ref<string[]>([]);
const workTypes = businessWork;
const props = defineProps<{ businesses: Business[] }>();
const emit = defineEmits(['update:filteredBusinesses']);

const isMenuOpen = ref(false);

const buttonClosed = ref('svg-button');
const buttonOpen = ref('svg-button svg-button-flipped');
let buttonClass = buttonClosed

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
    if (isMenuOpen.value == false) {
        buttonClass = buttonClosed
    } else {
        buttonClass = buttonOpen
    }

};
const filteredBusinesses = computed(() => {
    return props.businesses.filter((business) => {
        const name = business.bus_name ? business.bus_name.toLowerCase() : '';
        const work = business.business_work ? business.business_work.toLowerCase() : '';
        const city = business.city ? business.city.toLowerCase() : '';

        const matchesSearch =   name.includes(searchBusinesses.value.toLowerCase()) ||
                                work.includes(searchBusinesses.value.toLowerCase()) ||
                                city.includes(searchBusinesses.value.toLowerCase());

        const matchesWorkTypes = chosenWorkTypes.value.length === 0 ||
                                  chosenWorkTypes.value.some(workType => work.includes(workType.toLowerCase()));

        return matchesSearch && matchesWorkTypes;
    });
});


watch(filteredBusinesses, (newFilteredBusinesses) => {
  emit('update:filteredBusinesses', newFilteredBusinesses);
});
</script>


<template>
    <div class="menu-folder">
        <button @click="toggleMenu" v-bind:class="buttonClass">
            <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg
                width="100%" height="100%" viewBox="0 0 18 39" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/"
                style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
                <g id="arrowButton">
                    <path
                        d="M1.593,20.835c-0.844,-0.92 -0.844,-2.333 0,-3.254c2.908,-3.171 9.382,-10.232 13.174,-14.368c0.469,-0.51 1.203,-0.681 1.848,-0.43c0.646,0.252 1.071,0.874 1.071,1.567c-0.007,7.381 -0.019,22.328 -0.025,29.703c-0.001,0.692 -0.426,1.313 -1.072,1.564c-0.645,0.251 -1.379,0.08 -1.847,-0.431c-3.784,-4.129 -10.245,-11.181 -13.149,-14.351Z"
                        style="fill:#dd8a24;" />
                    <path
                        d="M7.134,19.803c-0.285,-0.353 -0.284,-0.858 0.001,-1.211c1.14,-1.41 3.984,-4.926 5.417,-6.698c0.128,-0.159 0.342,-0.219 0.534,-0.151c0.192,0.068 0.32,0.249 0.319,0.453c-0.003,3.141 -0.011,10.872 -0.015,14.012c0,0.203 -0.128,0.385 -0.32,0.452c-0.192,0.068 -0.406,0.007 -0.534,-0.151c-1.429,-1.775 -4.265,-5.294 -5.402,-6.706Z"
                        style="fill:#f2dd3d;" />
                </g>
            </svg>
        </button>

        <div v-if="isMenuOpen" style="
            color: var(--nmf-ge-button);
            background-color: var(--nmf-ge-separator);
            padding: 5px;
            margin-right: 1em;
            height: 100%;
            width: 100%;
            border-radius: 0px 5px 5px 5px;
            min-width: 15vw;
        ">
            <div class="box">
                <div class="search-box">
                <input 
                    type="text" 
                    v-model="searchBusinesses" 
                    placeholder="Search businesses..." 
                    class="map-search"
                />
                </div>
                <p></p>
                Types of Services:
                <form>
                    <div v-for="(workType, index) in workTypes" :key="index">
                        <input 
                            type="checkbox" 
                            :id="workType" 
                            :value="workType" 
                            v-model="chosenWorkTypes" 
                        />
                        <label :for="workType">{{ workType }}</label>
                    </div>
                </form>
        </div>
    </div>
    </div>
</template>

<style scoped>
/* Main div -----------------  */
.menu-folder {
    display: flex;
    flex-direction: row;
    height: 100%;
}

/* svg button ------------------------------------ */
.svg-button {
    background: var(--nmf-ge-separator);
    border: none;
    border-radius: 5px 0px 0px 5px;
    /* This is a short hand syntax */

    padding: 5;
    cursor: pointer;
    width: 25px;
    height: 50px;
    margin-left: 5px;
}

.svg-button-flipped {
    margin-left: 5px;
    border-radius: 0px 5px 5px 0px;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1)
               translateX(-2px);
}

/* Content -------------------------------- */
.box {
    height: auto;
    width: 100%;
}

.search-box {
    display: flex;
    align-items: center;
    width: 100%;
}

input[type=checkbox]:hover {
    color: var(--nmf-ge-focusedButton)
}


</style>
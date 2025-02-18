<script setup lang="ts">

</script>

<template>
    <div class="bottom-banner">
        <p>
            Website Created in a Joint Project between New Mexico Tech and Navajo Tech
            <br />
            Primary Authors: Jena Peterson and Tri Blankley
        </p>
        <div class="white-space"></div>
    </div>
</template>

<style scoped>
.bottom-banner {
    position: absolute;
    top: 95%;
    width: 100vw;
    height: 15vh;
    transform: translateX(-50vw);

    display: flex;
    flex-direction: row-reverse;

    text-align: center;
    color: var(--nmf-t-bkContrast);
    background-color: var(--nmf-bk-contrast);
    
}

.white-space {
    width: 7.5vw;
}
    
</style>
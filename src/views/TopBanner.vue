<script setup lang="ts">
import LogoAndSearch from '@/components/LogoAndSearch.vue';
import NavSeparator from '@/components/NavSeparator.vue';
</script>

<template>
    <div class="site-banner">
        <div class="logo-and-search">
            <LogoAndSearch />
        </div>
        <div class ="nav-separator">
            <NavSeparator />
        </div>
    </div>
</template>

<style scoped>
.logo-and-search {
  width: 100vw;
  height: 7.5vh;

  display: flex;
  
  overflow: hidden;
}

.nav-separator {
  width: 100vw;
  height: 5vh;

  display: flex;

  background-color: var(--nmf-ge-separator);
  
  overflow: hidden;
}

.site-banner{
    position: absolute;
    top: 0%;
    width: 100vw;
    height: 12.5vh;
    transform: translateX(-50vw);

    display: flex;
    flex-direction: column;
    justify-content: flex start;
    align-items: stretch;

    background-color: var(--nmf-bk-backroundMain);
}
</style>
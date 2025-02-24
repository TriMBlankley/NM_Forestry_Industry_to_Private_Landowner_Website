<script setup lang="ts">

</script>

<template>
    <div class="navSeparator">
        <div class="navButtons">
            <button>1st Button</button>
            <button>2nd Button</button>
            <button>3rd Button</button>
        </div>
    </div> 
</template>

<style scoped>
.navSeparator {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    background-color: var(--nmf-ge-separator);
}

.navButtons{
    color: var(--nmf-t-a);
    font-weight: bold;
    margin-right: 40px;
}

button {
    background-color: inherit;
    border: none;
    color: inherit;
    font-weight: inherit;
    margin-left: 5px;
    margin-right: 5px;
}

</style>
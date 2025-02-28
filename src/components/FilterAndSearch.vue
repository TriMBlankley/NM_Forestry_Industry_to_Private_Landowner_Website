<script setup lang="ts">

</script>

<template>
    <div class="box">
        <form class="search-box">
            <input type="text">
            <input type="submit" value="Search">
        </form>
    </div>
    <div class="box">
        Types of Services:
        <form>
            <input type="checkbox" id="work1">
                <label for="work1"> Fencing </label><br>
            <input type="checkbox" id="work2">
                <label for="work2"> Firewood </label><br>
            <input type="checkbox" id="work3">
                <label for="work3"> Furiniture </label><br>
            <input type="checkbox" id="work4">
                <label for="work4"> Landscaping </label><br>
            <input type="checkbox" id="work5">
                <label for="work5"> Landscape Materials </label><br>
            <input type="checkbox" id="work6">
                <label for="work6"> Lumber </label><br>
            <input type="checkbox" id="work7">
                <label for="work7"> Mill </label><br>
            <input type="checkbox" id="work8">
                <label for="work8"> Tree Services </label><br>
        </form>
    </div>
</template>

<style scoped>
    .box {
        height: auto;
        width: 100%;
        padding: 2px;
    }

    .search-box{
        display: flex;
        align-items: center;
        width: 100%;
    }

    input[type=checkbox]:hover{ color: var(--nmf-ge-focusedButton) }
</style>
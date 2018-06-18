<template>
    <div class="container">
        <router-link to="/" class="title"><h1>Fate/Smart Contract</h1></router-link>
        <span class="btn btn-outline-dark btn-lg float-right btn-outline-display"><i class="fas fa-cube"></i> 30</span>
        <router-link class="btn btn-outline-dark btn-lg" to="/dashboard/summon"><i class="fas fa-dice"></i> 召喚</router-link>
        <router-link class="btn btn-outline-dark btn-lg" to="/dashboard/store"><i class="fas fa-store"></i> 商店</router-link>
        <router-link class="btn btn-outline-dark btn-lg" to="/dashboard/summon-history"><i class="fas fa-history"></i> 召喚紀錄</router-link>
        <router-view class="mt-1"></router-view>
    </div>
</template>

<script>
    export default {
        name: 'Dashboard'
    }
</script>

<style scoped>
    .btn-outline-display {
        cursor: default !important;
    }

    .btn-outline-display:hover {
        color: #343a40;
        background-color: transparent;
        border-color: #343a40;
    }

    .btn-outline-display:active  {
        color: #343a40 !important;
        background-color: transparent !important;
        border-color: #343a40 !important;
    }
</style>

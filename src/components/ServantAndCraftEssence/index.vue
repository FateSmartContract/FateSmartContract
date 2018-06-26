<template>
    <div class="card">
        <div class="card-body">
            <router-link class="btn btn-primary" to="/dashboard/servant-and-craft-essence/servant">　從者　</router-link>
            <router-link class="btn btn-primary" to="/dashboard/servant-and-craft-essence/craft-essence">概念裡裝</router-link>
            <router-view class="mt-1"></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ServantAndCraftEssence'
    }
</script>

<style scoped>

</style>

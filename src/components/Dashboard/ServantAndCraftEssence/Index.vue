<template>
    <div class="card">
        <div class="card-body" style="overflow: hidden; height: 100%">
            <router-link class="btn btn-outline-primary" active-class="active" to="/dashboard/servant-and-craft-essence/servant">
                　從者　
            </router-link>
            <span class="btn btn-outline-dark btn-lg btn-outline-display">{{ servant.length }}</span>
            <router-link class="btn btn-outline-primary" active-class="active" to="/dashboard/servant-and-craft-essence/craft-essence">
                概念裡裝
            </router-link>
            <span class="btn btn-outline-dark btn-lg btn-outline-display">{{ craftEssence.length }}</span>
            <router-view class="mt-1"></router-view>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'ServantAndCraftEssence',
        computed: {
            ...mapGetters([
                'servant',
                'craftEssence'
            ])
        }
    }
</script>

<style scoped>

</style>

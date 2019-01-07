<template>
    <div>
        <div class="container">
            <span class="btn btn-outline-dark btn-lg float-right btn-outline-display"><i class="fas fa-cube"></i> {{ tokenQuartzAmount }}</span>
            <router-link class="btn btn-outline-dark btn-lg" active-class="active" to="/dashboard/servant-and-craft-essence">
                <i class="fas fa-clipboard-list"></i> 靈基一覽
            </router-link>
            <router-link class="btn btn-outline-dark btn-lg" active-class="active" to="/dashboard/summon">
                <i class="fas fa-dice"></i> 召喚
            </router-link>
            <router-link class="btn btn-outline-dark btn-lg" active-class="active" to="/dashboard/store">
                <i class="fas fa-store"></i> 商店
            </router-link>
            <router-link class="btn btn-outline-dark btn-lg" active-class="active" to="/dashboard/summon-history">
                <i class="fas fa-history"></i> 召喚紀錄
            </router-link>
        </div>
        <div class="container">
            <router-view class="mt-1 animated fadeIn" style="height: calc(100vh - 124px - 2rem)"></router-view>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Dashboard',
        computed: {
            ...mapGetters('player', [
                'tokenQuartzAmount'
            ])
        }
    }
</script>

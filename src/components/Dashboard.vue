<template>
    <div class="container">
        <router-link to="/" class="title"><h1>Fate/Smart Contract</h1></router-link>
        <span class="btn btn-outline-dark btn-lg float-right btn-outline-display"><i class="fas fa-cube"></i> {{ tokenQuartzAmount }}</span>
        <router-link class="btn btn-outline-dark btn-lg" to="/dashboard"><i class="fas fa-clipboard-list"></i> 靈基一覽</router-link>
        <router-link class="btn btn-outline-dark btn-lg" to="/dashboard/summon"><i class="fas fa-dice"></i> 召喚</router-link>
        <router-link class="btn btn-outline-dark btn-lg" to="/dashboard/store"><i class="fas fa-store"></i> 商店</router-link>
        <router-link class="btn btn-outline-dark btn-lg" to="/dashboard/summon-history"><i class="fas fa-history"></i> 召喚紀錄</router-link>
        <router-view class="mt-1 animated fadeIn"></router-view>
    </div>
</template>

<script>
    import player from '@/js/player'

    export default {
        name: 'Dashboard',
        created: function () {
            player.init()
                .then(this.updateTokenQuartzAmount)
                .catch(err => {
                    console.log(err)
                })

            this.$eventHub.$on('web3js-latest', ($event) => {
                this.updateTokenQuartzAmount()
            })
        },
        data: function () {
            return {
                tokenQuartzAmount: 0
            }
        },
        methods: {
            updateTokenQuartzAmount: function () {
                player.getTokenQuartzAmount().then(result => {
                    this.tokenQuartzAmount = result.toNumber()
                })
            }
        }
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

    .btn-outline-display:active {
        color: #343a40 !important;
        background-color: transparent !important;
        border-color: #343a40 !important;
    }
</style>

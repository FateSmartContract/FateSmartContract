<template>
    <div>
        <div class="card summon-card" v-if="!summoning" style="height: inherit">
            <div class="card-body" style="position: relative;">
                <div style="">
                    <h1 class="text-center display-1 summon-title">卡池 001</h1>
                </div>
                <div class="text-center summon-button-div">
                    <div style="display: inline-block">
                        <button type="button" class="btn btn-primary btn-lg btn-summon" @click="summonOne()">
                            召喚 1 回
                        </button>
                        <br/>
                        <span><i class="fas fa-cube"></i> 消耗 方塊 * 3</span>
                    </div>
                    <div style="display: inline-block; margin-left: 25%">
                        <button type="button" class="btn btn-primary btn-lg btn-summon" @click="summonTen()">
                            召喚 10 回
                        </button>
                        <br/>
                        <span><i class="fas fa-cube"></i> 消耗 方塊 * 30</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="card summon-card" v-if="summoning" style="height: inherit" @click="closeSummoningPage()">
            <div class="card-body d-flex" style="position: relative;">
                <div class="container" style="position: absolute; top: 50%; left: 0; transform: translate(0, -50%);">
                    <div class="row justify-content-center">
                        <div class="col-md-2 col-card" v-for="i in summonAmount" style="position: relative;">
                            <img v-holder="'img=256x256?auto=yes&theme=vue&text=%20'" class="img-fluid img-thumbnail">
                            <span class="fa-center">
                                <i class="fas fa-spinner fa-pulse fa-4x"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="w-100" style="position: absolute; bottom: 10%">
                    <h2 class="text-center font-weight-bold mb-0">點擊空白處繼續</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import player from '@/js/player'

    export default {
        name: 'Summon',
        computed: {
            ...mapGetters('game', [
                'summoning',
                'summonAmount',
                'summonResult'
            ])
        },
        methods: {
            summonOne: function () {
                player.summonOne().then((result) => {
                    this.$store.commit('game/beginSummoning', 1)
                })
            },
            summonTen: function () {
                player.summonTen().then((result) => {
                    this.$store.commit('game/beginSummoning', 10)
                })
            },
            closeSummoningPage: function () {
                this.$store.commit('game/endSummoning')
            }
        }
    }
</script>

<style>
    .summon-card {
        background: url('../../assets/summon-background.jpg') no-repeat center center;
        background-size: cover;
    }

    .summon-title {
        color: #fff34f;
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    }

    .btn-summon {
        padding: 18px 28px;
        font-size: 22px;
        line-height: normal;
    }

    .summon-button-div {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        bottom: 10%;
    }

    .col-card {
        padding-top: 15px;
        padding-bottom: 15px;
    }

    .fa-center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>

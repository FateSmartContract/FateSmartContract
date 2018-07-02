<template>
    <div>
        <div v-if="!summoning" class="card summon-card" style="height: inherit">
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
        <div v-else class="card summon-card" style="height: inherit" @click="closeSummoningPage()">
            <div class="card-body d-flex" style="position: relative;">
                <div class="container" style="position: absolute; top: 50%; left: 0; transform: translate(0, -50%);">
                    <div class="row justify-content-center">
                        <div class="col-md-2 col-card" v-for="i in summonAmount" style="position: relative;">
                            <div v-if="canShowCard(i - 1)">
                                <img src="../../assets/card-back.png" class="img-fluid img-thumbnail ">
                                <span class="fa-center">
                                    <i class="fas fa-spinner fa-pulse fa-4x"></i>
                                </span>
                            </div>
                            <div v-else>
                                <img src="../../assets/card-background.png" class="img-fluid img-thumbnail">
                                <span class="fa-center" style="color: white; font-size: 24px;">
                                    {{ summonResult[i - 1] == null ? '000' : summonResult[i - 1].toString().padStart(3, 0) }}
                                </span>
                            </div>
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
        data () {
            return {
                timer: undefined,
                showIndex: 0,
                showCard: []
            }
        },
        computed: {
            ...mapGetters('game', [
                'summoning',
                'summonAmount',
                'summonResult'
            ])
        },
        watch: {
            summonResult: function (result) {
                if (result[0] !== null) {
                    this.timer = setInterval(() => {
                        this.$set(this.showCard, this.showIndex, true)
                        this.showIndex += 1
                        if (!(this.showIndex < this.summonAmount)) {
                            clearInterval(this.timer)
                        }
                    }, 500)
                }
            }
        },
        methods: {
            summonOne: function () {
                player.summonOne().then((result) => {
                    this.initShowData(1)
                    this.$store.commit('game/beginSummoning', 1)
                })
            },
            summonTen: function () {
                player.summonTen().then((result) => {
                    this.initShowData(10)
                    this.$store.commit('game/beginSummoning', 10)
                })
            },
            closeSummoningPage: function () {
                this.$store.commit('game/endSummoning')
            },
            initShowData: function (amount) {
                this.showIndex = 0
                this.showCard = []
                for (let i = 0; i < amount; i++) {
                    this.showCard.push(false)
                }
            },
            canShowCard: function (index) {
                return this.summonResult[index] === null || !this.showCard[index]
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

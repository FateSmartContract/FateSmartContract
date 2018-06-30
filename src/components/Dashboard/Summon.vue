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
        <div class="card" v-if="summoning" style="height: inherit">
            <div class="card-body">
                召喚中...
            </div>
        </div>
    </div>
</template>

<script>
    import player from '@/js/player'

    export default {
        name: 'Summon',
        data () {
            return {
                summoning: false
            }
        },
        methods: {
            summonOne: function () {
                player.summonOne().then((tx) => {
                    this.summoning = true
                }).catch(() => {
                    this.summoning = false
                })
            },
            summonTen: function () {
                player.summonTen().then((tx) => {
                    this.summoning = true
                }).catch(() => {
                    this.summoning = false
                })
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
</style>

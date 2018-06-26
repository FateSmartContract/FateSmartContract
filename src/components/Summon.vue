<template>
    <div class="card summon-card" style="height: calc(100vh - 124px - 2rem)">
        <div class="card-body">
            <div style="height: 60vh">
                <h1 class="text-center display-1 summon-title">卡池 001</h1>
            </div>
            <div class="text-center">
                <div style="display: inline-block">
                    <button type="button" class="btn btn-primary btn-lg" @click="summonOne()">
                        召喚 1 回
                    </button>
                    <br/>
                    <span><i class="fas fa-cube"></i> 消耗 方塊 * 3</span>
                </div>
                <div style="display: inline-block; margin-left: 10vw">
                    <button type="button" class="btn btn-primary btn-lg" @click="summonTen()">
                        召喚 10 回
                    </button>
                    <br/>
                    <span><i class="fas fa-cube"></i> 消耗 方塊 * 30</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import player from '@/js/player'

    export default {
        name: 'Summon',
        methods: {
            summonOne: function () {
                player.summonOne()
            },
            summonTen: function () {
                player.summonTen()
            }
        }
    }
</script>

<style>
    .summon-card {
        background: url('../assets/summon-background.jpg') no-repeat center center;
        background-size: cover;
    }

    .summon-title {
        color: #fff34f;
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    }

</style>

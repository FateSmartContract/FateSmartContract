<template>
    <div class="card">
        <div class="card-body">
            <h2 class="card-title">商店</h2>
            <div class="row">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <div class="media">
                                <i class="mr-3 align-self-center fas fa-cube" style="font-size: 5em;"></i>
                                <div class="media-body">
                                    <h5 class="card-title">方塊 167 個</h5>
                                    <p class="m-0">1 Ether</p>
                                    <span class="btn btn-primary float-right" @click="buyTokenQuartz()">購買</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import player from '@/js/player'

    export default {
        name: 'Store',
        methods: {
            buyTokenQuartz: function () {
                player.buyTokenQuartz()
            }
        }
    }
</script>

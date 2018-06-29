<template>
    <div class="card">
        <div class="card-body" style="overflow: hidden; height: 100%">
            <div class="row">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <div class="media">
                                <i class="mr-3 align-self-center fas fa-cube" style="font-size: 5em;"></i>
                                <div class="media-body">
                                    <h5 class="card-title">方塊 {{ tokenQuartzBuyAmount }} 個</h5>
                                    <p class="m-0">{{ tokenQuartzPrice }} Ether</p>
                                    <span class="btn btn-primary float-right" @click="buyTokenQuartz()">購買</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <h2>購買紀錄</h2>
            <ul class="list-group" style="overflow-y: auto; height: calc(100% - 219px);">
                <li v-for="event in buyTokenQuartzEvent" class="list-group-item d-flex justify-content-between align-items-center" style="min-height: 50px">
                    <span>
                        <code>{{ event.transactionHash }}</code>
                        <a :href="'https://rinkeby.etherscan.io/tx/' + event.transactionHash" target="_blank"><i class="fas fa-receipt"></i></a>
                    </span>
                    <span><i class="fas fa-cube"></i> {{ event.args.amount.toString() }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import player from '@/js/player'

    export default {
        name: 'Store',
        computed: {
            ...mapGetters([
                'tokenQuartzPrice',
                'tokenQuartzBuyAmount',
                'buyTokenQuartzEvent'
            ])
        },
        methods: {
            buyTokenQuartz: function () {
                player.buyTokenQuartz()
            }
        }
    }
</script>

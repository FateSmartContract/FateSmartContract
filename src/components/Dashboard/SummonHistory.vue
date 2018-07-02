<template>
    <div class="card">
        <div class="card-body" style="height: 100%">
            <ul v-if="isLoaded" class="list-group" style="overflow-y: auto; height: 100%">
                <li v-for="id in summonIdList" class="list-group-item" style="min-height: 50px">
                    <span>
                        <code>{{ summonEventTransactionHash(id) }}</code>
                        <a :href="'https://rinkeby.etherscan.io/tx/' + summonEventTransactionHash(id)" target="_blank"><i class="fas fa-receipt"></i></a>
                        <template v-if="summonedEventMap.get(id) !== undefined">
                            <a :href="'https://rinkeby.etherscan.io/tx/' + summonedEventTransactionHash(id)" target="_blank"><i class="fas fa-receipt text-danger"></i></a>
                        </template>
                    </span>
                </li>
            </ul>
            <div v-else class="text-center">
                <i class="fas fa-spinner fa-spin fa-3x"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'SummonHistory',
        computed: {
            ...mapGetters('summonHistory', [
                'isLoaded',
                'summonIdList',
                'summonEventMap',
                'summonedEventMap'
            ])
        },
        methods: {
            summonEventTransactionHash: function (id) {
                return this.summonEventMap.get(id).transactionHash
            },
            summonedEventTransactionHash: function (id) {
                return this.summonedEventMap.get(id).transactionHash
            }
        }
    }
</script>

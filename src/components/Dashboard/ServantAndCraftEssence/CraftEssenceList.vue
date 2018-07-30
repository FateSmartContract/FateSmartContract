<template>
    <div style="overflow-y: scroll; height: calc(100% - 40px);">
        <div v-if="craftEssence !== null" class="container">
            <div class="row">
                <div v-for="id in craftEssence" class="col-sm-2 fgo-card">
                    <card :id="id" type="craftEssence"></card>
                </div>
            </div>
        </div>
        <div v-else class="text-center">
            <i class="fas fa-spinner fa-spin fa-3x"></i>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'CraftEssenceList',
        computed: {
            ...mapGetters('player', [
                'craftEssence'
            ])
        }
    }
</script>

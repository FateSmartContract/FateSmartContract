<template>
    <div style="overflow-y: scroll; height: calc(100% - 40px);">
        <div v-if="craftEssence !== null" class="container">
            <div class="row">
                <div v-for="id in craftEssence" class="col-sm-2 fgo-card">
                    <!--<img src="https://kazemai.github.io/fgo-vz/common/images/Servant/403000_status_servant_1.png" class="img-fluid img-thumbnail"/>-->
                    <img v-holder="'img=256x256?auto=yes&theme=vue&size=24&text=' + id.toString().padStart(3, 0)" class="img-fluid img-thumbnail">
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

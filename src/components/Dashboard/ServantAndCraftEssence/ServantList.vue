<template>
    <div class="row">
        <div class="col-sm-2" style="padding-top: 15px; padding-bottom: 15px" v-for="id in servant">
            <img src="https://kazemai.github.io/fgo-vz/common/images/Servant/403000_status_servant_1.png" class="img-fluid img-thumbnail"/>
        </div>
    </div>
</template>

<script>
    // import player from '@/js/player'

    export default {
        name: 'ServantList',
        data () {
            return {
                servant: []
            }
        },
        created: function () {
            // player.getServant().then(result => {
            //     this.servant = result
            // })
        }
    }
</script>

<style scoped>

</style>

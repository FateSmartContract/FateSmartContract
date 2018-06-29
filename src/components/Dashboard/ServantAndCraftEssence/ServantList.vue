<template>
    <div class="row">
        <div class="col-sm-2" style="padding-top: 15px; padding-bottom: 15px" v-for="id in servant">
            <!--<img src="https://kazemai.github.io/fgo-vz/common/images/Servant/403000_status_servant_1.png" class="img-fluid img-thumbnail"/>-->
            {{ id }}
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'ServantList',
        computed: {
            ...mapGetters([
                'servant'
            ])
        }
    }
</script>

<style scoped>

</style>

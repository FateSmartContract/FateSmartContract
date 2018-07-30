<template>
    <div style="position: relative">
        <img v-if="getCardImage === ''" v-holder="'img=256x256?auto=yes&theme=vue&size=24&text=' + id.toString().padStart(3, 0)" class="img-fluid img-thumbnail">
        <img v-else :src="getCardImage" class="img-fluid img-thumbnail">
        <img v-show="getRarityImage !== ''" :src="getRarityImage" class="img-fluid img-thumbnail overlay"/>
    </div>
</template>

<script>
    import cardData from '@/js/card-data'

    export default {
        name: 'Card',
        props: {
            id: {
                type: Number,
                required: true
            },
            type: {
                type: String,
                required: true
            }
        },
        computed: {
            getCardImage: function () {
                return cardData.getCardImage(this.id, this.type)
            },
            getRarityImage: function () {
                return cardData.getRarityImage(this.id, this.type)
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .overlay {
        position: absolute;
        top: 0;
        background-color: transparent;
    }
</style>

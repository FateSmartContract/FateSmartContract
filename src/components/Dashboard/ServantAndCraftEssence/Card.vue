<template>
    <div style="position: relative">
        <img v-holder="'img=256x256?auto=yes&theme=vue&size=24&text=' + id.toString().padStart(3, 0)" class="img-fluid img-thumbnail">
        <img :src="getRarityImagePath()" class="img-fluid img-thumbnail overlay"/>
    </div>
</template>

<script>
    import cardData from '@/js/card-data'

    export default {
        name: 'Card',
        props: [
            'id',
            'type'
        ],
        methods: {
            getRarityImagePath: cardData.getRarityImagePath
        }
    }
</script>

<style scoped>
    .overlay {
        position: absolute;
        top: 0;
        background-color: transparent;
    }
</style>

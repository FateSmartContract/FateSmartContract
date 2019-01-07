<template>
    <div>
        <navbar></navbar>
        <router-view class="mt-2"></router-view>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar'

    export default {
        name: 'app',
        components: {Navbar}
    }
</script>


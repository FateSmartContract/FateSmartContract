import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import HowItWorks from '@/components/HowItWorks'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/how-it-works',
            name: 'how-it-works',
            component: HowItWorks
        }
    ]
})

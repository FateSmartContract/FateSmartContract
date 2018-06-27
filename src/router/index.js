import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import QA from '@/components/QA'
import HowItWorks from '@/components/HowItWorks'

import Dashboard from '@/components/Dashboard/Index'
import Summon from '@/components/Dashboard/Summon'
import Store from '@/components/Dashboard/Store'
import SummonHistory from '@/components/Dashboard/SummonHistory'

import ServantAndCraftEssence from '@/components/Dashboard/ServantAndCraftEssence/Index'
import ServantList from '@/components/Dashboard/ServantAndCraftEssence/ServantList'
import CraftEssenceList from '@/components/Dashboard/ServantAndCraftEssence/CraftEssenceList'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/q-and-a',
            name: 'q-and-a',
            component: QA
        },
        {
            path: '/how-it-works',
            name: 'how-it-works',
            component: HowItWorks
        },
        {
            path: '/dashboard',
            redirect: 'dashboard/servant-and-craft-essence',
            name: 'dashboard',
            component: Dashboard,
            children: [
                {
                    path: 'servant-and-craft-essence',
                    redirect: 'servant-and-craft-essence/servant',
                    name: 'servant-and-craft-essence',
                    component: ServantAndCraftEssence,
                    children: [
                        {
                            path: 'servant',
                            name: 'servant',
                            component: ServantList
                        },
                        {
                            path: 'craft-essence',
                            name: 'craft-essence',
                            component: CraftEssenceList
                        }
                    ]
                },
                {
                    path: 'summon',
                    name: 'summon',
                    component: Summon
                },
                {
                    path: 'store',
                    name: 'store',
                    component: Store
                },
                {
                    path: 'summon-history',
                    name: 'summon-history',
                    component: SummonHistory
                }
            ]
        }
    ]
})

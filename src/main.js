// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueHolder from 'vue-holderjs'
import App from './App'
import Web3 from 'web3'
import router from './router'

import player from '@/js/player'

Vue.use(Vuex)
Vue.use(VueHolder)

let store
let isInitWeb3 = false

window.addEventListener('load', function () {
    store = initStore()

    /* eslint-disable no-new */
    new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: {App}
    })

    router.afterEach((to, from) => {
        if (to.redirectedFrom === '/dashboard') {
            initWeb3()
        }
    })

    if (router.currentRoute.path.startsWith('/dashboard')) {
        initWeb3()
    }
})

function initWeb3 () {
    if (isInitWeb3) {
        return
    }
    isInitWeb3 = true

    if (typeof web3 !== 'undefined') {
        console.log('Web3 injected browser: OK.')
        window.web3 = new Web3(window.web3.currentProvider)
    } else {
        console.log('Web3 injected browser: Fail. You should consider trying MetaMask.')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
        // FIXME: if no local node can use ?
    }

    if (typeof window.web3 !== 'undefined') {
        player.init().then(function () {
            store.dispatch('web3UpdateTokenQuartzPriceInWei')
            store.dispatch('web3UpdateTokenQuartzBuyAmount')
            store.dispatch('web3UpdateTokenQuartzAmount')
            store.dispatch('web3UpdateServant')
            store.dispatch('web3UpdateCraftEssence')

            // 取得過去發生的 event
            // player.instance.SummonedEvent({}, {
            //     fromBlock: 0, toBlock: 'latest'
            // }).get(function (error, result) {
            //     if (error) {
            //         console.log(`Watch error: ${error}`)
            //     } else {
            //         console.log(result)
            //     }
            // })
        })

        const filter = window.web3.eth.filter('latest')
        filter.watch((err, res) => {
            if (err) {
                console.log(`Watch error: ${err}`)
            } else {
                store.dispatch('web3UpdateTokenQuartzAmount')
            }
        })
    }
}

function initStore () {
    return new Vuex.Store({
        state: {
            tokenQuartzPrice: null,
            tokenQuartzBuyAmount: null,
            tokenQuartzAmount: null,
            servant: [],
            craftEssence: []
        },
        getters: {
            tokenQuartzPrice: state => state.tokenQuartzPrice,
            tokenQuartzBuyAmount: state => state.tokenQuartzBuyAmount,
            tokenQuartzAmount: state => state.tokenQuartzAmount,
            servant: state => state.servant,
            craftEssence: state => state.craftEssence
        },
        mutations: {
            setTokenQuartzPriceInWei (state, priceInWei) {
                state.tokenQuartzPrice = window.web3.fromWei(priceInWei, 'ether').toNumber()
            },
            setTokenQuartzBuyAmount (state, amount) {
                state.tokenQuartzBuyAmount = amount.toNumber()
            },
            setTokenQuartzAmount (state, amount) {
                state.tokenQuartzAmount = amount
            },
            setServant (state, _servant) {
                state.servant = _servant
            },
            setCraftEssence (state, _craftEssence) {
                state.craftEssence = _craftEssence
            }
        },
        actions: {
            web3UpdateTokenQuartzPriceInWei ({commit, state}) {
                player.getTokenQuartzPriceInWei().then(result => {
                    commit('setTokenQuartzPriceInWei', result)
                })
            },
            web3UpdateTokenQuartzBuyAmount ({commit, state}) {
                player.getTokenQuartzBuyAmount().then(result => {
                    commit('setTokenQuartzBuyAmount', result)
                })
            },
            web3UpdateTokenQuartzAmount ({commit, state}) {
                player.getTokenQuartzAmount().then(result => {
                    commit('setTokenQuartzAmount', result)
                })
            },
            web3UpdateServant ({commit, state}) {
                player.getServant().then(result => {
                    commit('setServant', result)
                })
            },
            web3UpdateCraftEssence ({commit, state}) {
                player.getCraftEssence().then(result => {
                    commit('setCraftEssence', result)
                })
            }
        }
    })
}

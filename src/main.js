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

    // 直到進入 /dashboard 才初始化 web3
    router.afterEach((to, from) => {
        if (to.redirectedFrom === '/dashboard') {
            initWeb3()
        }
    })

    // 如果直接進入 /dashboard ，也初始化 web3
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
        player.init().then(initDataAndRegisterEvent)

        // 每 2000 ms 檢查帳號是否有切換
        // TODO: 順便偵測 network id (希望取得 network id 不會負擔太重)
        // TODO: 提出成 function
        // https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#ear-listening-for-selected-account-changes
        let account = window.web3.eth.accounts[0]
        setInterval(function () {
            if (window.web3.eth.accounts[0] !== account) {
                location.reload()
            }
        }, 2000)
    }
}

function initDataAndRegisterEvent () {
    store.dispatch('web3UpdateTokenQuartzPriceInWei')
    store.dispatch('web3UpdateTokenQuartzBuyAmount')
    store.dispatch('web3UpdateTokenQuartzAmount')
    store.dispatch('web3UpdateServant')
    store.dispatch('web3UpdateCraftEssence')
    store.dispatch('web3UpdateBuyTokenQuartzEvent')

    registerEvent()
}

function registerEvent () {
    player.instance.BuyTokenQuartz({
        playerAddress: window.web3.eth.accounts[0]
    }, function (err, result) {
        if (err) {
            console.log(`Watch error: ${err}`)
        } else {
            store.commit('addBuyTokenQuartzEvent', result)
            store.dispatch('web3UpdateTokenQuartzAmount')
        }
    })
}

// TODO: 切開成多個 module
function initStore () {
    return new Vuex.Store({
        state: {
            tokenQuartzPrice: null,
            tokenQuartzBuyAmount: null,
            tokenQuartzAmount: null,
            servant: [],
            craftEssence: [],
            buyTokenQuartzEvent: null
        },
        getters: {
            tokenQuartzPrice: state => state.tokenQuartzPrice,
            tokenQuartzBuyAmount: state => state.tokenQuartzBuyAmount,
            tokenQuartzAmount: state => state.tokenQuartzAmount,
            servant: state => state.servant,
            craftEssence: state => state.craftEssence,
            buyTokenQuartzEvent: state => state.buyTokenQuartzEvent
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
            },
            setBuyTokenQuartzEvent (state, _buyTokenQuartzEventList) {
                state.buyTokenQuartzEvent = _buyTokenQuartzEventList
            },
            addBuyTokenQuartzEvent (state, _buyTokenQuartzEvent) {
                let length = state.buyTokenQuartzEvent.length
                if (length > 0 &&
                    state.buyTokenQuartzEvent[length - 1].transactionHash === _buyTokenQuartzEvent.transactionHash) {
                    return
                }

                if (state.buyTokenQuartzEvent === null) {
                    state.buyTokenQuartzEvent = []
                }

                state.buyTokenQuartzEvent.push(_buyTokenQuartzEvent)
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
            },
            web3UpdateBuyTokenQuartzEvent ({commit, state}) {
                player.instance.BuyTokenQuartz({
                    playerAddress: window.web3.eth.accounts[0]
                }, {
                    fromBlock: 0, toBlock: 'latest'
                }).get(function (error, result) {
                    if (error) {
                        console.log(`Watch error: ${error}`)
                    } else {
                        commit('setBuyTokenQuartzEvent', result)
                    }
                })
            }
        }
    })
}

/* eslint-disable no-unused-vars */
function sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/*
async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two second later');
}
 */

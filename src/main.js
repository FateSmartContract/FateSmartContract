// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueHolder from 'vue-holderjs'
import Web3 from 'web3'

import router from './router'
import store from './store'

import App from './App'
import player from '@/js/player'

import Card from '@/components/Dashboard/ServantAndCraftEssence/Card.vue'

Vue.use(VueHolder)

let isInitWeb3 = false

window.addEventListener('load', function () {
    Vue.component('card', Card)

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
    store.dispatch('game/web3UpdateTokenQuartzPriceInWei')
    store.dispatch('game/web3UpdateTokenQuartzBuyAmount')
    store.dispatch('player/web3UpdateTokenQuartzAmount')
    store.dispatch('player/web3UpdateServant')
    store.dispatch('player/web3UpdateCraftEssence')
    store.dispatch('player/web3UpdateBuyTokenQuartzEvent')
    store.dispatch('summonHistory/web3UpdateSummonEvent')
    store.dispatch('summonHistory/web3UpdateSummonedEvent')

    registerEvent()
}

function registerEvent () {
    player.instance.BuyTokenQuartz({
        playerAddress: window.web3.eth.accounts[0]
    }, function (err, result) {
        if (err) {
            console.log(`Watch error: ${err}`)
        } else {
            store.commit('player/addBuyTokenQuartzEvent', result)
            store.dispatch('player/web3UpdateTokenQuartzAmount')
        }
    })

    player.instance.SummonEvent({
        playerAddress: window.web3.eth.accounts[0]
    }, function (err, result) {
        if (err) {
            console.log(`Watch error: ${err}`)
        } else {
            store.commit('game/setSummoningHash', result.args.hash)
            store.commit('summonHistory/addSummonEvent', result)
            store.dispatch('player/web3UpdateTokenQuartzAmount')
        }
    })

    player.instance.SummonedEvent({
        playerAddress: window.web3.eth.accounts[0]
    }, function (err, result) {
        if (err) {
            console.log(`Watch error: ${err}`)
        } else {
            store.commit('game/setSummoningResult', {
                hash: result.args.hash,
                result: result.args.results.map(e => e.toNumber()),
                resultType: result.args.cardType.map(e => e.toNumber())
            })
            store.commit('summonHistory/addSummonedEvent', result)

            store.dispatch('player/web3UpdateServant')
            store.dispatch('player/web3UpdateCraftEssence')
        }
    })
}

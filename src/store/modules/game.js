import player from '@/js/player'

// initial state
const state = {
    tokenQuartzPrice: null,
    tokenQuartzBuyAmount: null
}

// getters
const getters = {
    tokenQuartzPrice: state => state.tokenQuartzPrice,
    tokenQuartzBuyAmount: state => state.tokenQuartzBuyAmount
}

// mutations
const mutations = {

    setTokenQuartzPriceInWei (state, priceInWei) {
        state.tokenQuartzPrice = window.web3.fromWei(priceInWei, 'ether').toNumber()
    },
    setTokenQuartzBuyAmount (state, amount) {
        state.tokenQuartzBuyAmount = amount.toNumber()
    }
}

// actions
const actions = {
    web3UpdateTokenQuartzPriceInWei ({commit, state}) {
        player.getTokenQuartzPriceInWei().then(result => {
            commit('setTokenQuartzPriceInWei', result)
        })
    },
    web3UpdateTokenQuartzBuyAmount ({commit, state}) {
        player.getTokenQuartzBuyAmount().then(result => {
            commit('setTokenQuartzBuyAmount', result)
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

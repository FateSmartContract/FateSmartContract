import player from '@/js/player'

// initial state
const state = {
    tokenQuartzPrice: null,
    tokenQuartzBuyAmount: null,
    summoning: false,
    summonAmount: 0,
    summonHash: 0,
    summonResult: [],
    summonType: []
}

// getters
const getters = {
    tokenQuartzPrice: state => state.tokenQuartzPrice,
    tokenQuartzBuyAmount: state => state.tokenQuartzBuyAmount,
    summoning: state => state.summoning,
    summonAmount: state => state.summonAmount,
    summonResult: state => state.summonResult,
    summonType: state => state.summonType
}

// mutations
const mutations = {
    setTokenQuartzPriceInWei (state, priceInWei) {
        state.tokenQuartzPrice = window.web3.fromWei(priceInWei, 'ether').toNumber()
    },
    setTokenQuartzBuyAmount (state, amount) {
        state.tokenQuartzBuyAmount = amount.toNumber()
    },
    beginSummoning (state, amount) {
        state.summoning = true
        state.summonAmount = amount

        state.summonResult = []
        state.summonType = []
        for (let i = 0; i < amount; i++) {
            state.summonResult.push(null)
            state.summonType.push(null)
        }
    },
    setSummoningHash (state, hash) {
        state.summonHash = hash
    },
    setSummoningResult (state, {hash, result, resultType}) {
        if (hash.comparedTo(state.summonHash) === 0) {
            state.summonResult = result
            state.summonType = resultType
        }
    },
    endSummoning (state) {
        state.summoning = false
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

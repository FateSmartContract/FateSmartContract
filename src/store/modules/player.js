import player from '@/js/player'

// initial state
const state = {
    tokenQuartzAmount: null,
    servant: null,
    craftEssence: null,
    buyTokenQuartzEvent: null
}

// getters
const getters = {
    tokenQuartzAmount: state => state.tokenQuartzAmount,
    servant: state => state.servant,
    craftEssence: state => state.craftEssence,
    buyTokenQuartzEvent: state => state.buyTokenQuartzEvent
}

// mutations
const mutations = {
    setTokenQuartzAmount (state, amount) {
        state.tokenQuartzAmount = amount
    },
    setServant (state, _servantList) {
        state.servant = _servantList
    },
    setCraftEssence (state, _craftEssenceList) {
        state.craftEssence = _craftEssenceList
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
}

// actions
const actions = {
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

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

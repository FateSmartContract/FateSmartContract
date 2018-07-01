import player from '@/js/player'

// initial state
const state = {
    summonEvent: null,
    summonedEvent: null
}

// getters
const getters = {
    summonEvent: state => state.summonEvent,
    summonedEvent: state => state.summonedEvent
}

// mutations
const mutations = {
    setSummonEvent (state, _summonEventList) {
        state.summonEvent = _summonEventList
    },
    addSummonEvent (state, _summonEvent) {
        let length = state.summonEvent.length
        if (length > 0 &&
            state.summonEvent[length - 1].transactionHash === _summonEvent.transactionHash) {
            return
        }

        if (state.summonEvent === null) {
            state.summonEvent = []
        }

        state.summonEvent.push(_summonEvent)
    },
    setSummonedEvent (state, _summonedEventList) {
        state.summonedEvent = _summonedEventList
    },
    addSummonedEvent (state, _summonedEvent) {
        let length = state.summonedEvent.length
        if (length > 0 &&
            state.summonedEvent[length - 1].transactionHash === _summonedEvent.transactionHash) {
            return
        }

        if (state.summonedEvent === null) {
            state.summonedEvent = []
        }

        state.summonedEvent.push(_summonedEvent)
    }
}

// actions
const actions = {
    web3UpdateSummonEvent ({commit, state}) {
        player.instance.SummonEvent({
            playerAddress: window.web3.eth.accounts[0]
        }, {
            fromBlock: 0, toBlock: 'latest'
        }).get(function (error, result) {
            if (error) {
                console.log(`Watch error: ${error}`)
            } else {
                commit('setSummonEvent', result)
            }
        })
    },
    web3UpdateSummonedEvent ({commit, state}) {
        player.instance.SummonedEvent({
            playerAddress: window.web3.eth.accounts[0]
        }, {
            fromBlock: 0, toBlock: 'latest'
        }).get(function (error, result) {
            if (error) {
                console.log(`Watch error: ${error}`)
            } else {
                commit('setSummonedEvent', result)
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

import player from '@/js/player'

// initial state
const state = {
    summonIdList: null,
    // 以 summonId 為 key 的 Map
    summonEventMap: null,
    summonedEventMap: null
}

function initSummonIdList () {
    if (state.summonIdList === null) {
        state.summonIdList = []
    }
}

function initSummonEventMap () {
    if (state.summonEventMap === null) {
        state.summonEventMap = new Map()
    }
}

function initSummonedEventMap () {
    if (state.summonedEventMap === null) {
        state.summonedEventMap = new Map()
    }
}

// getters
const getters = {
    isLoaded: state => state.summonIdList !== null && state.summonEventMap !== null && state.summonedEventMap !== null,
    summonIdList: state => state.summonIdList
}

// mutations
const mutations = {
    initSummonEvent (state, summonEventList) {
        initSummonIdList()
        initSummonEventMap()
        summonEventList.forEach((event) => {
            let id = window.web3.toHex(event.args.hash)
            state.summonIdList.push(id)
            state.summonEventMap.set(id, event)
        })
    },
    addSummonEvent (state, event) {
        initSummonIdList()
        initSummonEventMap()
        let id = window.web3.toHex(event.args.hash)
        if (state.summonEventMap.get(id) === undefined) {
            state.summonIdList.push(id)
            state.summonEventMap.set(id, event)
        }
    },
    initSummonedEvent (state, summonedEventList) {
        initSummonIdList()
        initSummonedEventMap()
        summonedEventList.forEach((event) => {
            let id = window.web3.toHex(event.args.hash)
            state.summonedEventMap.set(id, event)
        })
    },
    addSummonedEvent (state, event) {
        initSummonIdList()
        initSummonedEventMap()
        let id = window.web3.toHex(event.args.hash)
        if (state.summonedEventMap.get(id) === undefined) {
            state.summonedEventMap.set(id, event)
        }
    }
}

// actions
const actions = {
    web3UpdateSummonEvent ({commit, state}) {
        player.getAllSummonEvent().then(function (result) {
            commit('initSummonEvent', result)
        })
    },
    web3UpdateSummonedEvent ({commit, state}) {
        player.getAllSummonedEvent().then(function (result) {
            commit('initSummonedEvent', result)
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

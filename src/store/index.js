import Vue from 'vue'
import Vuex from 'vuex'

import game from './modules/game'
import player from './modules/player'
import summonHistory from './modules/summonHistory'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        game,
        player,
        summonHistory
    }
})

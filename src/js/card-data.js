const servantCSV = require('@/assets/data/servant.csv')
const craftEssenceCSV = require('@/assets/data/craftEssence.csv')
const data = {
    servant: servantCSV.reduce(function (map, servant) {
        map[servant.id] = servant
        return map
    }, {}),
    craftEssence: craftEssenceCSV.reduce(function (map, craftEssence) {
        map[craftEssence.id] = craftEssence
        return map
    }, {})
}

const cardData = {

    getCardImage: function (id, type) {
        let card = data[type][id]
        if (card === undefined) {
            return ''
        }

        return '/static/image/' + type + '/' + card['imageName']
    },

    getRarityImage: function (id, type) {
        let card = data[type][id]
        if (card === undefined) {
            return ''
        }

        return '/static/image/' + card['rarity'] + '.png'
    }

}

export default cardData

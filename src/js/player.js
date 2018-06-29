import contract from 'truffle-contract'
import FateSmartContractSummon from '@contracts/FateSmartContractSummon.json'

const Player = {

    contract: null,

    instance: null,

    tokenQuartzPriceInWei: null,

    init: function () {
        let self = this

        return new Promise(function (resolve, reject) {
            self.contract = contract(FateSmartContractSummon)
            self.contract.setProvider(window.web3.currentProvider)

            self.contract.deployed().then(instance => {
                self.instance = instance
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },

    getTokenQuartzAmount: function () {
        let self = this

        return new Promise((resolve, reject) => {
            self.instance.getTokenQuartzAmount.call(
                window.web3.eth.accounts[0],
                {from: window.web3.eth.accounts[0]}
            ).then(result => {
                resolve(result.toNumber())
            }).catch(err => {
                reject(err)
            })
        })
    },

    getServant: function () {
        let self = this

        return new Promise((resolve, reject) => {
            self.instance.getServant.call(
                window.web3.eth.accounts[0],
                {from: window.web3.eth.accounts[0]}
            ).then(result => {
                resolve(result.map(n => n.toNumber()))
            }).catch(err => {
                reject(err)
            })
        })
    },

    getCraftEssence: function () {
        let self = this

        return new Promise((resolve, reject) => {
            self.instance.getCraftEssence.call(
                window.web3.eth.accounts[0],
                {from: window.web3.eth.accounts[0]}
            ).then(result => {
                resolve(result.map(n => n.toNumber()))
            }).catch(err => {
                reject(err)
            })
        })
    },

    getTokenQuartzPriceInWei: function () {
        let self = this

        return new Promise((resolve, reject) => {
            self.instance.getTokenQuartzPriceInWei.call(
                {from: window.web3.eth.accounts[0]}
            ).then(result => {
                self.tokenQuartzPriceInWei = result
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    },

    getTokenQuartzBuyAmount: function () {
        let self = this

        return new Promise((resolve, reject) => {
            self.instance.getTokenQuartzBuyAmount.call(
                {from: window.web3.eth.accounts[0]}
            ).then(result => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    },

    buyTokenQuartz: function () {
        let self = this

        return new Promise((resolve, reject) => {
            self.instance.buyTokenQuartz(
                {
                    from: window.web3.eth.accounts[0],
                    value: self.tokenQuartzPriceInWei
                }
            ).then(tx => {
                resolve(tx)
            }).catch(err => {
                reject(err)
            })
        })
    },

    summonOne: function () {
        let self = this

        return new Promise((resolve, reject) => {
            self.instance.summonOne(
                {from: window.web3.eth.accounts[0]}
            ).then(tx => {
                resolve(tx)
            }).catch(err => {
                reject(err)
            })
        })
    },

    summonTen: function () {
        let self = this

        return new Promise((resolve, reject) => {
            self.instance.summonTen(
                {from: window.web3.eth.accounts[0]}
            ).then(tx => {
                resolve(tx)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default Player

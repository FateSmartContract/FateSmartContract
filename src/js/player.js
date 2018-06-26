import contract from 'truffle-contract'
import FateSmartContractSummon from '@contracts/FateSmartContractSummon.json'

const Player = {

    contract: null,

    instance: null,

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
            ).then(tx => {
                resolve(tx)
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
            ).then(tx => {
                resolve(tx)
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
            ).then(tx => {
                resolve(tx)
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
                    value: window.web3.toWei('1', 'ether')
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

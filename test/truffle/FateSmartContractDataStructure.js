/* eslint-disable no-undef */
let fateContract = artifacts.require('./FateSmartContractSummon.sol')

/* eslint-disable no-undef */
contract('[JS] Fate Smart Contract Data Structure', function (accounts) {
    it('一單的價格預設是 0.09 ether', function () {
        return fateContract.deployed().then(function (instance) {
            return instance.getTokenQuartzPriceInWei.call({from: accounts[0]})
        }).then(function (priceInWei) {
            assert.equal(priceInWei, web3.toWei('0.09', 'ether'))
        })
    })

    it('一單石頭數預設是 167 顆方塊', function () {
        return fateContract.deployed().then(function (instance) {
            return instance.getTokenQuartzBuyAmount.call({from: accounts[0]})
        }).then(function (amount) {
            assert.equal(amount.valueOf(), 167)
        })
    })

    it('設定一單石頭數為 200 顆方塊', function () {
        return fateContract.deployed().then(function (instance) {
            fateContractInstance = instance

            return fateContractInstance.setTokenQuartzBuyAmount.sendTransaction(200, {from: accounts[0]})
        }).then(function () {
            return fateContractInstance.getTokenQuartzBuyAmount.call({from: accounts[0]})
        }).then(function (amount) {
            assert.equal(amount.valueOf(), 200)
        })
    })

    it('設定一單的價格為 0.01 ether', function () {
        return fateContract.deployed().then(function (instance) {
            fateContractInstance = instance

            return fateContractInstance.setTokenQuartzPriceInWei.sendTransaction(web3.toWei('0.01', 'ether'), {from: accounts[0]})
        }).then(function () {
            return fateContractInstance.getTokenQuartzPriceInWei.call({from: accounts[0]})
        }).then(function (priceInWei) {
            assert.equal(priceInWei, web3.toWei('0.01', 'ether'))
        })
    })

    // creator 是部屬合約的帳號
    it('只有 creator 能設定價格與石頭數', function () {
        let fateContractInstance

        return fateContract.deployed().then(function (instance) {
            fateContractInstance = instance
        }).then(function () {
            let errorFlag = false
            return fateContractInstance.setTokenQuartzBuyAmount.sendTransaction(200, {from: accounts[1]})
                .catch(function (error) {
                    assert.equal(error.message, 'VM Exception while processing transaction: revert')
                    errorFlag = true
                }).then(function () {
                    assert(errorFlag)
                })
        }).then(function () {
            let errorFlag = false
            return fateContractInstance.setTokenQuartzPriceInWei.sendTransaction(web3.toWei('0.01', 'ether'), {from: accounts[1]})
                .catch(function (error) {
                    assert.equal(error.message, 'VM Exception while processing transaction: revert')
                    errorFlag = true
                }).then(function () {
                    assert(errorFlag)
                })
        })
    })
})

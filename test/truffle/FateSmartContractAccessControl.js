/* eslint-disable no-undef */
let fateContract = artifacts.require('./FateSmartContractSummon.sol')

/* eslint-disable no-undef */
contract('[JS] Fate Smart Contract Access Control', function (accounts) {
    it('Creator 應該是 account[0]', function () {
        return fateContract.deployed().then(function (instance) {
            return instance.getCreator.call({from: accounts[0]})
        }).then(function (result) {
            assert.equal(result, accounts[0])
        })
    })

    it('預設 pause 為 false', function () {
        return fateContract.deployed().then(function (instance) {
            return instance.getPause.call({from: accounts[0]})
        }).then(function (result) {
            assert.isFalse(result)
        })
    })

    it('設定 pause 為 true', function () {
        let fateContractInstance

        return fateContract.deployed().then(function (instance) {
            fateContractInstance = instance

            return fateContractInstance.setPause.sendTransaction(true, {from: accounts[0]})
        }).then(function () {
            return fateContractInstance.getPause.call({from: accounts[0]})
        }).then(function (result) {
            assert.isTrue(result)
        })
    })
})

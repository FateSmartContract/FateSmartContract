/* eslint-disable no-undef */
var FateSmartContractSummon = artifacts.require('./FateSmartContractSummon.sol')

/* eslint-disable no-undef */
contract('[JS]TestFateSmartContractSummons', function (accounts) {
    it('TokenQuartzBuyAmount should equal 167', function () {
        return FateSmartContractSummon.deployed().then(function (instance) {
            return instance.getTokenQuartzBuyAmount.call({from: accounts[0]})
        }).then(function (amount) {
            assert.equal(amount.valueOf(), 167, 'TokenQuartzBuyAmount != 167')
        })
    })
})

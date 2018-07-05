let FateSmartContractSummon = artifacts.require('./FateSmartContractSummon.sol')

module.exports = function (deployer, network, accounts) {
    if (network === 'development') {
        // seed data
        // 幫 account[2] 購買 1 單，再進行 20 抽
        let instance

        deployer.then(function () {
            return FateSmartContractSummon.deployed()
        }).then(function (_instance) {
            instance = _instance

            return instance.buyTokenQuartz({
                from: accounts[2],
                value: web3.toWei('0.09', 'ether')
            })
        }).then(function () {
            return instance.summonTen({
                from: accounts[2]
            })
        }).then(function () {
            return instance.summonTen({
                from: accounts[2]
            })
        })
    }
}

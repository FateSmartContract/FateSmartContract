let FateSmartContractSummon = artifacts.require('./FateSmartContractSummon.sol')

module.exports = function (deployer, network, accounts) {
    if (network === 'development') {
        console.log('[Debug]', 'web3.version.api:', web3.version.api)

        // seeding data
        deployer.then(function () {
            return FateSmartContractSummon.deployed()
        }).then(async function (instance) {
            console.log('[Debug]', '使用 accounts[0] 設定 accounts[9] 可以回復抽卡結果')
            await web3.personal.unlockAccount(accounts[0])
            await instance.setDealer(accounts[9], true, {
                from: accounts[0]
            })

            return instance
        }).then(async function (instance) {
            console.log('[Debug]', '使用 accounts[2] 購買 1 單，再進行 20 抽')
            await buyOneAndSummon(instance, accounts[2], 2)

            return instance
        }).then(async function (instance) {
            console.log('[Debug]', '使用 accounts[3] 購買 1 單，再進行 10 抽')
            await buyOneAndSummon(instance, accounts[3], 1)

            console.log('[Debug]', '使用 accounts[9] 回覆 accounts[3] 抽卡結果，但是故意回覆所有卡片')
            let summonEvent = instance.SummonEvent({
                playerAddress: accounts[3]
            }, {
                fromBlock: 0,
                toBlock: 'latest'
            })

            let logs = await new Promise(function (resolve, reject) {
                summonEvent.get(function (error, logs) {
                    if (error) {
                        reject(error)
                    }
                    resolve(logs)
                })
            })

            let hash = logs[0].args.hash
            await web3.personal.unlockAccount(accounts[9])
            await instance.summonCallback(hash, accounts[3],
                [2, 8, 76, 60, 77, 84, 85, 119, 65, 99, 118, 37, 62, 113, 75, 52, 97, 98, 59, 3, 5, 6, 10, 11, 14, 101, 121, 122, 123, 18, 78, 87, 102, 140, 29, 30, 66, 94, 67, 74, 100, 103, 120, 41, 46, 109, 47, 48, 58, 82, 89, 116, 7, 9, 72, 126, 13, 15, 63, 95, 105, 125, 17, 20, 22, 64, 71, 23, 26, 27, 28, 31, 32, 35, 38, 79, 80, 104, 42, 81, 110, 117, 124, 49, 55, 56, 31, 32, 33, 34, 35, 40, 48, 57, 58, 67, 75, 97, 175, 188, 185, 263, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 39, 38, 47, 56, 66, 73, 74, 98, 176, 182, 183, 184, 186, 264, 333, 92, 90, 89, 91, 93, 94, 95, 96, 331, 332, 243, 244, 245, 246, 247, 265],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                {from: accounts[9]}
            )

            return instance
        })
    }
}

async function buyOneAndSummon (instance, account, times) {
    await web3.personal.unlockAccount(account)

    await instance.buyTokenQuartz({
        from: account,
        value: web3.toWei('0.09', 'ether')
    })

    for (let i = 0; i < times; i++) {
        await instance.summonTen({from: account})
    }
}

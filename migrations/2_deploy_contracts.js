var FateSmartContractSummon = artifacts.require("./FateSmartContractSummon.sol");

module.exports = function (deployer) {
    deployer.deploy(FateSmartContractSummon);
};

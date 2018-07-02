pragma solidity ^0.4.15;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../../contracts/FateSmartContractSummon.sol";

contract TestFateSmartContractSummon {

    function testInitTokenQuartzBuyAmount() public {
        FateSmartContractSummon fate = FateSmartContractSummon(DeployedAddresses.FateSmartContractSummon());

        uint256 expectedTokenQuartzBuyAmount = 167;

        Assert.equal(fate.getTokenQuartzBuyAmount(), expectedTokenQuartzBuyAmount, "TokenQuartzBuyAmount should equals 167");
    }

}

pragma solidity ^0.4.23;


import "./FateSmartContractDataStructure.sol";


contract FateSmartContractSummon is FateSmartContractDataStructure {

    event SummonEvent(address playerId, uint256 _amount);

    function summonOne() public {
        summon(1);
    }

    function summonTen() public {
        summon(10);
    }

    function summon(uint256 amount) internal notPause {
        require(amount > 0);
        require(players[msg.sender].tokenQuartzAmount >= amount * 3);
        players[msg.sender].tokenQuartzAmount -= amount * 3;


        emit SummonEvent(msg.sender, amount);
        // + hash ?
    }

    function _summonCallback(address playerAddress, uint256[] results, uint256[] cardType) external onlyCreator {
        require(results.length == cardType.length);

        for (uint256 i = 0; i < results.length; i++) {
            if (cardType[i] == 0) {
                players[playerAddress].servant.push(results[i]);
            } else {
                players[playerAddress].craftEssence.push(results[i]);
            }
        }

        // event (hash ?)
    }
}

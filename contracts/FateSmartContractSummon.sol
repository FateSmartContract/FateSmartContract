pragma solidity ^0.4.23;


import "./FateSmartContractDataStructure.sol";


contract FateSmartContractSummon is FateSmartContractDataStructure {

    mapping(uint256 => uint256) public responses;

    event SummonEvent(uint256 indexed hash, address indexed playerAddress, uint256 amount);
    event SummonedEvent(uint256 indexed hash, address indexed playerAddress, uint256[] results, uint256[] cardType);

    function summonOne() public {
        summon(1);
    }

    function summonTen() public {
        summon(10);
    }

    function summon(uint256 amount) internal notPause returns (uint256) {
        require(amount > 0);
        require(players[msg.sender].tokenQuartzAmount >= amount * 3);
        players[msg.sender].tokenQuartzAmount -= amount * 3;

        uint256 hash = uint256(keccak256(abi.encodePacked(block.number, now, amount, msg.sender)));

        responses[hash] = 1;
        emit SummonEvent(hash, msg.sender, amount);

        return hash;
    }

    function summonCallback(uint256 hash, address playerAddress, uint256[] results, uint256[] cardType) external onlyCreator {
        require(responses[hash] == 1);
        require(results.length == cardType.length);

        for (uint256 i = 0; i < results.length; i++) {
            if (cardType[i] == 0) {
                players[playerAddress].servant.push(results[i]);
            } else {
                players[playerAddress].craftEssence.push(results[i]);
            }
        }

        responses[hash] = 2;
        emit SummonedEvent(hash, playerAddress, results, cardType);
    }
}

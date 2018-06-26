pragma solidity ^0.4.23;


import "./FateSmartContractAccessControl.sol";


contract FateSmartContractDataStructure is FateSmartContractAccessControl {

    struct Player {
        uint256 tokenQuartzAmount;
        uint256[] servant;
        uint256[] craftEssence;
    }

    mapping(address => Player) public players;

    function getTokenQuartzAmount(address playerAddress) public view returns (uint256) {
        return players[playerAddress].tokenQuartzAmount;
    }

    function getServant(address playerAddress) public view returns (uint256[]) {
        return players[playerAddress].servant;
    }

    function getCraftEssence(address playerAddress) public view returns (uint256[]) {
        return players[playerAddress].craftEssence;
    }

    function addTokenQuartzAmount(address playerAddress, uint256 amount) public onlyCreator notPause {
        players[playerAddress].tokenQuartzAmount += amount;
    }

    function buyTokenQuartz() public payable {
        require(msg.value == 1 ether);
        players[msg.sender].tokenQuartzAmount += 167; // TODO: overflow check ?
    }
}

pragma solidity ^0.4.0;


import "./FateSmartContractAccessControl.sol";


contract FateSmartContractDataStructure is FateSmartContractAccessControl {

    struct Player {
        uint256 tokenQuartzAmount;
        uint256[] servant;
        uint256[] craftEssence;
    }

    mapping(address => Player) public players;

//    function getTokenQuartzAmount() public view returns (uint256) {
//        return players[msg.sender].tokenQuartzAmount;
//    }

    function addTokenQuartzAmount(address playerAddress, uint256 amount) public onlyCreator notPause {
        players[playerAddress].tokenQuartzAmount += amount;
    }

    function buyTokenQuartz() public payable {
        require(msg.value == 1 ether);
        players[msg.sender].tokenQuartzAmount += 167; // TODO: overflow check ?
    }
}

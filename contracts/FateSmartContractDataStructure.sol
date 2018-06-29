pragma solidity ^0.4.23;


import "./FateSmartContractAccessControl.sol";


contract FateSmartContractDataStructure is FateSmartContractAccessControl {

    uint256 private tokenQuartzPriceInWei;
    uint256 private tokenQuartzAmount;

    struct Player {
        uint256 tokenQuartzAmount;
        uint256[] servant;
        uint256[] craftEssence;
    }

    mapping(address => Player) public players;

    event BuyTokenQuartz(address indexed playerAddress, uint256 amount);

    constructor() public {
        tokenQuartzPriceInWei = 0.09 ether;
        tokenQuartzAmount = 167;
    }

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

    function setTokenQuartzPriceInWei(uint256 _price) public onlyCreator {
        tokenQuartzPriceInWei = _price;
    }

    function getTokenQuartzPriceInWei() public view returns (uint256) {
        return tokenQuartzPriceInWei;
    }

    function setTokenQuartzAmount(uint256 _amount) public onlyCreator {
        tokenQuartzAmount = _amount;
    }

    function getTokenQuartzAmount() public view returns (uint256) {
        return tokenQuartzAmount;
    }

    function buyTokenQuartz() public payable {
        require(msg.value == tokenQuartzPriceInWei);
        // overflow check
        require(players[msg.sender].tokenQuartzAmount + tokenQuartzAmount > 0);

        players[msg.sender].tokenQuartzAmount += tokenQuartzAmount;
        emit BuyTokenQuartz(msg.sender, tokenQuartzAmount);
    }
}

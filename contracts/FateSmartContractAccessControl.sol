pragma solidity ^0.4.23;


contract FateSmartContractAccessControl {

    address private creator;

    bool private pause;

    modifier onlyCreator() {
        require(msg.sender == creator);
        _;
    }

    modifier notPause() {
        require(!pause);
        _;
    }

    constructor() public {
        creator = msg.sender;
        pause = false;
    }

    function getCreator() public view returns (address) {
        return creator;
    }

    function getPause() public view returns (bool) {
        return pause;
    }

    function setPause(bool _pause) public onlyCreator {
        pause = _pause;
    }

    function sendEthToCreator(uint256 _amountInWei) public onlyCreator {
        creator.transfer(_amountInWei);
    }

    mapping(address => bool) private dealers;

    modifier onlyDealer() {
        require(dealers[msg.sender]);
        _;
    }

    function setDealer(address _address, bool value) public onlyCreator {
        dealers[_address] = value;
    }
}

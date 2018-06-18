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

    function setPause(bool _pause) public onlyCreator {
        pause = _pause;
    }
}

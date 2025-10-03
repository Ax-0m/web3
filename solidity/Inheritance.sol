// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.7.0 <0.9.0;

contract Inheritance {
    uint startTime;
    uint tenYears;
    uint public lastVisited;
    address Owner;
    address payable recipient;

    constructor(address payable _recipient) {
        tenYears = 365 days * 10;
        startTime = block.timestamp;
        lastVisited = block.timestamp;
        Owner = msg.sender;
        recipient = _recipient;
    }

    modifier onlyOwner {
        require(msg.sender == Owner);
        _;
    }

    function deposit() public payable onlyOwner {
        lastVisited = block.timestamp;
    }

    function ping() public onlyOwner {
        lastVisited = block.timestamp;
    }

    modifier onlyRecipient {
        require(msg.sender == recipient);
        _;
    }

    function claim(address from) external onlyRecipient {
        require(lastVisited < block.timestamp - tenYears);
        payable(recipient).transfer(address(this).balance);
    }
}
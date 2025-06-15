// SPDX-License-Identifier: MIT

/* 
Constructor -- executed only once during the deployment of the contract. 
Its primary purpose is to initialize the contract's state variables and 
set up any required logic when the contract is deployed to the Ethereum blockchain.

As a naming convention, if a constructor parameter is intended to initialize 
a global (state) variable, the parameter should be named similarly to the 
state variable but with a preceding underscore (_) to distinguish it.

public -- same, derived, other contracts and external users
external -- other contracts and external users
internal -- same contract and derived contract
private -- same contract only
*/


pragma solidity >=0.8.2 <0.9.0;

contract Calculator {
    uint256 num = 0;

    constructor(uint256 _num) {
        num = _num;
    }

    function add(uint256 _value) public {
        num += _value;
    }

    function subtract (uint256 _value) public {
        num -= _value;
    }

    function multiply(uint256 _value) public {
        num *= _value;
    }

    function divide(uint256 _value) public {
        require(_value != 0);
        num = num / _value;
    }

    function getValue() public view returns (uint256) {
        return num;
    }
}
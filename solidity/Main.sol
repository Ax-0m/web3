// SPDX-License-Identifier: MIT

/* 
Constructor -- executed only once during the deployment of the contract. 
Its primary purpose is to initialize the contract's state variables and 
set up any required logic when the contract is deployed to the Ethereum blockchain.

As a naming convention, if a constructor parameter is intended to initialize 
a global (state) variable, the parameter should be named similarly to the 
state variable but with a preceding underscore (_) to distinguish it.
*/


pragma solidity >=0.8.2 <0.9.0;

contract Calculator {
    uint num = 0;

    constructor(uint _num) {
        num = _num;
    }
}
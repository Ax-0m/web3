// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.7.0 <0.9.0;

contract Modifier {
    uint internal x = 0; // can't see or interact with it from outside the contract also contracts derived from the main contract can work with it
    uint public y = 0; // Can do everything from inside or outside the contract
    uint private z = 0; // only the contract can do shit with it
    
}
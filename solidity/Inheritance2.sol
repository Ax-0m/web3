// SPDX-License-Identifier: MIT

/*
    Vehicle(_brand) -- Calls the parent constructor before the child runs.
    override        -- Replaces the function from the parent contract.
*/

import "solidity/Inheritance.sol";
pragma solidity >=0.8.2 <0.9.0;

contract Car is Vehicle {
    uint public numberOfDoors;

    constructor(string memory _brand, uint _numberOfDoors) Vehicle(_brand) {
        numberOfDoors = _numberOfDoors;
    }

    function description() public pure override returns (string memory) {
        return "This is a car";
    }
}

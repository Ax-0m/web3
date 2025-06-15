// SPDX-License-Identifier: MIT

/*
    memory   -- The variable is temporary (not saved on blockchain), just local to the function.
    pure     -- Does nothing to contract state, just returns a value.
    virtual  -- Allows child contracts to override this function.
*/


pragma solidity >=0.8.2 <0.9.0;

 contract Vehicle {

    string public brand;

    constructor (string memory _brand) {
        brand = _brand;
    }

    function description() public pure virtual returns (string memory) {
        return "This is a vehicle";
    }
}
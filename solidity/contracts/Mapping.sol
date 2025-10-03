// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.7.0 <0.9.0;

contract Mapping {
    mapping (uint => bool) map;

    function addItem(uint key, bool value) public {
        map[key] = value;
    }

    function getItem(uint key) public view returns (bool) {
        return map[key];
    } 

}
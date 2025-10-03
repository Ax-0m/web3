// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.7.0 <0.9.0;

contract Transaction {
    uint public received;
    uint public fallbackReceived;

    function withdraw() public {
        address payable user = payable(msg.sender);

        // user.send(address(this).balance) --  returns a bool -- unsafe
        // user.transfer(address(this).balance) -- does not return anything
        user.call{value: address(this).balance}("");
    }

    receive() external payable {
        received += msg.value;
    }

    fallback() external payable {
        fallbackReceived += msg.value;
        // fallback --- called when there is no function that can handle what was sent to a smart contract. Handles an edge case
    } 
}

// Both the transfer and send methods pass 2300 gas. This is a hard limit and makes it so that contracts cannot perform a re-entrance attack. These methods are used to safely transfer Ethereum, however, they are inflexible and no longer recommended to be used. This is because if a contracts fallback or receive function performs any operations these calls will fail due to insufficient gas.

// 1 wei = 1; Lowest possible value
// 1 gwei = 1e9 wei
// 1 ether = 1e18 wei
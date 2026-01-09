// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Token {
    string public name = "MalabarTokens";
    string public symbol = "MBH";
    uint public totalSupply = 1000;

    address public owner;
    mapping(address => uint) private balances;

    constructor() {
        owner = msg.sender;
        balances[msg.sender] = totalSupply;
    }

    function balanceOf(address account) public view returns (uint) {
        return balances[account];
    }

    function transfer(address to, uint amount) public {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}

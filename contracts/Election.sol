// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.18;

contract Voting_Booth{

 uint public modiVotes;
 uint public rahulVotes;

mapping(address => bool) public voted;

event Voted(address indexed voted, string candidate);

function voteModi() public{
    require(!voted[msg.sender],"Already Voted!");
    voted[msg.sender] = true;
    modiVotes += 1;

        emit Voted(msg.sender, "Modi");

}

function voteRahul() public{
require(!voted[msg.sender],"Already Voted!");
    voted[msg.sender] = true;
    rahulVotes += 1;
    
    emit Voted(msg.sender, "Rahul");
    }

function getResults() public view returns(uint,uint){
    return (modiVotes,rahulVotes);
}
}
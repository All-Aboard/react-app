pragma solidity ^0.4.17;

contract QueenChain {
    
    event SpillTea(string _message, uint ethEarned);
    
    string public currentTea = "I heard Linda bought all her instagram followers!";
    uint public ethEarned = 0;

    function spillTea(string _message) public payable{
        currentTea = _message;
        ethEarned += msg.value;
        emit SpillTea(_message, ethEarned);
    }
}

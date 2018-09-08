pragma solidity ^0.4.17;

contract DAppetizer {
    
    event AppBought(uint AppsBought, uint ethEarned);
    
    uint public numApps = 0;
    uint public ethEarned = 0;

    function buyAppetizer() public payable{
        require(msg.value >= .01 ether);
        numApps++;
        ethEarned += msg.value;
        emit AppBought(numApps, ethEarned);
    }
}

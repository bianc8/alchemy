pragma solidity ^0.8.19;

import "./Contract.sol";

contract CallerContract {
    address public contractAddress;

    constructor(address _contractAddress) {
        contractAddress = _contractAddress;
    }

    function makeAttempt() external {
        // Call the attempt() function from the provided contract address
        Contract(contractAddress).attempt();
    }
}

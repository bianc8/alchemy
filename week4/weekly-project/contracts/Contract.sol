// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

// https://goerli.etherscan.io/address/0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502#code
contract Contract {
    event Winner(address);

    function attempt() external {
        require(msg.sender != tx.origin, "msg.sender is equal to tx.origin");
        emit Winner(msg.sender);
    }
}

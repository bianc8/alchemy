pragma solidity 0.8.19;

// Counter deployed to 0xF0D1801c3d52b363F6DF267B30F7D8C8C0a7d1af on goerli

contract Counter {
    uint public count;

    function get() public view returns (uint) {
        return count;
    }

    function inc() public {
        count += 1;
    }

    function dec() public {
        count -= 1;
    }
}

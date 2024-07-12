// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CarparkTicket {
    address payable public owner;
    uint256 public balance;

    event TicketPurchased(string ticketId, uint256 amount, uint256 duration);

    constructor() {
        owner = payable(msg.sender);
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit() internal {
        balance += msg.value;
    }

    function purchaseTicket(uint8 duration) public payable {
        uint256 amount;

        if (duration == 0) {
            amount = 10 ether; // 30 minutes
        } else if (duration == 1) {
            amount = 20 ether; // 1 hour
        } else if (duration == 2) {
            amount = 30 ether; // 3 hours
        } else if (duration == 3) {
            amount = 40 ether; // 5 hours
        } else if (duration == 4) {
            amount = 50 ether; // 24 hours
        } else {
            revert("Invalid duration");
        }

        require(msg.value == amount, "Incorrect ETH sent");
        deposit();

        string memory ticketId = generateTicketId();
        emit TicketPurchased(ticketId, amount, duration);
    }


    function generateTicketId() public view returns (string memory) {
        bytes1 letter1 = bytes1(uint8(65 + uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, 1))) % 26)); // A-Z
        bytes1 letter2 = bytes1(uint8(65 + uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, 2))) % 26)); // A-Z
        bytes1 letter3 = bytes1(uint8(65 + uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, 3))) % 26)); // A-Z

        return string(abi.encodePacked(letter1, letter2, letter3));
    }

}

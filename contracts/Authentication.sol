pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';

contract Authentication is Killable {
  struct User {
    bytes32 username;
  }

  mapping (address => User) public users;

  uint private id; // Stores user id temporarily

  modifier onlyExistingUser(address msgaddress) {
    // Check if user exists or terminate

    require(!(users[msgaddress].username == 0x0));
    _;
  }

  modifier onlyValidName(bytes32 username) {
    // Only valid usernames allowed

    require(!(username == 0x0));
    _;
  }

  function login() constant
  public
  onlyExistingUser(msg.sender)
  returns (bytes32) {
    return (users[msg.sender].username);
  }

  function signup(bytes32 username)
  public
  payable
  onlyValidName(username)
  returns (bytes32) {
    // Check if user exists.
    // If yes, return user username.
    // If no, check if username was sent.
    // If yes, create and return user.

    if (users[msg.sender].username == 0x0)
    {
        users[msg.sender].username = username;
        // userList.push(msg.sender);

        return (users[msg.sender].username);
    }

    // userList.push(msg.sender);
    return (users[msg.sender].username);
  }

}

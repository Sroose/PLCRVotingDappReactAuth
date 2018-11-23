pragma solidity ^0.4.2;

import './zeppelin/lifecycle/Killable.sol';
import './Authentication.sol';

contract UserProfile is Authentication {

  struct UserProfile {
    bytes32 firstname;
    bytes32 lastname;
    bytes32 title;
    bytes32 phone;
    bytes32 email;
    bool admin;
    bool projectmanager;
    bool compliance;
    uint[] orgs;
  }

  mapping (address => UserProfile) public userprofiles;

  address[] userList;


  uint private id; // Stores user id temporarily
  uint private orgid; // Stores user orgid temporarily
  uint private projectid; // Stores user projectid temporarily

  function updateUserProfile(bytes32 username, bytes32 firstname, bytes32 lastname, bytes32 title, bytes32 phone, bytes32 email)
    public
    payable
    onlyValidName(username)
//    onlyExistingUser(msg.sender)
    returns (bytes32, bytes32, bytes32, bytes32, bytes32, uint[]) {

      if (username != 0x0)
      {
          userprofiles[msg.sender].firstname = firstname;
          userprofiles[msg.sender].lastname = lastname;
          userprofiles[msg.sender].title = title;
          userprofiles[msg.sender].phone = phone;
          userprofiles[msg.sender].email = email;

          userList.push(msg.sender);
          return (userprofiles[msg.sender].firstname, userprofiles[msg.sender].lastname, userprofiles[msg.sender].title, userprofiles[msg.sender].phone, userprofiles[msg.sender].email, userprofiles[msg.sender].orgs);
      }
  }

  function getUserProfile(address ins) view public returns (bytes32, bytes32, bytes32, bytes32, bytes32, uint[])
  {
      return (userprofiles[ins].firstname, userprofiles[ins].lastname, userprofiles[ins].title, userprofiles[ins].phone, userprofiles[ins].email, userprofiles[ins].orgs);
  }

  function getUsers() view public returns (address[])
  {
      return userList;
  }




 
}

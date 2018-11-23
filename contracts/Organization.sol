pragma solidity ^0.4.2;

//import './zeppelin/lifecycle/Killable.sol';
import './Authentication.sol';
import './UserProfile.sol';

contract Organization is UserProfile {

  struct Organization {
    uint orgid;
    bytes32 name;
    bytes32 address1;
    bytes32 address2;
    bytes32 city;
    bytes32 state;
    bytes32 country;
    bytes32 phone;
    bytes32 email;
    // uint[] projects;
  }

  mapping (address => Organization[]) private organization;

  address[] orgList;


  uint private id; // Stores org id temporarily

  function createOrg(bytes32 name, bytes32 address1, bytes32 address2, bytes32 city, bytes32 state, bytes32 country, bytes32 phone, bytes32 email)
    public
    payable
    //onlyValidName(userprofiles[msg.sender].username)
    returns (uint, bytes32[8]) {

      uint orgid = 0;
      bytes32[8] memory orgArray;

      if ( organization[msg.sender].length > 0 ) {
          orgid = organization[msg.sender].length;
      }

      orgArray[0] = name;
      orgArray[1] = address1;
      orgArray[2] = address2;
      orgArray[3] = city;
      orgArray[4] = state;
      orgArray[5] = country;
      orgArray[6] = phone;
      orgArray[7] = email;

      userprofiles[msg.sender].orgs.push(orgid);

      organization[msg.sender].push(Organization(orgid,orgArray[0], orgArray[1],orgArray[2],orgArray[3],orgArray[4],orgArray[5],orgArray[6],orgArray[7]));


      return (orgid, orgArray);

  }

  function updateOrg(uint orgid, bytes32 name, bytes32 address1, bytes32 address2, bytes32 city, bytes32 state, bytes32 country, bytes32 phone, bytes32 email)
    public
    payable
    //onlyValidName(userprofiles[msg.sender].username)
    returns (uint, bytes32[8]) {

      if (organization[msg.sender][orgid].orgid != 0x0 )
      {
          bytes32[8] memory orgArray;

          organization[msg.sender][orgid].name = name;
          orgArray[0] = name;
          organization[msg.sender][orgid].address1 = address1;
          orgArray[1] = address1;
          organization[msg.sender][orgid].address2 = address2;
          orgArray[2] = address2;
          organization[msg.sender][orgid].city = city;
          orgArray[3] = city;
          organization[msg.sender][orgid].state = state;
          orgArray[4] = state;
          organization[msg.sender][orgid].country = country;
          orgArray[5] = country;
          organization[msg.sender][orgid].phone = phone;
          orgArray[6] = phone;
          organization[msg.sender][orgid].email = email;
          orgArray[7] = email;

          // orgList.push(msg.sender);

        return (organization[msg.sender][orgid].orgid, orgArray);

      }
  }

  function getOrganization(address ins, uint orgid) view public returns (uint, bytes32[8] memory)
  {
      bytes32[8] memory orgArray;

      orgArray[0] = organization[ins][orgid].name;
      orgArray[1] = organization[ins][orgid].address1;
      orgArray[2] = organization[ins][orgid].address2;
      orgArray[3] = organization[ins][orgid].city;
      orgArray[4] = organization[ins][orgid].state;
      orgArray[5] = organization[ins][orgid].country;
      orgArray[6] = organization[ins][orgid].phone;
      orgArray[7] = organization[ins][orgid].email;

      return (organization[ins][orgid].orgid, orgArray);
  }

  //function getUserOrgs() view public returns (Organization[])
  function getUserOrgs() view public returns (uint[])
  {
      //return userList;
      return userprofiles[msg.sender].orgs;
      //return organization[msg.sender];
  }




 
}

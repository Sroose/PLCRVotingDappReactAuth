var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");
var Killable = artifacts.require("./zeppelin/lifecycle/Killable.sol");
var Organization = artifacts.require("./Organization.sol");
var UserProfile = artifacts.require("./UserProfile.sol");
var Organization = artifacts.require("./Organization.sol");
var PLCRFactory = artifacts.require("./PLCRFactory.sol");
var PLCRVoting = artifacts.require("./PLCRVoting.sol");
var DLL = artifacts.require('dll/DLL.sol');
var AttributeStore = artifacts.require('attrstore/AttributeStore.sol');
var Authentication = artifacts.require("./Authentication.sol");

module.exports = function(deployer, accounts) {
  deployer.deploy(Ownable);
  deployer.link(Ownable, Killable);
  deployer.deploy(Killable);
  deployer.link(Killable, Authentication);
  deployer.deploy(Authentication);
  deployer.link(Killable, UserProfile);
  deployer.deploy(UserProfile);
  deployer.link(Killable, Organization);
  deployer.deploy(Organization);
  
  // deploy libraries
  deployer.deploy(DLL);
  deployer.deploy(AttributeStore);

  // link libraries
  deployer.link(DLL, PLCRFactory);
  deployer.link(AttributeStore, PLCRFactory);
  
  deployer.deploy(PLCRFactory);

};

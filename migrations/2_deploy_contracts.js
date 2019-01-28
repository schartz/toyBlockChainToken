var DappToken = artifacts.require("./DappToken.sol");
var initialSupply = 1000000

module.exports = function(deployer) {
  deployer.deploy(DappToken, initialSupply);
};

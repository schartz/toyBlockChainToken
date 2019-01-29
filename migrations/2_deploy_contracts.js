var DappToken = artifacts.require("./DappToken.sol");
var DappTokenSale = artifacts.require("./DappTokenSale.sol");
var initialSupply = 1000000
var tokenPrice = 1000000000000000; // in wei, one ether

module.exports = function(deployer) {
  deployer.deploy(DappToken, initialSupply).then(function(){
  	return deployer.deploy(DappTokenSale, DappToken.address, tokenPrice);
  });
};

var DappToken = artifacts.require("./DappToken.sol");

contract('DappToken', function(accounts){
	it('sets total supply upon deployment', function(){
		return DappToken.deployed().then(function(i){
			tokenInstance = i;
			return tokenInstance.totalSupply()
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 1000000, "sets the totalSupply to 1 million");
		})
	});
});
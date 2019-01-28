var DappToken = artifacts.require("./DappToken.sol");

contract('DappToken', function(accounts){
	
	var tokenInstance;
	var initalSupply = 1000000;

	it('initializes contract with the correct name and symbol', function(){
		return DappToken.deployed().then(function(i){
			tokenInstance = i;
			return tokenInstance.name();
		}).then(function(name){
			assert.equal(name, "DappToken", "has the corrcet name");
			return tokenInstance.symbol();
		}).then(function(symbol){
			assert.equal(symbol, "DAPP", "has the correct symbol");
			return tokenInstance.standard();
		}).then(function(standard){
			assert.equal(standard, "DappToken v0.1", "has the correct standard");
		})
	});


	it('allocates total supply upon deployment', function(){
		return DappToken.deployed().then(function(i){
			tokenInstance = i;
			return tokenInstance.totalSupply()
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), initalSupply, "sets the totalSupply to 1 million");
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(adminBalance) {
			assert.equal(adminBalance, initalSupply, "allocates the initial supply to the admin account");
		})
	});


	it('transfers token ownership', function(){
		return DappToken.deployed().then(function(i){
			tokenInstance = i;
			//Test `require` statement first by transferring something larger than the sender's balance
			return tokenInstance.transfer.call(accounts[1], 999999999999999);
		}).then(assert.fail).catch(function(error){
			assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
			return tokenInstance.transfer(accounts[1], 25000, {from: accounts[0]});
		}).then(function(receipt){
			assert.equal(receipt.logs.length, 1, "Triggers the event");
			assert.equal(receipt.logs[0].event, "Transfer", "should be the 'Transfer' event");
			assert.equal(receipt.logs[0].args._from, accounts[0], "the sender account");
			assert.equal(receipt.logs[0].args._to, accounts[1], "the receiver account");
			assert.equal(receipt.logs[0].args._value, 25000, "verify the transfer amount");
			return tokenInstance.balanceOf(accounts[1]);
		}).then(function(balance){
			assert.equal(balance.toNumber(), 25000, "adds the amount to the receiving account");
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(balance){
			assert.equal(balance.toNumber(), (initalSupply - 25000), "deducts amount from the sending account");
		})
	});


	it('approves tokens for delegated traansfers', function(){
		return DappToken.deployed().then(function(i){
			tokenInstance = i;
			return tokenInstance.approve.call(accounts[1], 100);
		}).then(function(success){
			assert.equal(success, true, 'it returns true');
			return tokenInstance.approve(accounts[1], 100);
		}).then(function(receipt){
			assert.equal(receipt.logs.length, 1, "Triggers the event");
			assert.equal(receipt.logs[0].event, "Approval", "should be the 'Approval' event");
			assert.equal(receipt.logs[0].args._owner, accounts[0], "tokens are authprized by the owner");
			assert.equal(receipt.logs[0].args._spender, accounts[1], "tokens are authorized for spender");
			assert.equal(receipt.logs[0].args._value, 100, "verify the approval amount");
			return tokenInstance.allowance(accounts[0], accounts[1]);
		}).then(function(allowance){
			assert(allowance.toNumber(), 100, 'stores the allowanve fro delegated transfers');
		})
	});
});
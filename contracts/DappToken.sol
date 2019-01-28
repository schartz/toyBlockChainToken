pragma solidity >=0.4.21 <0.6.0;

contract DappToken{
	// state varaibles (these are persistant and live on disk)
	string public name = "DappToken";
	string public symbol = "DAPP";
	string public standard = "DappToken v0.1";
	uint256 public totalSupply;
	mapping(address => uint256) public balanceOf;

	// events
	event Transfer(address indexed _from, address indexed _to, uint256 _value);


	// constructor
	constructor(uint256 _initialSupply) public {
		balanceOf[msg.sender] = _initialSupply;
		totalSupply = _initialSupply;
	}

	// Transfer
	function transfer(address _to, uint _value) public returns(bool success){
		//throw exception if sender does not have enough balance
		require(balanceOf[msg.sender] >= _value);

		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;

		emit Transfer(msg.sender, _to, _value);

		return true;

	}


}

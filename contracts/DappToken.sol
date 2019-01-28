pragma solidity >=0.4.21 <0.6.0;

contract DappToken{
	// state varaibles (these are persistant and live on disk)
	string public name = "DappToken";
	string public symbol = "DAPP";
	string public standard = "DappToken v0.1";
	uint256 public totalSupply;
	mapping(address => uint256) public balanceOf;
	mapping(address => mapping(address => uint256)) public allowance;

	// events
	event Transfer(address indexed _from, address indexed _to, uint256 _value);
	event Approval(address indexed _owner, address indexed _spender, uint256 _value);


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

	// approve function
	function approve(address _spender, uint256 _value) public returns(bool success) {

		// handle allowance
		allowance[msg.sender][_spender] = _value;



		//handle approve event
		emit Approval(msg.sender, _spender, _value);


		return true;
	}

	// transferFrom function
}

pragma solidity >=0.4.21 <0.6.0;

import "./DappToken.sol";
contract DappTokenSale {
	//state variables
	address admin;
	DappToken public tokenContract;
	uint256 public tokenPrice;

	constructor(DappToken _tokenContract, uint256 _tokenPrice) public {
		// assign an admin as the person 
		// who deployed this contract
		admin = msg.sender;

		// token contract and price
		tokenContract = _tokenContract;
		tokenPrice = _tokenPrice;


	}
}
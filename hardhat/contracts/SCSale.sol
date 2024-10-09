//SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./SCToken.sol";
import {AggregatorV3Interface} from "@chainlink/contracts@1.2.0/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import { SD59x18, sd } from "@prb/math/src/SD59x18.sol";

contract SCSale {
    address payable public admin;
    address payable private ethFunds;
    SCToken public token;
    uint256 public tokensSold;
    SD59x18 private tokenPriceUSD;
    AggregatorV3Interface internal priceFeed;

    uint256 public transactionCount;

    event Sell(address _buyer, uint256 _amount);

    struct Transaction {
        address buyer;
        uint256 amount;
    }

    mapping (uint256 => Transaction) public transaction;

    constructor(SCToken _token) {
        
        priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        tokenPriceUSD = sd(9); // 0.09 USD (0.00) 3 DIGITS
        token = _token;
        admin = payable(msg.sender);
        ethFunds = payable(admin);

    }
    
    function getETHPrice() public view returns(int) {
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return (price/1e6);
    }

    function sCTokenPriceInETH() public view returns(SD59x18) {
        int _ethPrice = getETHPrice();
        SD59x18 ethPrice = sd(_ethPrice);
        return tokenPriceUSD.div(ethPrice);
    }

    function buyToken(uint256 _amount) public payable {
        SD59x18 sCTokenPriceETH = sCTokenPriceInETH();
        SD59x18 msgValue = sd(int(msg.value));
        SD59x18 _amountSd = sd(int(_amount));
        // Check that the buyer sends the enough ETH
        require(msgValue >= sCTokenPriceETH * _amountSd);
        // check that the sale contract provides the enough ETH to make this transaction
        require(token.balanceOf(address(this)) >= _amount);
        // Make the transaction inside of the require
        // transfer returns a boolean value.
        require(token.transfer(msg.sender, _amount));
        // Transfer the ETH of the buyer to us
        ethFunds.transfer(msg.value);
        // Increase the amount of tokens sold
        tokensSold += _amount;
        // Increase the amount of transactions
        transaction[transactionCount] = Transaction(msg.sender, _amount);

    }
    
}
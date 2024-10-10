//SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./SCToken.sol";
import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import { UD60x18, ud } from "@prb/math/src/UD60x18.sol";
import { SD59x18, sd } from "@prb/math/src/SD59x18.sol";

contract SCSale {
    
    address payable public admin;
    SCToken public token;
    uint256 public tokensSold;
    uint256 public tokenPriceUSD;
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
        tokenPriceUSD = 9; // 0.09 USD (0.00) 3 DIGITS
        token = _token;
        admin = payable(msg.sender);

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

    function calculateTokenPrice(uint256 _numberOfTokens) public view returns (UD60x18) {
        // Fetch the latest ETH price in USD
        (, int256 ethPrice, , ,) = priceFeed.latestRoundData();
        require(ethPrice > 0, "Invalid price data");

        // Calculate required Ether using PRBMath for fixed-point arithmetic
        UD60x18 ethPriceInUSD = ud(uint256(ethPrice/1e6));
        UD60x18 totalCostInUSD = ud(tokenPriceUSD*_numberOfTokens); // Total cost in USD
        UD60x18 requiredEther = (totalCostInUSD) / ethPriceInUSD; // Convert to Ether

        return requiredEther;
    }

    function buyToken(uint256 _amount) public payable {
        
        UD60x18 _calculateTokenPrice = calculateTokenPrice(_amount);
        UD60x18 msgValue = ud(uint(msg.value));

        // Check that the buyer sends the enough ETH
        require(_amount > 0, "Does not accept 0 in amount");
        require(msg.value > 0, "Send ETH to buy some tokens");
        require(msgValue >= _calculateTokenPrice, "There is not enough ether to buy tokens");

        // check that the sale contract provides the enough ETH to make this transaction
        require(token.balanceOf(address(this)) >= _amount, "Insufficient tokens in contract");
        
        // Make the transaction inside of the require
        // transfer returns a boolean value.
        require(token.transfer(msg.sender, _amount));
        // Transfer the ETH of the buyer to us
        admin.transfer(msg.value);
        // Increase the amount of tokens sold
        tokensSold += _amount;
        // Increase the amount of transactions
        transaction[transactionCount] = Transaction(msg.sender, _amount);

    }
    
}
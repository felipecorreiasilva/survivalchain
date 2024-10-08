//SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SCToken is ERC20 {
    
    constructor() ERC20("SCToken", "SCT") {
        _mint(msg.sender, 1000 * 10e18);
    }
}
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SCToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploySCTokenFixture() {

    const tokens = (nToken) => {
      return ethers.utils.parsedUnits(nToken.toString(), "ether");
    }
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const SCToken = await ethers.getContractFactory("SCToken");
    const sCToken = await SCToken.deploy();

    return { SCToken, owner, otherAccount };
  }

  
});

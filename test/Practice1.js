const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", function () {
  it("Deployment should assign total supply to owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();

    await token.waitForDeployment();

    const ownerBalance = await token.balanceOf(owner.address);
    const totalSupply = await token.totalSupply();

    expect(ownerBalance).to.equal(totalSupply);
  });
});

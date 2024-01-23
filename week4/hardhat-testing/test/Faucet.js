require("dotenv").config();
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

/*
A lot of the logic in the contract depends on the owner being set correctly in the constructor, so we'll want to test that.
We don't want someone instantly draining all of our funds, so we should check that the require clause in the withdraw() function works as expected
The destroyFaucet() function should only be called by the owner, as should the withdrawAll function.
*/

describe("Faucet", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();
    let withdrawAmount = ethers.parseUnits("1", "ether");
    const [owner] = await ethers.getSigners();
    let initialBalance = await ethers.provider.getBalance(owner);

    console.log("Signer 1 address: ", owner.address);
    return { faucet, owner, withdrawAmount, initialBalance };
  }

  it("should deploy and set the owner correctly", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it("should not allow a non-owner to withdraw funds", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    const [signer] = await ethers.getSigners();

    await expect(faucet.connect(signer).withdraw(100)).to.be.revertedWith(
      "Failed to send Ether"
    );
  });

  it("should not allow withdrawals above .1 ETH at a time", async function () {
    const { faucet, withdrawAmount } = await loadFixture(
      deployContractAndSetVariables
    );
    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });

  //fix this test, now it does not revert
  it("should not allow a non-owner to destroy the contract", async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);

    const [owner, nonOwner] = await ethers.getSigners();

    await expect(faucet.connect(nonOwner).destroyFaucet()).to.be.reverted;
  });

  // TODO fix this test, nowt getCode does not return the correct
  it("should allow the owner to destroy the contract", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    await faucet.connect(owner).destroyFaucet();

    // use ethers provider.getCode() to check if the contract still exists
    const code = await ethers.provider.getCode(faucet.target);
    await expect(code).to.be.equal("0x");
  });

  // does the withdrawAll() function successfully return all of the ether held in the smart contract to the caller?
  it("should allow the owner to withdraw all funds", async function () {
    const { faucet, owner, initialBalance } = await loadFixture(
      deployContractAndSetVariables
    );

    await faucet.connect(owner).withdrawAll();

    // Check if the contract balance is now zero
    expect(await ethers.provider.getBalance(faucet.target)).to.equal(0);

    // Check if the owner's balance has increased by the initial balance of the contract
    //expect(await g_provider.getBalance(owner.address)).to.equal(initialBalance);
  });
});

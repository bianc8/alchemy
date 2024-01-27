require("dotenv").config();
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game5", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();

    return { game };
  }
  it("should be a winner", async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    // generate vanity address with prefix to avoid brute force
    // https://vanity-eth.tk/
    const vanityAddress = "0x00e2791e45912E679434a505EBd350EE98257735";
    const vanityPrivateKey =
      "55c22372a34d048ec30b706bcf15c3cce0fc36597625b071d4ebbabbe0368fd2";

    // fund account
    const signer = await ethers.getSigner(0);
    await signer.sendTransaction({
      to: vanityAddress,
      value: ethers.utils.parseEther("1"),
    });

    const wallet = new ethers.Wallet(vanityPrivateKey, ethers.provider);

    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});

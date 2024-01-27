const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game3", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game3");
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    const signer = ethers.provider.getSigner(0);

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const address = await signer.getAddress();

    return { game, signer };
  }

  it("should be a winner", async function () {
    const { game, signer } = await loadFixture(deployContractAndSetVariables);

    const [_, sign1, sign2, sign3] = await ethers.getSigners();

    await game.connect(sign2).buy({ value: "3" });
    await game.connect(sign1).buy({ value: "2" });
    await game.connect(sign3).buy({ value: "1" });

    const addr1 = await sign1.getAddress();
    const addr2 = await sign2.getAddress();
    const addr3 = await sign3.getAddress();
    await game.win(addr1, addr2, addr3);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});

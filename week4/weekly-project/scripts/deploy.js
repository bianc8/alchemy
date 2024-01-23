// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// https://goerli.etherscan.io/tx/0xeab94539bb890bc24e3498b13602eb66b742f7fb09ca0a9d1b900b9a9cf0302e

async function main() {
  const callerContract = await hre.ethers.deployContract("CallerContract", [
    "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502",
  ]);

  await callerContract.waitForDeployment();

  console.log(`CallerContract deployed to ${callerContract.target}`);

  await callerContract.makeAttempt();

  console.log(`CallerContract attempt made`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

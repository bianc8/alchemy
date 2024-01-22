const hre = require("hardhat");
const ethers = require("ethers");
require("dotenv").config();

async function mainCounter() {
  const counter = await hre.ethers.deployContract("Counter", [], {});
  await counter.waitForDeployment();
  console.log(`Counter deployed to ${counter.target}`);
}

async function main() {
  const url = process.env.GOERLI_URL;
  let artifacts = await hre.artifacts.readArtifact("Faucet");
  const provider = new ethers.JsonRpcProvider(url);
  let privateKey = process.env.PRIVATE_KEY;
  let wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a Faucet Factory
  let factory = new ethers.ContractFactory(
    artifacts.abi,
    artifacts.bytecode,
    wallet
  );

  let faucet = await factory.deploy();

  await faucet.waitForDeployment();
  console.log(`Faucet deployed to ${faucet.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

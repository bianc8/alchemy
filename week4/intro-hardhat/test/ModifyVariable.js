// import testing libraries: https://www.chaijs.com/guide/styles/
const { expect, assert } = require("chai");

// npx hardhat test --grep ModifyVariable

// the `describe` scope encapsulates an entire test called `TestModifyVariable`
// the `it` says the behavior that should be expected from the test
describe("ModifyVariable", function () {
  it("should change x to 1337", async function () {
    // this line creates an ethers ContractFactory abstraction: https://docs.ethers.org/v5/api/contract/contract-factory/
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

    // we then use the ContractFactory object to deploy an instance of the contract
    const contract = await ModifyVariable.deploy(10, "name");

    // wait for contract to be deployed and validated!
    await contract.waitForDeployment();

    // modify x from 10 to 1337 via this function!
    await contract.modifyToLeet();
    // getter for state variable x
    const newX = await contract.x();
    assert.equal(newX, 1337);
  });
  it("should change name to 1337", async function () {
    // this line creates an ethers ContractFactory abstraction: https://docs.ethers.org/v5/api/contract/contract-factory/
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

    // we then use the ContractFactory object to deploy an instance of the contract
    const contract = await ModifyVariable.deploy(0, "name");

    // wait for contract to be deployed and validated!
    await contract.waitForDeployment();

    // modify x from 10 to 1337 via this function!
    await contract.modifyToLeet();
    // getter for state variable name
    const newName = await contract.name();
    assert.equal(newName, "1337");
  });
});

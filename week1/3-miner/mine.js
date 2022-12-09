const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
  mempool.push(transaction)
}

function mine() {
  let newBlock = {
    id: blocks.length > 0 ? blocks[blocks.length-1].id + 1 : 0,
    transactions: mempool.splice(0, MAX_TRANSACTIONS),
    nonce: 0
  };
  do {
    newBlock.hash = SHA256(JSON.stringify(newBlock));
    newBlock.nonce += 1;
  } while (BigInt(`0x${newBlock.hash}`) >= TARGET_DIFFICULTY)
  blocks.push(newBlock);
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};
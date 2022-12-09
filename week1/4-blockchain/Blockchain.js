const Block = require('./Block');

class Blockchain {
  constructor() {
    this.chain = [ new Block("") ];
    this.previousHash = this.chain[0].toHash();
  }

  addBlock(block) {
    block.setPreviousHash(this.previousHash)
    this.previousHash = block.hash = block.toHash()
    this.chain.push(block);
  }

  isValid() {
    let valid = true;
    let prevHash = this.chain[0].previousHash;
    this.chain.forEach((block) => {
      if (block.previousHash.toString() !== prevHash.toString()) {
        valid = false;
        return;
      }
      prevHash = block.toHash();
    })
    return valid;
}
}

module.exports = Blockchain;
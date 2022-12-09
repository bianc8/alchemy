const Block = require('../Block');
const assert = require('assert');
const SHA256 = require("crypto-js/sha256");

describe('Block', function() {
  const newBlock = new Block();

  it('should have a hash property', function() {
    assert(/^[0-9A-F]{64}$/i.test(newBlock.toHash()));
  });

  it('should store a random name', function() {
    const randomName = require('faker').name.findName();
    assert.equal(randomName, new Block(randomName).data)
  });
  
  it('should hash some random data', function() {
    const randomEmail = require('faker').internet.email();
    const myHash = SHA256(randomEmail).toString();
    const yourHash = new Block(randomEmail).toHash().toString();
    assert.equal(myHash, yourHash);
  })
});
/*
Let's sign a message!
1. First step is to hash it using the hashMessage function you created in the last stage
2. Once you have the message hash, use the sign method from ethereum-cryptography.
3. The sign method takes an optional third parameter called options, which you'll see in the documentation. Use this parameter to return the recovered bit so that the public key can be recovered from this signature.
*/
const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require('./hashMessage');

const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

async function signMessage(msg) {
  return secp.sign(hashMessage(msg), PRIVATE_KEY, {recovered: true});
}

module.exports = signMessage;
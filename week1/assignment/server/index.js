const express = require("express");
const app = express();
const cors = require("cors");

const secp = require('ethereum-cryptography/secp256k1');
const { utf8ToBytes, toHex } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');

const port = 3042;

app.use(cors());
app.use(express.json());

// publickey: balance
const balances = {
  "046bc483779c4a70adcc650ad47cf0cc77408310f1565b4b8ca8d3cdb93d29fbe15622e1ecaaa4f364b21cf19dd5c157749715ef89953f6e665533f399cc2677e5": 100, // pki dd38cc501d4bc75cb144265fb1f00e27f0da0d8621246654f1abb39728c3365c
  "04a7b3bfbd464dad1c92221925ae308b98919b830b6113bf1ace32b329b33a57aedb2ae641acae6e7f572e638da7d57a20ee21e02dddac1cbd36c94edb22b2b9c0": 50, // pki 8db22805551ad7fba2083888249f306124b180ec045a920fa79fc71925b78796
  "04d588c1469209610a9cb33f4fe33ba4bf133ee14c7c1f485e8befba372afbaa731cfc0780971ddb8b5d2c328cf073793b500690a77fa262d8a0e4b1e8c595e8ce": 75, // pki 0e17e904c5b377a1f619e85b642d510026c3fd8c0dc9324cdd0145a2a5d7ee76
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;
  
  if (isValidSignature(req.body)) {
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } else {
    res.status(401).send({ message: "Invalid signature!" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
function isValidSignature({ sender, recipient, amount, signature }) {
  const message = utf8ToBytes(JSON.stringify({ amount: parseInt(amount), recipient }));
  const msgHash = keccak256(message);
  const recoveryBit = +signature.slice(signature.length - 1);
  const parsedSignature = signature.substring(0, signature.length - 1);
  
  const recoveredPublicKey =  secp.recoverPublicKey(msgHash, parsedSignature, recoveryBit);
  if (toHex(recoveredPublicKey) !== sender) {
    return false;
  }
  return secp.verify(parsedSignature, msgHash, recoveredPublicKey);
}
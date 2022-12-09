import { useState } from "react";
import server from "./server";

import * as secp from "ethereum-cryptography/secp256k1";
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const generateSignature = () => {
    const message = JSON.stringify({ amount: parseInt(sendAmount), recipient });
    const hashedMsg = keccak256(utf8ToBytes(message));
    const signature = secp.signSync(hashedMsg, privateKey, { recovered: true });

    return toHex(signature[0]) + signature[1];
  }

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const { data: { balance } } = await server.post(`send`, {
        sender: address,
        recipient,
        amount: parseInt(sendAmount),
        signature: generateSignature(),
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;

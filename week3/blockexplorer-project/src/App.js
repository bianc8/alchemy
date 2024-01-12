import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import Account from "./Account";

import "./App.css";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [block, setBlock] = useState();

  useEffect(() => {
    async function getBlock() {
      setBlock(await alchemy.core.getBlockWithTransactions());
    }
    getBlock();
  }, []);

  /*
  functionalities to implement:
    - OK | Allow users to click on a block listed in the webpage to get the block's details including its list of transactions
    - OK | From the list of transactions allow users to click on specific transactions to get the details of the transaction
    - OK | Make an accounts page where a user can look up their balance or someone else's balance
  */

  return (
    <div className="App">
      <h1>Block Explorer</h1>
      <Account />
      <div>
        <h2>Block Details</h2>
        <p>
          <b>Block Number</b> {block ? block.hash : null}
        </p>
        <p>
          <b>Timestamp</b>:{" "}
          {block ? new Date(block.timestamp * 1000).toISOString() : null}
        </p>
        <details>
          <summary>Block Transactions</summary>
          Transactions:{" "}
          {block && block.transactions && block.transactions.length > 0
            ? block.transactions.map((tx, i) => (
                <details key={i}>
                  <summary>Transaction {tx.hash}</summary>
                  <p>From: {tx.from}</p>
                  <p>To: {tx.to}</p>
                  <p>Nonce: {tx.nonce}</p>
                  <p>Data: {tx.data}</p>
                </details>
              ))
            : null}
        </details>
      </div>
      <div>
        <h2>Pending transactions</h2>
      </div>
    </div>
  );
}

export default App;

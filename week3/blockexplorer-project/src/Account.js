import React, { useEffect, useState } from "react";
import { Alchemy, Network, Utils } from "alchemy-sdk";

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

const Account = () => {
  const [address, setAddress] = useState("vitalik.eth");
  const [balance, setBalance] = useState();

  useEffect(() => {
    async function getBalance() {
      let bal = await alchemy.core.getBalance(address);
      bal = parseFloat(Utils.formatEther(bal)).toFixed(2);
      setBalance(bal);
    }

    getBalance();
  }, [address]);

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <div>
      <h2>
        Balance of <input onChange={(e) => handleChange(e)} value={address} />{" "}
        is {balance} ΞTH
      </h2>
    </div>
  );
};

export default Account;

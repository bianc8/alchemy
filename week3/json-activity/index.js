const axios = require("axios");

// copy-paste your URL provided in your Alchemy.com dashboard
const ALCHEMY_URL =
  "https://eth-mainnet.g.alchemy.com/v2/NtqTxCkFPCsZjKMokO9kB_LwG9PeB2in";

axios
  .post(ALCHEMY_URL, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance", // eth_getBlockByNumber "0xb443", true
    params: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"],
  })
  .then((response) => {
    console.log(response.data.result);
  });

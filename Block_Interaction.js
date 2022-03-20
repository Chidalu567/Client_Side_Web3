const Web3 = require("web3"); // require web3 from the npm libary

const w3 = new Web3(
  "https://mainnet.infura.io/v3/aafb8adb2afe49d7bfb057d4bbe3ec8c"
); // connect to a net or chain network

// This returns the information of the latest block
w3.eth.getBlock("latest", (err, result) =>
  console.log({
    "Block Hash": result.hash,
    Miner: result.miner,
    transactions_In_Block: result.transactions.length,
  })
);

// This gets the Nonce or no of transaction made in block
w3.eth.getBlockTransactionCount("latest", (err, result) => console.log(result));

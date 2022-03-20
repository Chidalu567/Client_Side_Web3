const Tx = require("ethereumjs-tx").Transaction; // require module for creating transaction object
const Web3 = require("web3"); // require the web3 module to interact with the blockchain and smartcontracts on blockchains
const dotenv = require("dotenv");

// Creating a transaction
// Build the transaction object
// If it is a mainnet, sign the transaction
// Deploy or send seralised Transaction to the blockchain
dotenv.config();
// connecting to blockchain testnet rinkeby
const w3 = new Web3(
  "https://rinkeby.infura.io/v3/aafb8adb2afe49d7bfb057d4bbe3ec8c"
);

// public address to send ether
const addr1 = "0x2f92B9e10D44E9b3554b9a0A9EeB258B7107328c";
const addr2 = "0xbe875509Afaaf0Dc322B8D7db11EFe2d8F3F6bB7";

// private address to sign contract
const private_key = Buffer.from(process.env.Private_Key, "hex"); // addr1 private key

// transaction object
// We are sending 1 ether from our account to another account, with a gasPrice of 10 gwei and Limit of 21000

w3.eth.getTransactionCount(addr1, (err, transactionCount) => {
  const transaction_Object = {
    to: addr2,
    gasPrice: w3.utils.toHex(w3.utils.toWei("10", "gwei")),
    gasLimit: w3.utils.toHex(21000),
    nonce: w3.utils.toHex(transactionCount),
    value: w3.utils.toHex(w3.utils.toWei("0.1", "ether")),
  };

  // Signing the transaction
  const tx = new Tx(transaction_Object, { chain: "rinkeby" }); // creating a new transactrion object to sign
  tx.sign(private_key); // sign the transaction using the private key

  //   Send signed transactiont to the blockchain
  const sTx = tx.serialize();
  const rawTransaction = "0x" + sTx.toString("hex");

  w3.eth.sendSignedTransaction(rawTransaction, (err, hash) => {
    console.log("TxHash:" + hash);
    console.log(err);
  });
});
